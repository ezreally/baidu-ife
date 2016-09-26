/**
 * Created by ezreally on 26/09/2016.
 */
window.onload = function () {
    // 第一版代码
    // //绑定点击事件
    // document.querySelector("#button").addEventListener("click", showMsg);
    //
    // function showMsg() {
    //     var inputMsg = document.querySelector("#aqi-input").value;
    //     document.querySelector("#aqi-display").textContent = inputMsg;
    // }

    // 第二版代码
    // 重复代码封装成函数
    var $ = function (id) {
        return document.querySelector("#" + id);
    }

    //业务逻辑
    function handler() {
        var num = parseInt($("aqi-input").value);
        if (isNaN(num) || num < 0 || num > 1000) {
            alert(num + "不是有效的AQI数值，请输入1-1000的有效数值");
        } else {
            $("aqi-display").innerText = num;
        }
    }

    //绑定点击事件
    $("button").addEventListener("click", handler);

    $("aqi-input").onkeyup = function (event) {

        event = event || window.event;

        if (event.keyCode === 13) {
            handler();
        }
    }

};

