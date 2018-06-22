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

            if(data.cart_id && data.cart_id == 0){
                cartId =  (new Date).getTime();
            }else{
                cartId = data.cart_id;
            }
            // console.log(data.services, cartId);
            if(data.services){
                promiseArr.push(booking.setCart(data, cartId));
            }
            if(data.bookings){
                promiseArr.push(booking.setBookingCart(data, cartId));
            }
            // console.log(bookingController, cartId);
            Promise.all(promiseArr)
            .then(function (success) {
                res.json({
                  data: {
                      status: true,
                      msg:"data successfuly inserted",
                      cart_id: cartId
                  }
                });
            }).catch(function(error) {
              res.json({
                  data: {
                    "status": false,
                    "msg":"Sorry this slot has already been booked",
                    "cart_id":0
                    }
              })
            });
        }
    }
};

module.exports = bookingController;
