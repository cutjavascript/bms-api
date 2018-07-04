var booking = require('../models/booking')

var bookingController = {
    // setCart: (req, res) => {
    //     if(req.body){
    //         try{
    //             var data = req.body;
    //         }catch(error){
    //             console.log(error);
    //         }
            
    //         var promiseArr = [];
    //         var cartId;

    //         if(data.cart_id === undefined || data.cart_id == 0){
    //             cartId =  (new Date).getTime();
    //         }else{
    //             cartId = data.cart_id;
    //         }
    //         // console.log(data.services, cartId);
    //         if(data.services && data.services.length > 0){
    //             promiseArr.push(booking.setCart(data, cartId));
    //         }
    //         if(data.bookings && data.bookings.length > 0){
    //             promiseArr.push(booking.setBookingCart(data, cartId));
    //         }
    //         // console.log(bookingController, cartId);
    //         Promise.all(promiseArr)
    //         .then(function (success) {
    //             if(success.length > 0){
    //                 res.json({
    //                     data: {
    //                         status: true,
    //                         msg:"data successfuly inserted",
    //                         cart_id: cartId
    //                     }
    //                   });
    //             }else{
    //                 res.json({
    //                     data: {
    //                       "status": false,
    //                       "msg":`Sorry, Data not inserted`,
    //                       "cart_id":0
    //                       }
    //                 })
    //             }
    //         }).catch(function(error) {
    //           res.json({
    //               data: {
    //                 "status": false,
    //                 "msg":`Sorry, This slot has already been booked`,
    //                 "cart_id":0
    //                 }
    //           })
    //         });
    //     }
    // },
    setService: (req, res) => {
        if(req.body){
            try{
                var data = req.body;
            }catch(error){
                console.log(error);
            }
            
            var promiseArr = [];
            var cartId;

            if(data.cart_id === undefined || data.cart_id == 0){
                cartId =  (new Date).getTime();

            }else{
                cartId = data.cart_id;
            }
            if(data.services && data.services.length > 0){
                console.log(data, cartId);
                promiseArr.push(booking.setCart(data, parseInt(cartId, 10)));
            }
            Promise.all(promiseArr)
            .then(function (success) {
                res.json(success[0]);
            }).catch(function(error) {
              res.json(error)
            });
        }
    },
    cartServices: (req, res) => {
        if(req.body && req.body.studio_id && req.body.user_id){
            var data = req.body;
            if(!isNaN(data.user_id) && !isNaN(data.studio_id)){
                booking.cartServices(data)
                .then(function(success){
                    res.json(success)
                }).catch(function(error){
                    res.json(error)
                });
            }else{
                res.json({
                    "data":{
                        "status": false,
                        "msg":"Request data is not valid"
                    }
                })
            }
        }else {
            res.json({
                "data":{
                    "status": false,
                    "msg":"Request data is not valid"
                }
            })
        }
    },
    addSlots:  (req, res) =>{
        if(req.body && req.body.cart_service_id && req.body.user_id){
            var data = req.body;
            if(!isNaN(data.user_id) && !isNaN(data.cart_service_id)){
                booking.addSlots(data)
                .then(function(success){
                    res.json(success)
                }).catch(function(error){
                    res.json(error)
                });
            }else{
                res.json({
                    "data":{
                        "status": false,
                        "msg":"Request data is not valid"
                    }
                })
            }
        }else {
            res.json({
                "data":{
                    "status": false,
                    "msg":"Request data is not valid"
                }
            })
        }
    },
    uncheckSlots:  (req, res) =>{
        if(req.body && req.body.cart_service_id && req.body.user_id){
            var data = req.body;
            if(!isNaN(data.user_id) && !isNaN(data.cart_service_id)){
                booking.removeSlot(data)
                .then(function(success){
                    res.json(success)
                }).catch(function(error){
                    res.json(error)
                });
            }else{
                res.json({
                    "data":{
                        "status": false,
                        "msg":"Request data is not valid"
                    }
                })
            }
        }else {
            res.json({
                "data":{
                    "status": false,
                    "msg":"Request data is not valid"
                }
            })
        }
    },
    getCart: (req, res) => {
        if(req.body && req.body.user_id){
            var data = req.body;
            if(!isNaN(data.user_id)){
                booking.getCart(data)
                .then(function(success){
                    res.json(success)
                }).catch(function(error){
                    res.json(error)
                });
            }else{
                res.json({
                    "data":{
                        "status": false,
                        "msg":"Request data is not valid"
                    }
                })
            }
        }else {
            res.json({
                "data":{
                    "status": false,
                    "msg":"Request data is not valid"
                }
            })
        }
    }
};

module.exports = bookingController;
