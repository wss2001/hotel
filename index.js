// 引入express模块
const express = require('express')
const path = require('path')

// 初始化express模块的app
const app = express()

// 引入body-parser模块
const bodyParser = require('body-parser')
// 初始化urlencoded解析器
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})

// 引入cookie-parser模块
const cookieParser = require('cookie-parser')

// 引入cookie管理模块
const cookieControl = require('./cookie')
const admin = new cookieControl()
const memberToken = new cookieControl()
//引入自己写的mongoControl方法
const mongoControl = require('./dbc').mongoControl

// 引入ejs模块处理后端渲染
const ejs = require('ejs')
// 处理静态文件请求 同样可以影响ejs的渲染模板的读取外部js css文件
app.use(express.static('./static', {
    index: false
}))

// 引入moment模块处理时间格式
const moment = require('moment')
const { url } = require('inspector')
// 初始化数据库中的集合
var room = new mongoControl('hotel', 'room')
var comment = new mongoControl('hotel', 'comment')
var people = new mongoControl('hotel','people')
var member =new mongoControl('hotel','member')
// 为请求添加中间件：解析cookie
app.use(cookieParser())
// 首页
app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./static/index.html'))
})
// 会员登录
app.get('/member/login',(req,res)=>{
    res.sendFile(path.resolve('./static/huiyuanlogin.html'))
})
// 会员登录post
app.post('/member/login',urlencodedParser,(req,res)=>{
    let {username,password} =req.body
    console.log(username,password);
    member.find({
        mUsername:username,
        mPassword:password
    },(error,result)=>{
        if(error) {
            res.status(403).send('服务器给我干崩了')
            return
        }
        if(result.length==0){
            res.send(`账号密码错误,请重新输入`)
        }
        else{
            res.cookie('mToken',memberToken.getToken())
            res.send('会员登陆成功')
        }
    })
})

// 会员注册
app.get('/member/register',(req,res)=>{
    res.sendFile(path.resolve('./static/huiyuanregister.html'))
})
// 会员注册post
app.post('/member/register',urlencodedParser,(req,res)=>{
    let {username,password,surePassword,phoneNumber,cardId,name} =req.body
    console.log(username,password,phoneNumber,cardId,name);
    member.find({mUsername:username},(error,result)=>{
    if(error) {
        res.status(403).send('服务器给我干崩了')
        return
    }    
    if(result.length!==0){
            res.send('账号已存在,请重新输入账号')
        }
    })

    if(password!==surePassword){
        res.send('密码与确认密码不符,请重新输入')
    }
    member.insert([{
        mUsername:username,
        mPassword:password,
        surePassword:surePassword,
        name:name,
        phoneNumber:phoneNumber,
        cardId:cardId 
    }],(error,result)=>{
        if(error){
            res.status(500).send('什么账号把我的服务器弄崩了')
            return
        }
    })
    res.send('注册成功,你已经成为尊贵的会员了')
})


