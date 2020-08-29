<template>
    <div class="Student">
        <div class="student_box">
            <div class="studentInfo_data">
                <table border="1">
                    <thead>
                        <tr>
                            <td>姓名</td>
                            <td>性别</td>
                            <td>年龄</td>
                            <td>家庭住址</td>
                            <td colspan="2">操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in student">
                            <td>{{item.name}}</td>
                            <td>{{item.sex}}</td>
                            <td>{{item.age}}</td>
                            <td>{{item.address}}</td>
                            <td class="edit" @click="Edit(item)">修改</td>
                            <td class="delete" @click="Delete(item._id)">删除</td>
                        </tr>
                    </tbody>
                </table>
                <div class="insert"><button @click="insert">新增</button></div>
                <div class="editForm" v-if="display">
                    <div class="form">
                        <div class="title">{{confirmAddOrEditName}}</div>
                        <span><b>name: </b><input type="text" v-model="editData.name"></span><br>
                        <span><b>sex: </b><input type="text" v-model="editData.sex"></span><br>
                        <span><b>age: </b><input type="text" v-model="editData.age"></span><br>
                        <span><b>position: </b><input type="text" v-model="editData.position"></span><br>
                        <span><b>address: </b><input type="text" v-model="editData.address"></span><br>
                        <div class="submit"><button @click="submitForm">提交</button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import request from "../api/index";

    let {getStudentInfo,deleteStudentInfo,editStudentInfo,insertStudentInfo} = request;

    export default {
        name: "Student",
        data() {
            return {
                // student信息表
                student:[],

                // 控制显示隐藏
                display: false,

                // 存储要修改的数据
                editData:{
                    name:"",
                    sex:"",
                    age:"",
                    position:"",
                    address:""
                },

                // 新增和修改
               addAndEdit: [
                   {name:"修改",id:1},
                   {name:"新增",id:2}
               ],
                confirmAddOrEditName:"",
                confirmAddOrEditId:""
            }
        },
        created() {
            this.getStudentInfo();
        },
        methods: {
            getStudentInfo() {
                getStudentInfo().then(res => {
                    // console.log(res);
                    this.student = res.data.data
                }).catch(err => {
                    console.log("服务器错误");
                })
            },
            Edit(item){
                this.display = true;
                this.confirmAddOrEditName = this.addAndEdit[0].name;
                this.confirmAddOrEditId = this.addAndEdit[0].id;
                // this.editData.id = item._id;
                this.editData.name = item.name;
                this.editData.sex = item.sex;
                this.editData.age = item.age;
                this.editData.position = item.position;
                this.editData.address = item.address;
                this.editData.id = item._id;
            },
            Delete(id){
                deleteStudentInfo(id)
                    .then(res=>{
                        console.log("删除成功")
                        this.getStudentInfo();
                    }).catch(err=>{
                        console.log("删除失败");
                })
            },
            insert(){
                this.confirmAddOrEditName = this.addAndEdit[1].name;
                this.confirmAddOrEditId = this.addAndEdit[1].id;
                this.qc();
                this.display = true;
            },
            submitForm(){
                switch(this.confirmAddOrEditId){
                    case 1:
                        editStudentInfo(this.editData).then(res=>{
                            console.log("修改成功")
                            this.getStudentInfo();
                            this.qc()
                        }).catch(err=>{
                            console.log("修改失败");
                        });
                        break;
                    case 2:
                        insertStudentInfo(this.editData).then(res=>{
                            console.log("添加成功")
                            this.getStudentInfo();
                            this.qc()
                        }).catch(err=>{
                            console.log("添加失败")
                        })
                        break;
                }
            },

            /* 封装 */
            qc(){
                if(this.display){
                    this.display = !this.display;
                    for(let i in this.editData){
                        this.editData[i] = "";
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .student_box{
        width: 100%;
        height: 100%;
        >.studentInfo_data{
            user-select: none;
            margin: 30px;
            >table{
                width: 400px;
                text-align: center;
                float: left;
                tr,td{
                    height: 30px;
                }
                .edit,.delete{
                    color: #26a6ff;
                    cursor: pointer;
                }
                .edit:hover{
                    color: #11bf4c;
                }
                .delete:hover{
                    color: red;
                }
            }
            >.insert{
                width: 100px;
                height: 100px;
                clear: both;
                position: relative;
                button{
                    width: 50px;
                    height: 25px;
                    display: block;
                    position: absolute;
                    left: 50%-25px;
                    top: 50%-12.5px;
                }
            }
            >.editForm{
                width: 300px;
                height: 320px;
                padding: 10px;
                box-sizing: border-box;
                box-shadow: 0 0 5px 1px #CCCCCC;
                float: left;
                margin-left: 30px;
                position: relative;
                >.form{
                    width: 280px;
                    /*height: 330px;*/
                    position: absolute;
                    /*background-color: #d5bcbc;*/
                    .title{
                        width: 280px;
                        height: 30px;
                        text-align: center;
                        font-size: 20px;
                        margin-bottom: 10px;
                        margin-top: 0;
                        color: #515151;
                        font-weight: bold;
                        /*background-color: #c69292;*/
                    }
                    span{
                        display: block;
                        width: 280px;
                        b{
                            width: 75px;
                            height: 25px;
                            line-height: 25px;
                            margin-right: 5px;
                            display: inline-block;
                            text-align: right;
                            /*background-color: #f6baba;*/
                        }
                        input{
                            width: 150px;
                            display: inline-block;
                            /*background-color: rgba(118, 77, 77, 0.97);*/
                        }
                    }
                    .submit{
                        width: 280px;
                        height: 30px;
                        position: relative;
                        button{
                            width: 60px;
                            height: 25px;
                            display: block;
                            position: absolute;
                            left: 50%-10px;
                            top: 50%-40px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>