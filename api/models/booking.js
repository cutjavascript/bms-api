const mysql = require('mysql');
var con = require('../connection/mysqlcon');

let model = {
    setCart: (data, cartId) => {
        console.log("setCart: ", data);
        values = [];
        for(let i=0; i<data.services.length; i++){
            values[i] = [];
            values[i].push(
                data.services[i].service_id,
                data.services[i].price,
                data.services[i].service_count,
                data.services[i].required_slots,
                data.user_id,
                data.studio_id,
                cartId
            );
        }
        console.log("setCart: ", values);
        return new Promise(function(resolve, reject) {
            try {
                con.query(`INSERT INTO booking_service_cart (service_id, price, count, required_slots, user_id, studio_id, cartid) 
                VALUES ?`, [values],
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
    setBookingCart: (data, cartId) => {
        values = [];
        for(let i=0; i<data.bookings.length; i++){
            values[i] = [];
            values[i].push(
                data.bookings[i].slot_id,
                data.bookings[i].amount,
                data.bookings[i].booking_time,
                data.user_id,
                data.studio_id,
                cartId
            );
        }
        console.log("setBookingCart: ", values);
        return new Promise(function(resolve, reject) {
            try {
                con.query(`INSERT INTO booking_cart (slot_id, price, booking_time, user_id, studio_id, cartid) 
                VALUES ?`, [values],
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