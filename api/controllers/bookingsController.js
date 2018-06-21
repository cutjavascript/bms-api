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

            if(data.cartId && data.cartId != 0){
                cartId =  (new Date).getTime();
            }else{
                cartId = data.cartId;
            }
            if(data.services){
                promiseArr.push(booking.setCart(data, cartId));
            }
            if(data.bookings){
                promiseArr.push(booking.setBookingCart(data, cartId));
            }
            Promise.all(promiseArr)
            .then(function (success) {
                res.json({
                  data: {
                      status: "Success",
                      msg:"data successfuly inserted",
                      cart_id: cartId
                  }
                });
            }).catch(function(error) {
              console.log(error);
              res.json({
                  data: {
                    "status":"error",
                    "msg":"Sorry this slot has already been booked",
                    "cart_id":0
                    }
              })
            });
        }
    }
};

module.exports = bookingController;