// 会员入住
app.post('/mruzhu',urlencodedParser,(req,res)=>{
    var _id=req.query._id
    // console.log(_id);
    let {username,comeDate,goDate} =req.body
    // console.log(username,comeDate,goDate);
    let cArr = comeDate.split('-')
    let gArr = goDate.split('-')
    let occupancy = gArr[2]-cArr[2]
    if(memberToken.checkToken(req.cookies.mToken)){
        
    }else{
        res.send('你还没有登录黑珍珠会员,请先登录')
        // res.redirect('/member/login')
    }
    // res.setHeader('Access-Control-Allow-Origin','*')
    member.find({mUsername:username},(error,result)=>{
        // console.log(result);  得加[0]log下就看出来是数组了
        let {name,cardId,phoneNumber,mPrice}=result[0]
        // console.log(name,cardId,phoneNumber);
        room.findById(_id,(rfError,rfResult)=>{
            // console.log(rfResult);
            let oldOccupancy =rfResult[0].occupancy
            let {roomNumber,type,mPrice} = rfResult[0]
            room.updateById(_id,{
                name:name,
                cardId:cardId,
                phoneNumber:phoneNumber,
                comeDate:comeDate,
                goDate:goDate,
                occupancy:occupancy+oldOccupancy,
                state:1
            },(rError,rResult)=>{
                // 这里获取不到它的值
                // console.log(rResult);
                // let {roomNumber,type} =rResult
            })
            people.insert([{
                name:name,
                phoneNumber:phoneNumber,
                cardId:cardId,
                roomNumber:roomNumber,
                type:type,
                comeDate:comeDate,
                goDate:goDate,
                date:moment().format('YYYY-MM-DD  HH:mm')
            }],(pError,pResult)=>{
                res.send(`尊贵的会员你已经订房成功,你需支付${mPrice*occupancy}元请向账号36900000打钱`)
            })
        })
    })
})
// 普通入住post
app.post('/pruzhu',urlencodedParser,(req,res)=>{
    let _id = req.query._id
    let {cardId,phoneNumber,name,comeDate,goDate} = req.body
    let cArr = comeDate.split('-')
    let gArr = goDate.split('-')
    let occupancy = gArr[2]-cArr[2]
    // console.log(name,phoneNumber,cardId,comeDate,goDate);
    room.findById(_id,(rfError,rfResult)=>{
        // console.log(rfResult);
        let oldOccupancy =rfResult[0].occupancy
        let {roomNumber,type,price} = rfResult[0]
        room.updateById(_id,{
            name:name,
            cardId:cardId,
            phoneNumber:phoneNumber,
            comeDate:comeDate,
            goDate:goDate,
            occupancy:occupancy+oldOccupancy,
            state:1
        },(rError,rResult)=>{
        })
        people.insert([{
            name:name,
            phoneNumber:phoneNumber,
            cardId:cardId,
            roomNumber:roomNumber,
            type:type,
            comeDate:comeDate,
            goDate:goDate,
            date:moment().format('YYYY-MM-DD  HH:mm')
        }],(pError,pResult)=>{
            res.send(`尊贵的顾客,您已经订房成功,你需支付${price*occupancy}元请向账号36900000打钱`)
        })
    })
    // res.send('ok')
})
// 评论发布 前台用户提交评论接口
app.post('/submitComment',urlencodedParser,(req,res)=>{
    // 获取携带在url中的房间_id
    let _id=req.query._id
    // 获取评论内容 name,content
    let {name,content} = req.body
    // 简单的表单验证：不允许为空
    if(!_id){
        res.status(500).send('不允许评论')
        return
    }
    if(!name ||!content){
        res.status(500).send('不允许发表空评论或不使用真实姓名')
        return
    }
    people.find({name:name},(error,result)=>{
        if(error) {
            res.status(403).send()
        }
        if(result.length===0){
            res.send('抱歉非入住人员不能参加评论')
        }
        else{
        // 操作评论数据库
        comment.insert([{
            fid:_id,
            content:content,
            name:name,
            date:moment().format('YYYY-MM-DD  HH:mm'),
            state:0
        }],(error,result)=>{
            // 如果数据库操作失败则传500
            if(error){
                res.status(500).send('什么评论把我的服务器弄崩了')
                return
            }
            // 重定向回这个文章界面，并且刷新评论
            res.redirect('/p?_id='+_id)
        })
    }
    })
})
// 查询所有房间
app.get('/room',(req,res)=>{
    room.find({state:0},(error,result)=>{
        ejs.renderFile('./ejs/pagetal.ejs',{
            result:result
        },(err,str)=>{
            res.send(str)
        })
    })
})
// 查询详细房间详情
app.get('/p',(req,res)=>{
    let _id = req.query._id
    room.findById(_id,(error,result)=>{
        let data = result[0]
        comment.find({
            fid:_id,
            state:1
        },(err,result)=>{
            ejs.renderFile('./ejs/page.ejs',{
                data:data,result:result
            },(err,str)=>{
                res.send(str)
            })
        })
    })
})
// 查询指定类型房间
app.get('/typeroom',(req,res)=>{
    let type = req.query.type 
    room.find({type:type,state:0},(error,result)=>{
        ejs.renderFile('./ejs/pagetal.ejs',{
            result:result
        },(err,str)=>{
            res.send(str)
        })
    })
})
// 客户查看已定房间
app.get('/lookRoom',(req,res)=>{
    res.sendFile(path.resolve('./static/lookRoom.html'))
})
// 客户查看已定房间post
app.post('/lookRoompost',urlencodedParser,(req,res)=>{
    let {name,cardId} = req.body
    console.log(name,cardId);
    if(!name||!cardId){
        res.status(500).send('不允许输入空名字或者空身份证号')
        return 
    }
    room.find({
        name:name,
        cardId:cardId
    },(error,result)=>{
        if(error){
            console.log('err');
        }
        if (result.length == 0) {
            res.send([])
            return
        }
        else{
            res.send(`房间号：${result[0].roomNumber}`)
        }
    })
})
// admin后台模块
// 向后台返回房间销量数据
app.get('/admin/roomxl',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    room.find({},(error,result)=>{
        res.send(result)
    })
})
app.get('/admin/login',(req,res)=>{
    res.sendFile(path.resolve('./static/login.html'))
})
// 判断登录数据
app.post('/admin/login', urlencodedParser, (req, res) => {
    if (req.body.username == 'admin' && req.body.password == 'admin') {
        // 登陆成功给权限
        res.cookie('token', admin.getToken())
        // 重定向
        res.redirect('/admin')
    } else {
        res.status(403).send('账号密码错误登录失败')
        return
    }
})
app.get('/admin', (req, res) => {
    // 判断cookie来决定让你是否进去管理者页面
    // checkToken()方法返回的是true或者false
    if (admin.checkToken(req.cookies.token)) {
        res.sendFile(path.resolve('./static/admin.html'))
    } else {
        res.redirect('/admin/login')
    }
})
// 评论相关接口
app.get('/admin/getComment', (req, res) => {
    // 检查cookie权限
    if (admin.checkToken(req.cookies.token)) {

    } else {
        res.status(404).send('你没有权限')
        return
    }
    // 静态调试设置headers
    // res.setHeader('Access-Control-Allow-Origin','*')
    comment.find({
        state: 0
    }, (error, data) => {
        // 如果没有对0判断的话，会没法进入for循环没有res.send值
        if (data.length == 0) {
            res.send([])
            return
        }
        // 哨兵变量 查看异步回调是否结束
        var count = 0
        for (var i = 0; i < data.length; i++) {
            var nowData = data[i]
            var nowDataFid = nowData.fid
            room.findById(nowDataFid, (error, result) => {
                // 将文章的标题和简介加入到 comment数据中
                nowData.f_roomNumber = result[0].roomNumber
                nowData.f_type = result[0].type
                // 哨兵变量 当count值等于data.length时，意味者完成所有查询data
                count++
                if (count == data.length) {
                    res.send(data)
                }
            })
        }
    })
})

