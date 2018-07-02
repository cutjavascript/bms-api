const mysql = require('mysql');
var con = require('../connection/mysqlcon');

let model = {
    setCart: function(data, cartId) {
        var self = this;
        return new Promise((resolve, reject) => {
            try{
                con.query(`select cart_id from cart where user_id=${data.user_id} and (order_id = 0 or order_id = "")`,
                function(err, rows, fields) {
                    if (err) {
                        return reject({
                            "data": {
                                "status": false,
                                "msg":"Sorry and error has occured.Please try again later."
                            }
                        });
                    } else {
                        if(rows.length > 0){
                            self.setServices(data, rows[0].cart_id)
                            .then(function(success){
                                return resolve(success);
                            }).catch(function(error) {
                                return reject(error);
                            });;
                        }else{
                            let qry = `INSERT INTO cart (id, cart_id, order_id, user_id, total, status) VALUES ('', ${cartId}, '', ${data.user_id}, 0, 'unpaid')`;
                            con.query(qry, function(err, rows){
                                if (err) {
                                    return reject({
                                        "data": {
                                            "status": false,
                                            "msg":"Sorry and error has occured.Please try again later."
                                        }
                                    });
                                } else {
                                    self.setServices(data, cartId)
                                    .then(function(success){
                                        return resolve(success);
                                    }).catch(function(error) {
                                        return reject(error);
                                    });;
                                }
                            });
                        }
                    }
                });
            }catch(e){
                return reject({
                    "data": {
                        "status": false,
                        "msg":"Sorry and error has occured.Please try again later."
                    }
                });
            }
        });
    },
    setBookingCart: function(data, cartId){
        values = [];
        for(let i=0; i<data.bookings.length; i++){
            values[i] = [];
            values[i].push(`(${data.bookings[i].slot_id},(select ${data.bookings[i].booking_time} from studio_timeslots where id = ${data.bookings[i].slot_id}),'${data.bookings[i].booking_time}','${data.user_id}','${data.studio_id}',${cartId})`);
        }
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
    },
    setServices: function(data, cartId){
        let self = this;
        return new Promise(function(resolve, reject){
            var values = [];
            for(let i=0; i<data.services.length; i++){
                values[i] = [];
                values[i].push(`('',${cartId}, '', ${data.services[i].service_id},(SELECT price FROM studio_service where id = ${data.services[i].service_id}), ${data.services[i].count},(SELECT slots_required FROM studio_service where id = ${data.services[i].service_id}),${data.user_id},${data.studio_id})`);
            }

            con.query(`INSERT INTO booking_service_cart (id, cart_id, order_id, service_id, price, service_count, required_slots, user_id, studio_id) VALUES ${values.join(',')}`,function(err, rows){
                if (err){
                    return reject({
                        "data": {
                            "status": false,
                            "msg":"Sorry and error has occured.Please try again later."
                        }
                    });
                } else {
                    self.updateCartPrice(cartId)
                    .then(function(success){
                        return resolve(success);
                    }).catch(function(error) {
                        return reject(error);
                    });
                }
            });
        });
    },
    updateCartPrice: function(cartId){
        let qry = `SELECT SUM(bsc.price * bsc.service_count) as total, SUM(bc.price) as slot_total FROM booking_service_cart bsc LEFT JOIN booking_cart bc ON bc.cart_id = bsc.cart_id and bsc.cart_id = ${cartId}`;
        return new Promise(function(resolve, reject){
            con.query(qry,
            function(err, rows) {
                if (err) {
                    return reject({
                        "data": {
                            "status": false,
                            "msg":"Sorry and error has occured.Please try again later."
                        }
                    });
                } else {
                    let totalCartPrice = rows[0].total !== null ? rows[0].total : 0;
                    totalCartPrice +=  rows[0].slot_total !== null ? rows[0].slot_total : 0;
                    con.query(`UPDATE cart SET total = ${totalCartPrice} WHERE cart_id = ${cartId}`,
                    function(err, rows) {
                        if (err) {
                            return reject({
                                "data": {
                                    "status": false,
                                    "msg":"Sorry and error has occured.Please try again later."
                                }
                            });
                        } else {
                            return resolve({
                                "data": {
                                    "status": true,
                                    "msg":"Data inserted",
                                    "cart_total": totalCartPrice
                                }
                            });
                        }
                    })
                }
            });
        });
            
    }
}

module.exports = model;