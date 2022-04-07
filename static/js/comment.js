var passComment = function (_id) {
    $.ajax({
        type: 'get',
        url: '/admin/passComment',
        data: {
            _id: _id
        },
        success: function (e) {
            console.log(e)
            getComment()
        }
    })
}
var noPassComment = function (_id) {
    $.ajax({
        type: 'get',
        // url: 'http://localhost:3000/admin/noPassComment',
        url: '/admin/noPassComment',
        data: {
            _id: _id
        },
        success: function (e) {
            console.log(e)
            getComment()
        }
    })
}
var addEventListener = function () {
    $('.btn-pass').on('click', function () {
        passComment(
            $(this).attr('data-_id')
        )
    })
    $('.btn-nopass').on('click', function () {
        noPassComment(
            $(this).attr('data-_id')
        )
    })
}
$('#shenhe-btn').on('click', function () {
    getComment()
})
var fileComment = function (arr) {
    var html = ''
    if (arr.length == 0) {
        $('#shenhe').html('<div class="well">没有人评论</div>')
        return
    }
    arr.forEach(e => {
        html += ` <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">姓名：${e.name} 日期：${e.date}</h3>
                </div>
                <div class="panel-body">
                    内容：${e.content}
                </div>
                <div class="well">
                    评论的房间号：${e.f_roomNumber}
                    <br>
                    评论的房间类型：${e.f_type}
                </div>
                <div class="panel-footer">
                    <div class="btn-group" role="group" aria-label="...">
                        <button type="button" class="btn btn-default btn-success btn-pass" data-_id="${e._id}">通过</button>
                        <button type="button" class="btn btn-default btn-danger btn-nopass" data-_id="${e._id}">不通过</button>
                    </div>
                </div>
            </div>`
    });
    $('#shenhe').html(html)
    // 得有这个，不然点击通过不通过不好使
    addEventListener()
}
var getComment = function () {
    $.ajax({
        type: 'get',
        // url: 'http://localhost:3000/admin/getComment',
        url: '/admin/getComment',
        data: {},
        success: function (e) {
            console.log(e)
            fileComment(e)
        }
    })
}