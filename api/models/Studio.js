const mysql = require('mysql');
var con = require('../connection/mysqlcon');


var studio = {
  // getStudioDetails: function(studioId){
  //   return new Promise(function(resolve, reject) {
  //     try {
  //       con.query(`SELECT studio_id, name as studio_name from studio where studio_id = ${studioId}`, function(err, rows, fields) {
  //       if (err) {
  //         return reject(err);
  //       } else {
  //         return resolve(rows);
  //         }
  //       });
  //     } catch (err) {
  //       return reject(err);
  //     }
  //   });
  // },
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
  // getStudioCalender: function(studioId){
  //   return new Promise(function(resolve, reject) {
  //     try {
  //       con.query(`SELECT id as slot_id, studio_id, 8am,9am,10am,12pm,1pm,2pm,3pm,4pm,5pm,6pm,7pm,8pm,9pm,10pm,11pm,12am,1am,2am,3am,4am,5am,6am,7am, day FROM studio_timeslots where studio_id = ${studioId} and day >= CURDATE()`,
  //       function(err, rows, fields) {
  //         if (err) {
  //           return reject(err);
  //         } else {
  //           return resolve(rows);
  //         }
  //       });
  //     } catch (err) {
  //       return reject(err);
  //     }
  //   });
  // },
  // getAllBookedDate: function(studioId){
  //   var qry = `SELECT st.studio_id, st.date, bcart.order_id, bcart.slot_id, bcart.booking_time from studio_timeslots as st join booking_cart as bcart on st.date >= CURRENT_DATE() and st.id = bcart.slot_id and st.studio_id = ${studioId} and (bcart.order_id != "" or bcart.order_id != NULL)`;
  //   return new Promise(function(resolve, reject) {
  //     try {
  //       con.query(qry, function(err, rows, fields) {
  //       if (err) {
  //         return reject(err);
  //       } else {
  //         return resolve(rows);
  //         }
  //       });
  //     } catch (err) {
  //       return reject(err);
  //     }
  //   });
  // },
  
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