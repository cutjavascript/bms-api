var booking = require('../models/booking')

var bookingController = {
    setCart: (req, res) => {
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
            // console.log(data.services, cartId);
            if(data.services && data.services.length > 0){
                promiseArr.push(booking.setCart(data, cartId));
            }
            if(data.bookings && data.bookings.length > 0){
                promiseArr.push(booking.setBookingCart(data, cartId));
            }
            // console.log(bookingController, cartId);
            Promise.all(promiseArr)
            .then(function (success) {
                if(success.length > 0){
                    res.json({
                        data: {
                            status: true,
                            msg:"data successfuly inserted",
                            cart_id: cartId
                        }
                      });
                }else{
                    res.json({
                        data: {
                          "status": false,
                          "msg":`Sorry, Data not inserted`,
                          "cart_id":0
                          }
                    })
                }
            }).catch(function(error) {
              res.json({
                  data: {
                    "status": false,
                    "msg":`Sorry, This slot has already been booked`,
                    "cart_id":0
                    }
              })
            });
        }
    }
};

module.exports = bookingController;
