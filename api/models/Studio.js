const mysql = require('mysql');
var con = require('../connection/mysqlcon');


var studio = {
  getStudioDetails: function(studioId){
    return new Promise(function(resolve, reject) {
      try {
        con.query(`SELECT studio_id, name as studio_name from studio where studio_id = ${studioId}`, function(err, rows, fields) {
        if (err) {
          return reject(err);
        } else {
          return resolve(rows);
          }
        });
      } catch (err) {
        return reject(err);
      }
    });
  },
  getServiceByStudio: function(studioId){
    return new Promise(function(resolve, reject) {
      try {
        con.query(`SELECT st.id as studio_service_id, st.slots_required, st.price as amount, ser.service_name from studio_service as st JOIN service_master as ser ON st.service_id = ser.id and st.studio_id = ${studioId}`, function(err, rows, fields) {
        if (err) {
          return reject(err);
        } else {
          return resolve(rows);
          }
        });
      } catch (err) {
        return reject(err);
      }
    });
  },
  fetchServicesSlots: function(data){
    return new Promise(function(resolve, reject) {
      try {
        con.query(`SELECT studio_id, service_id, required_slots from booking_service_cart where id = ${data.cart_service_id}`,
        function(err, rows, fields) {
          if (err) {
            return reject(err);
          } else {
            if(rows.length > 0 && rows[0].required_slots > 0){
              console.log("rows: ", rows);
              Promise.all([
                studio.getStudioCalender(data, rows[0]),
                studio.getAllBookedDate(data, rows[0])
              ])
              .then(function (success) {
                if(success.length > 0){
                  try{
                    var bookings = prepareBookingsDetails(Object.assign(success[0]), Object.assign(success[1]));
                    var response = Object.assign({}, bookkings);
                  }catch(e){
                    
                  }
                  
                  return resolve({
                    data: {
                      "status": true,
                      studio_id: rows[0].studio_id,
                      service_id: rows[0].service_id,
                      bookings: success
                      }
                  });
                }else{
                  return resolve({
                    data: {
                      "status": false,
                      "msg":"Something went worng"
                      }
                  });
                }
              }).catch(function(error){
                return reject({
                  data: {
                    "status": false,
                    "msg":error
                    }
                });
              });
            }else{
              return reject({
                data: {
                  "status": false,
                  "msg":"Worng request"
                  }
              });
            }
          }
        });
      } catch (err) {
        return reject(err);
      }
    });
  },
  getStudioCalender: function(data, obj){
    return new Promise(function(resolve, reject) {
      // {
      //   "user_id":2,
      //   "cart_service_id":2,
      //   }
      try {
        con.query(`SELECT id as slot_id, studio_id, 8am,9am,10am,12pm,1pm,2pm,3pm,4pm,5pm,6pm,7pm,8pm,9pm,10pm,11pm,12am,1am,2am,3am,4am,5am,6am,7am, day FROM studio_timeslots where studio_id = ${obj.studio_id} and studio_service_id = ${obj.service_id} and day >= CURDATE()`,
        function(err, rows, fields) {
          if (err) {
            return reject(err);
          } else {
            return resolve(rows);
          }
        });
      } catch (err) {
        return reject(err);
      }
    });
  },
  getAllBookedDate: function(data, obj){
    var qry = `SELECT st.studio_id, st.day, bcart.order_id, bcart.slot_id, bcart.booking_time from studio_timeslots as st join booking_cart as bcart on st.day >= CURRENT_DATE() and st.id = bcart.slot_id and st.studio_id = ${obj.studio_id} and st.studio_service_id = ${obj.service_id}  and (bcart.order_id != "" or bcart.order_id != 0)`;
    console.log(qry)
    return new Promise(function(resolve, reject) {
      try {
        con.query(qry, function(err, rows, fields) {
        if (err) {
          return reject(err);
        } else {
          return resolve(rows);
          }
        });
      } catch (err) {
        return reject(err);
      }
    });
  },
  
  checkSlot: function(req){
    var data = req.body;
    return new Promise(function(resolve, reject) {
      try {
        var url = `select * from booking_cart where slot_id = ${data.slot_id} and studio_id = ${data.studio_id} and booking_time = "${data.booking_time}" and (order_id != "" OR order_id != NULL)`;
        console.log(url);
        con.query(url, function(err, rows, fields) {
          if (err) {
            return reject(err);
          } else {
            if(rows.length > 0){
              return resolve({
                "status":"error",
                "msg":"Sorry this slot has already been booked"
              });
            }
            return resolve({
              "status":"success",
              "msg":"this slot is available"
            });
          }
        });
      } catch (err) {
        return reject(err);
      }
    });
  }
}

module.exports = studio;




function prepareBookingsDetails(slotsArr, booked){
  var bookedObj = {};
  for(let i=0; i<booked.length; i++){
    if(bookedObj[booked[i].slot_id] === undefined){
      bookedObj[booked[i].slot_id+booked[i].booking_time] = [booked[i]];
    }else{
      bookedObj[booked[i].slot_id].push(booked[i]);
    }
  }

  for(let k=0; k<slotsArr.length; k++){
      slotsArr[k].timings = [];
      for(let j in slotsArr[k]){
        if(j !== 'slot_id' && j !== 'studio_id' && j !== 'day' && j !== 'timings' && slotsArr[k][j] != 0){
          var timings = {
            hour: j,
            amount: parseInt(slotsArr[k][j], 10),
            booked: bookedObj[slotsArr[k].slot_id+j] ? true : false 
          };
          slotsArr[k].timings.push(timings);
          delete slotsArr[k][j];
        }else if(j === 'day'){
          slotsArr[k][j] = moment(slotsArr[k][j]).format('YYYYMMDD');
        }else if(slotsArr[k][j] == 0){
          delete slotsArr[k][j];
        }
      }
  }
  return slotsArr;
}