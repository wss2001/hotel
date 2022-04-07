var index = 0
var item = $('.item')

var goIndex = function () {
    item.removeClass('active')
    item.eq(index).addClass('active')
    $('.point').removeClass('active')
    $('.point').eq(index).addClass('active')
}

setInterval(()=>{
    if (index < item.length - 1) {
        index++
    } else {
        index = 0
    }
    goIndex()
},3000)
$('#goNext').on('click', function () {
    if (index < item.length - 1) {
        index++
    } else {
        index = 0
    }
    goIndex()
})
$('#goPre').on('click', function () {
    if (index > 0) {
        index--
    } else {
        index = item.length - 1
    }
    goIndex()
})

// 圆点操作
$('.point').on('click', function () {
    // 获取data-index值
    var i = $(this).attr('data-index')
    console.log(i)
    index = i
    goIndex()
})