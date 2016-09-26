/**
 * Created by ezreally on 26/09/2016.
 */
window.onload = function () {
    var apiData = [
        ["北京", 90],
        ["上海", 50],
        ["福州", 10],
        ["广州", 50],
        ["成都", 90],
        ["西安", 100]
    ];

    /*
     在注释下方编写代码
     遍历读取aqiData中各个城市的数据
     将空气质量指数大于60的城市显示到aqi-list的列表中
     */

    //按分数升序排序
    apiData.sort(function (a, b) {
        return b[1] - a[1];
    })

    var li_list = "";

    apiData.forEach(function (data, index) {
        if (data[1] > 60) {
            li_list += '<li>第' + (index + 1) + '名：' + data[0] + '，' + data[1] + '</li>';
        }
    });

    document.querySelector("#aqi-list").innerHTML = li_list;
};