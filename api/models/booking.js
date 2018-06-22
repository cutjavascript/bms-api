const mysql = require('mysql');
var con = require('../connection/mysqlcon');

let model = {
    setCart: (data, cartId) => {
        // console.log("setCart: ", data);
        values = [];
        for(let i=0; i<data.services.length; i++){
            values[i] = [];
            var id = data.services[i].id ? data.services[i].id : '';
            values[i].push(`('${id}',${data.services[i].service_id},${data.services[i].service_count},${data.user_id},${data.studio_id},${cartId},(SELECT price FROM studio_service where id = ${data.services[i].service_id}), (SELECT slots_required FROM studio_service where id = ${data.services[i].service_id}))`);
        }
        // console.log("setCart: ", values);
        return new Promise(function(resolve, reject) {
            try {
                con.query(`INSERT INTO booking_service_cart (id, service_id, service_count, user_id, studio_id, cart_id, price, required_slots) 
                VALUES ${values.join(',')} ON DUPLICATE KEY UPDATE service_count=VALUES(service_count)`,
                function(err, rows, fields) {
                    if (err) {
                        return reject(err);
                    } else {
                        console.log("ca;backs-->", rows, fields, this.insertId);
                        return resolve(rows);
                    }
                });
            } catch (err) {
                return reject(err);
            }
        });
    },
    setBookingCart: (data, cartId) => {
        values = [];
        for(let i=0; i<data.bookings.length; i++){
            values[i] = [];
            values[i].push(`(${data.bookings[i].slot_id},(select ${data.bookings[i].booking_time} from studio_timeslots where id = ${data.bookings[i].slot_id}),'${data.bookings[i].booking_time}','${data.user_id}','${data.studio_id}',${cartId})`);
        }
        // console.log("setBookingCart: ", values);
        return new Promise(function(resolve, reject) {
            try {
                con.query(`INSERT INTO booking_cart (slot_id, price, booking_time, user_id, studio_id, cart_id) 
                VALUES ${values.join(',')}`,
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
    }
}

module.exports = model;

// NOT EXISTS (SELECT * FROM requests WHERE subject = 'test' AND text = 'test 1234')

/*
    {
        "studio_id":1,
        "user_id":2,
        "bookings":[
            {"slot_id":1,"booking_time":"8pm", amount: 2000},
            {"slot_id":2,"booking_time":"9pm", amount: 2000}
        ],
        "services"":[
        {
            "service_id":1,
            "service_count":2,
            "required_slots": 1,
            "price": 1000
        },
        {
            "service_id":2,
            "service_count":1,
            "required_slots": 1,
            "price": 1000
        }]
    }
*/