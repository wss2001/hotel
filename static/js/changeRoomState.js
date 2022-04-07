

axios({
    method:'GET',
    url:'http://localhost:3005/admin/roomxl'
}).then(value=>{
    // console.log(value.data);
    let arr = value.data
    var changeRoom = document.getElementsByClassName('changeRoom')[0]
    let html = ''
    for(let i=0;i<arr.length;i++){
        html+=`
        <div class="panel panel-default">
            <div class="panel-body">
            ${arr[i].roomNumber}
            </div>
            <div class="panel-footer">入住情况:${arr[i].state===1?'已入住':'未入住'}</div>
            <a href="/admin/change?_id=${arr[i]._id}"><button type="button" class="btn ${arr[i].state===1?'btn-success':'btn-warning'}">修改房间状态为:${arr[i].state===1?'未入住':'已入住'}</button></a>
        </div>
        `
    }
    changeRoom.innerHTML = html
}).catch(reason=>{
    console.log(reason)
})