const mongoControl=require('./dbc').mongoControl
var room=new mongoControl('hotel','room')
var comment=new mongoControl('hotel','comment')
var member =new mongoControl('hotel','member')
var people = new mongoControl('hotel','people')
const moment=require('moment')
// page.insert([{
//     sort:'js',
//     title:'东百十年往事',
//     intro:'话说当年一篇混战，胡歌杀马特团长',
//     date:moment().format('YYYY-MM-DD  HH:mm'),
//     author:'王守帅',
//     content:'呃让龙湖豪杰天下熙熙攘攘。胡歌叱诧风云，谍战生死交投让人久久不能忘怀。'
// }],()=>{})

room.insert([{
    roomNumber:101,
    price:200,
    mPrice:150,
    type:'普通',
    intro:'普通套房在黑珍珠酒店依然有很高的逼格,可以聚众打麻将',
    name:'',
    phoneNumber:000,
    cardId:0,
    state:0,
    comeDate:'',
    goDate:'',
    occupancy:0
}],()=>{})
room.insert([{
    roomNumber:201,
    price:500,
    mPrice:450,
    type:'豪华',
    intro:'豪华套房在黑珍珠酒店几乎是王者的存在了已经,仅次于顶级总统套房,可以聚众游泳',
    name:'',
    phoneNumber:000,
    cardId:0,
    state:0,
    comeDate:'',
    goDate:'',
    occupancy:0
}],()=>{})

// room.insert([{
//     roomNumber:301,
//     price:1000,
//     mPrice:950,
//     type:'总统',
//     intro:'总统套房是高星级酒店用来接待外国元首或者高级商务代表等重要贵宾的豪华客房，其气派之大、档次之高、房价之昂贵，也就不言而喻。正是因为其高不可攀的定位，才被人称之为总统级的套房',
//     name:'',
//     phoneNumber:000,
//     cardId:0,
//     state:0,
//     comeDate:'',
//     goDate:'',
//     occupancy:0
// }],()=>{})


// comment.insert([{
//     fid:'6243fb261b04fec1b574f0ca',
//     content:'房子很好,小姐也很会玩',
//     date:moment().format('YYYY-MM-DD  HH:mm'),
//     name:'王好人',
//     state:1
// }],()=>{})
// comment.insert([{
//     fid:'6243fa511d65a0f5272283fc',
//     content:'房子很好,可以聚众打麻将',
//     date:moment().format('YYYY-MM-DD  HH:mm'),
//     name:'王好人',
//     state:1
// }],()=>{})
// comment.insert([{
//     fid:'6243fb261b04fec1b574f0c9',
//     content:'房子很好,可以和美女一起游泳',
//     date:moment().format('YYYY-MM-DD  HH:mm'),
//     name:'王好人',
//     state:1
// }],()=>{})
// member.insert([{
//     mUsername:'wss',
//     mPassword:'admin',
//     surePassword:'admin',
//     name:'王好人',
//     phoneNumber:13366668888,
//     cardId:232323  
// }],()=>{})