app.get('/admin/passComment', (req, res) => {
    // 检查cookie权限
    if (admin.checkToken(req.cookies.token)) {

    } else {
        res.status(404).send('你没有权限')
        return
    }
    // res.setHeader('Access-Control-Allow-Origin','*')
    var _id = req.query._id
    comment.updateById(_id, {
        state: 1
    }, (error, result) => {
        res.send('result:ok')
    })
})
app.get('/admin/noPassComment', (req, res) => {
    // 检查cookie权限
    if (admin.checkToken(req.cookies.token)) {

    } else {
        res.status(404).send('你没有权限')
        return
    }
    // res.setHeader('Access-Control-Allow-Origin','*')
    var _id = req.query._id
    comment.updateById(_id, {
        // 这里设为2是为了重新渲染页面时,不会继续保留,因为返回评论的接口返回的是state为0的评论
        state: 2
    }, (error, result) => {
        res.send('result:ok')
    })
})
// 新增房间
app.post('/admin/addRoom',urlencodedParser,(req,res)=>{
    let {roomNumber,type,price,mPrice,intro} = req.body
    room.insert([{
        roomNumber:roomNumber,
        price:price,
        mPrice:mPrice,
        type:type,
        intro:intro,
        name:'',
        phoneNumber:0,
        cardId:0,
        state:0,
        comeDate:'',
        goDate:'',
        occupancy:0
    }],(error, result) => {
        res.send('房间新增成功')
    })
})
// 查看入住人信息部分
app.get('/admin/seePeople',(req,res)=>{
    people.find({},(error,result)=>{
        // console.log(result.data);
        res.send(result)
    })
})
// 更改房间state :注:这里需要用get请求,我猜测是由于a标签的影响,只能get请求
app.get('/admin/change',(req,res)=>{
    let _id = req.query._id
    // console.log(_id);
    room.findById(_id,(error,result)=>{
        var {state} = result[0]
        if(state===0){
            state =1
        }else{
            state=0
        }
        room.updateById(_id,{state:state},(uError,uResult)=>{
            if(uError) throw uError
            res.send('修改完成')
        })
    })
})
app.listen(3005)