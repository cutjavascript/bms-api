const mysql = require('mysql');
var con = require('../connection/mysqlcon');


var studio = {
  getAll: function(){
    return Promise((resolve, reject) => {
      con.query(`SELECT * FROM studio`,
      (err, rows) => {
        if(err) {
          reject(res, err);
        }
        resolve(rows);
      });
    })
  },
  findOne: function(req){
    let url = `SELECT * FROM studio where studio_id=${mysql.escape(req.params.id)}`;
    return new Promise(function(resolve, reject) {
      con.query(url,
        (err, rows) => {
          if (err) {
            return reject(err);
          } else {
              return resolve(rows);
          }
        });
    });
  },
  getAllService: function(req){
    return Promise((resolve, reject) => {
      let url = `SELECT * FROM studio_service where studio_id=${mysql.escape(req.params.id)}`;
      con.query(url,
        (err, rows) => {
          if(err) {
            reject(req, res, err);
          }
          resolve(rows);
        });
    })
  },
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
  getStudioCalender: function(studioId){
    return new Promise(function(resolve, reject) {
      try {
        con.query(
          `SELECT 
          id as slotId,
          studio_id as studioId,
          date,
          CASE 8am WHEN 0 THEN price ELSE 8am END as 8am, 
          CASE 9am WHEN 0 THEN price ELSE 9am END as 9am, 
          CASE 10am WHEN 0 THEN price ELSE 10am END as 10am, 
          CASE 11am WHEN 0 THEN price ELSE 11am END as 11am, 
          CASE 12pm WHEN 0 THEN price ELSE 12pm END as 12pm, 
          CASE 1pm WHEN 0 THEN price ELSE 1pm END as 1pm, 
          CASE 2pm WHEN 0 THEN price ELSE 2pm END as 2pm, 
          CASE 3pm WHEN 0 THEN price ELSE 3pm END as 3pm, 
          CASE 4pm WHEN 0 THEN price ELSE 4pm END as 4pm, 
          CASE 5pm WHEN 0 THEN price ELSE 5pm END as 5pm, 
          CASE 6pm WHEN 0 THEN price ELSE 6pm END as 6pm, 
          CASE 7pm WHEN 0 THEN price ELSE 7pm END as 7pm, 
          CASE 8pm WHEN 0 THEN price ELSE 8pm END as 8pm, 
          CASE 9pm WHEN 0 THEN price ELSE 9pm END as 9pm, 
          CASE 10pm WHEN 0 THEN price ELSE 10pm END as 10pm, 
          CASE 11pm WHEN 0 THEN price ELSE 11pm END as 11pm, 
          CASE 12am WHEN 0 THEN price ELSE 12am END as 12am, 
          CASE 1am WHEN 0 THEN price ELSE 1am END as 1am, 
          CASE 2am WHEN 0 THEN price ELSE 2am END as 2am, 
          CASE 3am WHEN 0 THEN price ELSE 3am END as 3am, 
          CASE 4am WHEN 0 THEN price ELSE 4am END as 4am, 
          CASE 5am WHEN 0 THEN price ELSE 5am END as 5am,
          CASE 6am WHEN 0 THEN price ELSE 6am END as 6am, 
          CASE 7am WHEN 0 THEN price ELSE 7am END as 7am
          FROM studio_timeslots where studio_id = ${studioId} and date >= CURDATE()`, 
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
  getAllBookedDate: function(studioId){
    var qry = `SELECT st.studio_id, st.date, bcart.orderid, bcart.slot_id, bcart.booking_time from studio_timeslots as st join booking_cart as bcart on st.date >= CURRENT_DATE() and st.id = bcart.slot_id and st.studio_id = ${studioId} and (bcart.orderid != "" or bcart.orderid != NULL)`;
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
        var url = `select * from booking_cart where slot_id = ${data.slot_id} and studio_id = ${data.studio_id} and booking_time = "${data.booking_time}" and (orderid != "" OR orderid != NULL)`;
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