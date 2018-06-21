var studio = require('../models/Studio');
var moment = require('moment'); 

var studioController = {
  getAll: function(req, res){
    studio.getAll()
    .then(function (success) {
      res.json({
        data: rows
      });
    }).catch(function(error) {
      console.log(error);
      res.json({
          data: {
            "status":"error",
            "msg": error
            }
      })
    });
  },
  findOne: function(req, res){
    studio.findOne(req)
    .then(function (success) {
      res.json({
        data: rows
      });
    }).catch(function(error) {
      console.log(error);
      res.json({
          data: {
            "status":"error",
            "msg": error
            }
      })
    });
  },
  createStudio: function(req, res){
    res.json({
      key: "Create a studio"
    });
  },
  getAllService: function(req, res){
    studio.getAll(req)
    .then(function (success) {
      res.json({
        data: rows
      });
    }).catch(function(error) {
      console.log(error);
      res.json({
          data: {
            "status":"error",
            "msg": error
            }
      })
    });
  },
  getStudioService: function(req, res){
    if(!isNaN(req.params.id)){
        Promise.all([
          studio.getStudioDetails(req.params.id),
          studio.getServiceByStudio(req.params.id),
          studio.getStudioCalender(req.params.id),
          studio.getAllBookedDate(req.params.id)
        ]).then(function (success) {
            var bookings = prepareBookingsDetails(Object.assign(success[2]), Object.assign(success[3]));
            var response = Object.assign({}, success[0][0], {services: success[1]}, { bookings: bookings}, {booked: success[3]});
            res.json({
              data: response
            });
        }).catch(function(error){
          res.json({
            data: {
              "status":"error",
              "msg":error
              }
          })
        });
    }else{
      res.json({
        data: {
          "status":"error",
          "msg": "Id should be a number"
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
          "status":"error",
          "msg":error
          }
      })
    });;
  }
};


function prepareBookingsDetails(slotsArr, booked){
  var bookedObj = {};
  for(let i=0; i<booked.length; i++){
    if(bookedObj[booked[i].slot_id] === undefined){
      bookedObj[booked[i].slot_id+booked[i].booking_time] = [booked[i]];
    }else{
      bookedObj[booked[i].slot_id].push(booked[i]);
    }
  }

  for(let k=0; k<slotsArr.length; k++){
      slotsArr[k].timings = [];
      for(let j in slotsArr[k]){
        if(j !== 'slotId' && j !== 'studioId' && j !== 'date' && j !== 'timings'){
          var timings = {
            hour: j,
            amount: slotsArr[k][j],
            booked: bookedObj[slotsArr[k].slotId+j] ? true : false 
          };
          slotsArr[k].timings.push(timings);
          delete slotsArr[k][j];
        }else if(j === 'date'){
          slotsArr[k][j] = moment(slotsArr[k][j]).format('YYYYMMDDHHmmss');
        }
      }
  }
  return slotsArr;
}

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