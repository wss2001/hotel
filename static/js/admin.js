// 轮播图，通过改变类名来进行展示
var rightWarps = $('.right-warp')
var listItems = $('.list-item')
$('#home').addClass('active')
listItems.on('click', function () {
    listItems.removeClass('active')
    $(this).addClass('active')
    rightWarps.removeClass('active')
    var tag = $(this).attr('data-warp')
    $('#' + tag).addClass('active')
})