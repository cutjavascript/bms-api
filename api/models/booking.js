const mysql = require('mysql');
var con = require('../connection/mysqlcon');
var moment = require('moment'); 

let model = {
    setCart: function(data, cartId) {
        var self = this;
        return new Promise((resolve, reject) => {
            try{
                self.getLatestCartId(data.user_id)
                .catch(function(error){
                    return reject({
                        "data": {
                            "status": false,
                            "msg": "Sorry and error has occured.Please try again later."
                        }
                    });
                })
                .then(function(rows){
                    if(rows.length > 0){
                        self.setServices(data, rows[0].cart_id)
                        .then(function(success){
                            return resolve(success);
                        }).catch(function(error) {
                            return reject(error);
                        });
                    }else{
                        let qry = `INSERT INTO cart (id, cart_id, order_id, user_id, total, status) VALUES ('', ${cartId}, '', ${data.user_id}, 0, 'unpaid')`;
                        con.query(qry, function(err, rows){
                            if (err) {
                                return reject({
                                    "data": {
                                        "status": false,
                                        "msg": "Sorry and error has occured.Please try again later."
                                    }
                                });
                            } else {
                                self.setServices(data, cartId)
                                .then(function(success) {
                                    return resolve(success);
                                }).catch(function(error) {
                                    return reject(error);
                                });;
                            }
                        });
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
    getLatestCartId: function(user_id){
        return new Promise((resolve, reject) => {
            con.query(`select cart_id from cart where user_id=${user_id} and (order_id = 0 or order_id = "")`,
            function(err, rows, fields) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            });
        });
    },
    // setBookingCart: function(data, cartId){
    //     values = [];
    //     for(let i=0; i<data.bookings.length; i++){
    //         values[i] = [];
    //         values[i].push(`(${data.bookings[i].slot_id},(select ${data.bookings[i].booking_time} from studio_timeslots where id = ${data.bookings[i].slot_id}),'${data.bookings[i].booking_time}','${data.user_id}','${data.studio_id}',${cartId})`);
    //     }
    //     return new Promise(function(resolve, reject) {
    //         try {
    //             con.query(`INSERT INTO booking_cart (slot_id, price, booking_time, user_id, studio_id, cart_id) 
    //             VALUES ${values.join(',')}`,
    //             function(err, rows, fields) {
    //                 if (err) {
    //                     return reject(err);
    //                 } else {
    //                     return resolve(rows);
    //                 }
    //             });
    //         } catch (err) {
    //             return reject(err);
    //         }
    //     });
    // },
    setServices: function(data, cartId){
        let self = this;
        return new Promise(function(resolve, reject){
            var values = [];
            for(let i=0; i<data.services.length; i++){
                values[i] = [];
                let id = data.services[i].id ? data.services[i].id : '';
                values[i].push(`('${id}',${cartId}, '', ${data.services[i].service_id},(SELECT price FROM studio_service where id = ${data.services[i].service_id}), ${data.services[i].count},(SELECT slots_required FROM studio_service where id = ${data.services[i].service_id}),${data.user_id},${data.studio_id})`);
            }

            con.query(`INSERT INTO booking_service_cart (id, cart_id, order_id, service_id, price, service_count, required_slots, user_id, studio_id) VALUES ${values.join(',')}  ON DUPLICATE KEY UPDATE service_count=VALUES(service_count)`,function(err, rows){
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
        let qry = `SELECT SUM(bsc.price * bsc.service_count) as total, SUM(bc.price) as slot_total FROM booking_service_cart bsc LEFT JOIN booking_cart bc ON bc.cart_id = bsc.cart_id and bc.service_cart_id = bsc.id and bsc.cart_id = ${cartId}`;
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
                            con.query(`select id, service_id, service_count as count from booking_service_cart where cart_id = ${cartId} and order_id = 0`, function(err, rows){
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
                                            "msg":"Data updated",
                                            "cart_total": totalCartPrice,
                                            service: rows
                                        }
                                    });
                                }
                            });
                            
                        }
                    })
                }
            });
        });
            
    },
    cartServices: function(data){
        return new Promise(function(resolve, reject) {
            try {
                var url = `select c.cart_id, c.total, bsc.id as cart_service_id, bsc.required_slots as bookings_required, bsc.service_count, s.name, sm.service_name, bsc.price as amount FROM cart c JOIN booking_service_cart bsc ON bsc.cart_id = c.cart_id and (c.order_id = 0 or c.order_id = '') and c.user_id = ${data.user_id} and bsc.studio_id =  ${data.studio_id} JOIN studio s ON s.studio_id = bsc.studio_id JOIN studio_service ss ON ss.id = bsc.service_id JOIN service_master sm ON sm.id = ss.service_id`;
                con.query(url, function(err, rows) {
                if (err) {
                    return reject({
                        "data":{
                            "status": false,
                            "msg":"Sorry cannot find services",
                        }
                    });
                } else {
                    return resolve({
                        "status": true,
                        "msg":"Success",
                        services: rows
                    });
                    
                }
                });
            } catch (err) {
                return reject(err);
            }
        });
    },
    addSlots: function(data){
        let self = this;
        return new Promise(function(resolve, reject) {
            try {
                self.getLatestCartId(data.user_id)
                .catch(function(error){
                    return reject({
                        "data": {
                            "status": false,
                            "msg": "Sorry and error has occured.Please try again later."
                        }
                    });
                })
                .then(function(rows){
                    if(rows.length > 0){

                        // {
                        //     "user_id": 2,
                        //     "cart_service_id": 2,
                        //     "bookings": [
                        //       {
                        //       "slot_id": 2,
                        //       "booking_time": "2pm",
                        //       "availed": true
                        //       }
                        //     ],
                        //     "bookingDay": "201806302pm"
                        //   }
                        let cartId = rows[0].cart_id;
                        var url = `insert into booking_cart (cart_id, slot_id, service_cart_id, user_id, booking_time, studio_id, price) values (${rows[0].cart_id},${data.bookings[0].slot_id}, ${data.cart_service_id}, ${data.user_id}, '${data.bookings[0].booking_time}', (select studio_id from studio_timeslots WHERE id = ${data.bookings[0].slot_id}), (select ${data.bookings[0].booking_time} as price from studio_timeslots WHERE id = ${data.bookings[0].slot_id}))`;
                        
                        con.query(url, function(err, rows) {
                            if (err) {
                                return reject({
                                    "data":{
                                        "status": false,
                                        "msg":`Insert faild:--> ${err}`,
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
                    }else{
                        return reject({
                            "data":{
                                "status": false,
                                "msg":"Add service before booking"
                            }
                        });
                    }   
                });
            } catch (err) {
                return reject(err);
            }
        });
    },
    removeSlot: function(data){
        let self = this;
        return new Promise(function(resolve, reject) {
            try {
                var url = `select cart_id from booking_cart where slot_id = ${data.bookings[0].slot_id} and service_cart_id = ${data.cart_service_id} and user_id = ${data.user_id} and booking_time = '${data.bookings[0].booking_time}'`;
                // console.log("removeSlot==> ", url);
                con.query(url, function(err, rows) {
                    
                    if (err) {
                        return reject({
                            "data":{
                                "status": false,
                                "msg":"No data present",
                            }
                        });
                    } else {
                        let cartId = rows[0].cart_id;
                        var url = `delete from booking_cart where slot_id = ${data.bookings[0].slot_id} and service_cart_id = ${data.cart_service_id} and user_id = ${data.user_id} and booking_time = '${data.bookings[0].booking_time}'`;
                        con.query(url, function(err, rows) {
                            if (err) {
                                return reject({
                                    "data":{
                                        "status": false,
                                        "msg":"Delete faild",
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
                    }
                });
            } catch (err) {
                return reject(err);
            }
        });
    },
    getCart: function(data){

        let self = this;
        return new Promise(function(resolve, reject) {
            try {
                con.query(`select cart_id, total as cart_total from cart where user_id = ${data.user_id} and order_id = 0`,
                function(err, rows, fields) {
                    if (err) {
                        return reject(err);
                    } else {
                        self.getServiceDetailsByCart(rows[0], data.user_id)
                        .then(function(success){
                            return resolve({
                                data: success
                            });
                        }).catch(function(error){
                            return reject(error);
                        });
                    }
                });
            } catch (err) {
                return reject(err);
            }
        });
    },
    getServiceDetailsByCart: function(data, user_id) {
        let self = this;
        return new Promise(function(resolve, reject) {
            try {
                con.query(`select bsc.id, bsc.service_id, bsc.price as amount, bsc.service_count as count, bsc.required_slots, sm.service_name from booking_service_cart bsc JOIN studio_service ss ON ss.id = bsc.service_id and bsc.cart_id = ${data.cart_id} JOIN service_master sm ON sm.id = ss.service_id`,
                function(err, rows, fields) {
                    if (err) {
                        return reject({
                            "data": {
                                "status": false,
                                "msg":"Sorry and error has occured.Please try again later."
                            }
                        });
                    } else {
                        data.status = true;
                        data.msg = "cart details found";
                        data.services = rows;

                        self.getSlotsByCart(data, data.cart_id)
                        .then(function(success){
                            return resolve(success);
                        }).catch(function(error){
                            return reject(error);
                        });
                        // return resolve(data);
                    }
                });
            } catch (err) {
                return reject({
                    "data": {
                        "status": false,
                        "msg":"Sorry and error has occured.Please try again later."
                    }
                });
            }
        });
    },
    getSlotsByCart: function(data, cartId){
        let self = this;
        return new Promise(function(resolve, reject){
            try{
                con.query(`SELECT bc.service_cart_id, bc.price as amount, st.day, bc.booking_time FROM booking_cart bc JOIN studio_timeslots st ON st.id = bc.slot_id and bc.cart_id = ${cartId} and bc.order_id = 0`, function(err, rows){
                    if (err) {
                        return reject({
                            "data": {
                                "status": false,
                                "msg":"Sorry and error has occured.Please try again later."
                            }
                        });
                    } else {
                        let result = self.conposeCartData(data, rows);
                        return resolve(result);
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
        })
    },
    conposeCartData: function(data, rows){
        bookingObj = {};
        for(var i=0; i<rows.length;i++){
            rows[i].day = moment(rows[i].day).format('YYYYMMDD');
            if(bookingObj[rows[i].service_cart_id] === undefined){
                bookingObj[rows[i].service_cart_id] = {
                    total: 0,
                    list: []
                };
                bookingObj[rows[i].service_cart_id].total += rows[i].amount;
                bookingObj[rows[i].service_cart_id].list.push(rows[i]);
            }else{
                bookingObj[rows[i].service_cart_id].total += rows[i].amount;
                bookingObj[rows[i].service_cart_id].list.push(rows[i]);            
            }
        }

        for(var i=0; i<data.services.length;i++){
            if(bookingObj[data.services[i].id]){
                data.services[i].amount = bookingObj[data.services[i].id].total;
                var list = bookingObj[data.services[i].id].list,
                    obj = {};
                for(var k=0;k<list.length; k++){
                    if(obj[list[k].day] === undefined){
                        obj[list[k].day] = [];
                        obj[list[k].day].push(list[k]);
                    }else{
                        obj[list[k].day].push(list[k]);
                    }
                }

                for(c in obj){
                    data.services[i].bookings = {
                        day: c,
                        timings: obj[c]
                    }
                }
            }
        }

        return data;
    }
}
module.exports = model;