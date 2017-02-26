var express  = require('express');
var formidable = require('formidable');
var router = express.Router();
var path= require('path');
var fs = require('fs');

var API = 'http://localhost:8888';

router.post('/register',function(req,res){
  var user = req.body;
  console.log(user);
  Model('User').findOne({username:user.username},function(err,doc){
    if(err){
      res.send({id:0,content:'err'})
    }else if(doc){
      console.log('this is doc'+ doc.username);
      //这里总还是能返回一个的
      res.send({id:2,content:'username being token'})
    }else{
      Model('User').create(user,function(err,doc){
        if(err){
          res.send({id:3,content:'err in creating'})
        }else{
          res.send({id:1,content:doc._id})
        }
      })
    }
  })
})

router.post('/login',function (req,res) {
  var user = req.body;
  console.log(user);
  Model('User').findOne({username:user.username},function (err,doc) {
    if(err){
      res.send({id:0,content:err});
    }else if(doc == null || doc == {}){
      console.log(doc+'this is doc')
      res.send({id:0,content:'register first'})
    }
    else{
      console.log('this is doc'+ doc)
      if(doc.password != user.password){
        res.send({id:0,content:'wrong password'})
      }else{
        res.send({id:1,content:doc._id})
      }
    }
  })
})
/*
* post body 内还能保持json结构
* */
// router.post('/storeMessage',function(req,res){
//   var message = req.body;
//   Model('Message').create({message},function(err,doc){
//       if(err){
//         res.send({id:0,content:'err'})
//       }else{
//         res.send({id:1,content:'success'})
//       }
//   })
// })

router.get('/chat/:senderName/:listenerName',function (req,res) {
  var orderBy = 'createAt';
  var order = -1;
  var orderObj = {};
  orderObj[orderBy] = order;
  var senderName = req.query.senderName;
  var listenerName = req.query.listenerName;
  console.log(senderName + listenerName + " until now work")
  Model('Message').find({$or:[{sender:senderName, listener:listenerName},{listener:senderName, sender:listenerName}]},
      // {'from':1,'listener':1,'message':1,'createAt':1,_id:0}
      )
      .sort(orderObj).exec(function (err,docs) {
        console.log(docs+'this.is docs');
    if(err){
      res.send(err)
    }else if(docs == null || docs == {}){
      console.log(doc+'this is doc')
      res.send({id:0,content:'fetch message wrong'})
    }
    else{
      var json = [];
      docs.forEach(function (item) {
        json.push({
          senderName:item.sender,
          listenerName:item.listener,
          message:item.message,
          sendDate: item.sendDate
        })
      })
      console.log(json);
      res.send({id:1,content:json})
    }
  })
})


module.exports = router;