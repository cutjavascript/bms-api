var studio = require('../models/Studio');
var moment = require('moment'); 

var studioController = {
  fetchServicesSlots: function(req, res){
    if(req.body){
      studio.fetchServicesSlots(req.body).then(function (success) {
          res.json(success);

          // if(success.length > 0){
          //   var bookings = prepareBookingsDetails(Object.assign(success[2]), Object.assign(success[3]));
          //   var response = Object.assign({}, success[0][0], {services: success[1]}, { bookings: bookings});
          //   res.json({
          //     data: response
          //   });
          // }else{
          //   res.json({
          //     data: {
          //       "status": false,
          //       "msg":"Something went worng"
          //       }
          //   })
          // }
            
        }).catch(function(error){
          res.json(error)
        });
    }else{
      res.json({
        data: {
          "status": false,
          "msg": "Request data is not valid"
          }
      })
    }
  },
  checkSlot: function(req, res){
    studio.checkSlot(req)
    .then((data)=>{
      res.json({data: data});
    })
    .catch(function(error){
      res.json({
        data: {
          "status": false,
          "msg":error
          }
      })
    });;
  },

  studioServices: function(req, res){
    var studioId = req.body.studio_id,
    user_id = req.body.user_id;
    if(!isNaN(studioId)){
      studio.getServiceByStudio(studioId)
      .then(function (success) {
        if(success.length > 0){
          var response = Object.assign({}, {services: success});
          res.json({
            "status": true,
            "msg": "success",
            data: response
          });
        }else{
          res.json({
            data: {
              "status": false,
              "msg":"Something went worng"
            }
          })
        } 
      }).catch(function(error){
        res.json({
          data: {
            "status": false,
            "msg":error
          }
        })
      });
    }else{
      res.json({
        data: {
          "status": false,
          "msg": "Id should be a number"
        }
      })
    }
  }
};

function errorLooger(req, res, err){
  /* We log the error internaly */
  console.log(err);

	/*
     * Remove Error's `stack` property. We don't want
     * users to see this at the production env
     */
    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }

	/* Finaly respond to the request */
    res.status(err.statusCode || 500).json(err);
}
module.exports = studioController;