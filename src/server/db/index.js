var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var settings = require('../settings');
mongoose.connect(settings.url);
//用户信息和发表的文章
mongoose.model('User',new mongoose.Schema({
    username:{type:String,isRequired:true},
    password:{type:String,isRequired:true},
    list:{type:Object,default:[]}
}))

//列表Model
mongoose.model('Message',new mongoose.Schema({
    // id:{type:String,isRequired:true},
    message:{type:String,isRequired:true},    //标题
    createAt:{type:String,isRequired:true},
    sendDate:{type:String,isRequired:true},
    sender:{type:String,isRequired:true},
    listener:{type:String,isRequired:true}
}))
//在程序的任何地方都可以调用此方法,设置为全局
global.Model = function (modelName) {
    return mongoose.model(modelName)
}

