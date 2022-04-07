// 由于cookie设置的唯一，所以要对cookie进行设置，检查，删除，以防止泄露
// 动态token
class cookieControl {
    constructor() {
        this.tokenArr = []
    }
    getToken() {
        var token = ''
        var str = '1234567890qwertyuiopasdfghjklzxcvbnm'
        for (var i = 0; i < 16; i++) {
            if (i % 5 == 0 && i != 0) {
                token += '-'
            }
            token += str[parseInt(Math.random() * str.length)]
        }
        this.tokenArr.push(token)
        return token
    }
    checkToken(token) {
        for (var i = 0; i < this.tokenArr.length; i++) {
            if (this.tokenArr[i] == token) {
                return true
            }
        }
        return false
    }
    removeToken(token) {
        for (var i = 0; i < this.tokenArr.length; i++) {
            if (this.tokenArr[i] == token) {
                this.tokenArr.slice(i,1)
                return true
            }
        }
        return false
    }
}
module.exports=cookieControl
