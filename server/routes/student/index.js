const express = require("express");
const router = express.Router();

let studentInfo = require("../../db/student/studentInfo");

/* 查询student数据表接口 */
router.get("/studentInfo",(req,res)=>{
    studentInfo.find({},{__v:0},{sort:{age:-1},skip:0,limit:12})
        .then(data=>{
            res.send({
                code: 0,
                msg: "成功",
                data
            })
        })
        .catch(e=>{
            res.send({
                code: -1,
                msg: "服务器错误"
            })
        })
})

/* 删除数据接口 */
router.delete("/delStudentInfo/:id",(req,res)=>{
    let id= req.params.id
    studentInfo.remove({_id:id})
        .then(data=>{
            res.send({
                code: 0,
                msg: "删除成功",
                data
            })
        })
        .catch(err=>{
            res.send({
                code: -1,
                msg: "服务器错误，删除失败"
            })
        })
})

/* 修改数据接口 */
router.post("/editStudentInfo",(req,res)=>{
    let {id,name,sex,age,position,address} = req.body
    studentInfo.update({_id:id},{$set:{name,sex,age,position,address}})
        .then(data=>{
            res.send({
                code: 0,
                msg: "修改成功",
                data
            })
        })
        .catch(err=>{
            res.send({
                code: -1,
                msg: "服务器错误，修改失败"
            })
        })
})

/* 增加数据接口 */
router.post("/insertStudentInfo",(req,res)=>{
    let {name,sex,age,position,address} = req.body;
    studentInfo.insertMany({name,sex,age,position,address})
        .then(data=>{
            res.send({
                code: 0,
                msg: "成功添加数据",
                data
            })
        })
        .catch(err=>{
            res.send({
                code: -1,
                msg: "服务器错误，数据添加失败"
            })
        })
})


module.exports = router;