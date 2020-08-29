const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let studentInfo = mongoose.model("studentInfo",new Schema({
    name: {type: String,required: true},
    sex: {type: String,required: true},
    age: {type: Number,required: true},
    position: {type: String,required: true},
    address: {type: String,required: true}
}))

// for(let i = 0;i < 50;i++){
//     studentInfo.create({
//         name: ["马一","黄二","张三","李四","王五","陈六","龙七","徐八","韩九","余十"][Math.floor(Math.random()*8)],
//         sex: ["男","女"][Math.floor(Math.random()*2)],
//         age: Math.floor(Math.random()*20),
//         position: ["学生","班干部"][Math.floor(Math.random()*2)],
//         address: "广东"+["广州","深圳","东莞","惠州","清远","汕头"][Math.floor(Math.random()*6)]
//     })
// }

module.exports = studentInfo;
