var canvas = document.getElementById('can')
// 获取绘画环境 固定写法
var ctx = canvas.getContext('2d');
setInterval(function () {
    // 清空画布
    // 画布如果width和hight被重新加载 => 清空画布
    canvas.width = canvas.width
    for (var i = 0; i < pArr.length; i++) {
        var p = pArr[i]
        if (p.x >= canvas.width + p.r) {
            p.x = -p.r
        } else {
            p.x += p.speed
        }
        ctx.fillStyle = p.color
        ctx.arc(p.x, 50, p.r, 0, 2 * Math.PI, false)
        ctx.fill()
    }
}, 10);
var point = function () {
    this.r = Math.random() * 20 + 10
    this.color = '#95A5A6'
    this.speed = Math.random() * 5 + 1
    // 获取随机初始点
    this.x = Math.random() * canvas.width + 1
}
var p = new point()
// 绘制p这个对象
var p2 = new point()
var p3 = new point()
var p4 = new point()
var p5 = new point()
// 同一类
var pArr = [p, p2,p3,p4,p5]