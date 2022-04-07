let name = ''
let phoneNumber = 0
let cardId = 0
let roomNumber = 0
var tablehead = ["name", "phoneNumber", "cardId",'roomNumber','comeDate','goDate','date'];
var tbody = document.getElementsByClassName('tbody')[0]
axios({
    method:'GET',
    url:'http://localhost:3005/admin/seePeople'
}).then(value=>{
    console.log(value.data);
    // let {name} = value.data
    let arr = value.data
    for(let i = 0;i<arr.length;i++){
        var tr = document.createElement('tr')
        tbody.appendChild(tr)
        for(let j=0;j<7;j++){
            var td = document.createElement("td");
            td.innerHTML = arr[i][tablehead[j]];
            tr.appendChild(td);
        }
    }
    
}).catch(reason=>{
    console.log(reason)
})