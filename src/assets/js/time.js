/*
 * @Description: 公有 js 函数库
 * @Author: CY小尘s
 * @Date: 2021-05-30 23:53:11
 * @LastEditTime: 2021-06-29 17:07:26
 * @LastEditors: 学习
 */
export default{
    newDate(isNew){
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        // 判断是否需要获取当前时、分、秒
        if(isNew){
            var hours = date.getHours()
            var minutes = date.getMinutes()
            var seconds = date.getSeconds()
            var nowDate = year + '-' + month + '-' + day + ' ' + hours + ":" + minutes + ':' + seconds
            return nowDate
        }
        var nowDate = year + '-' + month + '-' + day
        return nowDate
    }
}