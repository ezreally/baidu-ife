/**
 * Created by ezreally on 26/09/2016.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
};

/**
 * 获取颜色
 */
function getColor(score) {
    if (score > 0 && score <= 50) {
        return "#00ff00";
    } else if (score > 50 && score <= 100) {
        return "#ffe599";
    } else if (score > 100 && score <= 150) {
        return "#ff9900";
    } else if (score > 150 && score <= 200) {
        return "#ff0000";
    } else if (score > 200 && score <= 300) {
        return "#993333";
    } else {
        return "#990066";
    }
}

function getTitle(type) {
    if (type == "day") {
        return "每日";
    } else if (type == "week") {
        return "每周";
    } else if (type == "month") {
        return "每月";
    }
}
/**
 * 渲染图表
 */
function renderChart() {
    var chartHtml = "";
    var nowGraTime = pageState.nowGraTime;
    var nowSelectCity = pageState.nowSelectCity;
    var selectData = chartData[nowGraTime][nowSelectCity];

    var titleDiv = document.querySelectorAll(".title")[0];
    var chartWrapDiv = document.querySelectorAll(".aqi-chart-wrap")[0];
    var contentDiv = document.querySelectorAll(".content")[0];
    if (!titleDiv) {
        titleDiv = document.createElement("div");
        titleDiv.setAttribute("class", "title");
        titleDiv.innerHTML = nowSelectCity + '市01-03月' + getTitle(nowGraTime) + '空气质量报告';
        chartWrapDiv.insertBefore(titleDiv, contentDiv);
    } else {
        titleDiv.innerHTML = nowSelectCity + '市01-03月' + getTitle(nowGraTime) + '空气质量报告';
    }

    var keys = Object.keys(selectData);
    keys.forEach(function (key, index) {
        chartHtml += '<div class="aqi-bar ' + nowGraTime + '" style="height: ' + selectData[key] + 'px; background-color: ' + getColor(selectData[key]) + '">' +
            '<div class="aqi-hint">' + key + "<br/>[AQI]:" + selectData[key] + '</div>' +
            '</div>';
    });
    contentDiv.innerHTML = chartHtml;

    bindEventListener(contentDiv, "mouseover", function (event) {
        if (event.target.classList.contains("aqi-bar")) {
            dynamicHint.call(null, event.target.lastChild, true);
        }
    });

    bindEventListener(contentDiv, "mouseout", function (event) {
        if (event.target.classList.contains("aqi-bar")) {
            dynamicHint.call(null, event.target.lastChild, false);
        }
    });
}

function dynamicHint(hintDom, isShow) {
    if (isShow) {
        hintDom.setAttribute("style", "display:block");
    } else {
        hintDom.setAttribute("style", "display:none");
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(newValue) {
    // 确定是否选项发生了变化
    if (newValue == pageState.nowGraTime) {
        return;
    }
    // 设置对应数据
    pageState.nowGraTime = newValue;
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(newValue) {
    // 确定是否选项发生了变化
    if (newValue == pageState.nowSelectCity) {
        return;
    }
    // 设置对应数据
    pageState.nowSelectCity = newValue;
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var graTimeSelector = document.querySelector("#form-gra-time");

    bindEventListener(graTimeSelector, "click", function (e) {
        if (e.target.nodeName.toLowerCase() == "input") {
            graTimeChange.call(null, e.target.value);
        }
    })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citys = [];
    for (var item in aqiSourceData) {
        citys.push(item);
    }
    var options = "";
    citys.forEach(function (item, index) {
        options += "<option value='" + item + "'>" + item + "</option>"
    });
    var selector = document.querySelector("#city-select");
    selector.innerHTML = options;
    pageState.nowSelectCity = citys[0];
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    bindEventListener(selector, "change", function (e) {
        citySelectChange.call(null, e.target.value);
    });
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var week = {}, month = {}, singleWeek = {};
    var cnt = 0, mCnt = 0, singleMonth = {};

    for (var city in aqiSourceData) {
        var cityValues = aqiSourceData[city];
        //城市下的属性数组
        var itemArr = Object.getOwnPropertyNames(cityValues);
        //初始化月份
        var tmpMonth = itemArr[0].slice(5, 7);
        //一号开始是星期五,当月的每周有多少天数
        var weekInit = 4, weekCnt = 0;

        for (var i = 0, len = itemArr.length; i < len; i++, weekInit++) {
            cnt += cityValues[itemArr[i]];
            mCnt += cityValues[itemArr[i]];
            weekCnt++;
            //判断是否到了下一个星期,或者是最后一天，或者到了下一个月
            if ((weekInit + 1) % 7 === 0 || i === len - 1 || itemArr[i + 1].slice(5, 7) !== tmpMonth) {
                //定义key
                var tmpKey = itemArr[i].slice(0, 7) + "月第" + Math.floor(weekInit / 7 + 1) + "周";
                singleWeek[tmpKey] = Math.floor(cnt / weekCnt);
                //周统计相关数据清零
                cnt = 0;
                weekCnt = 0;
                //判断是否是最后一天或者到了下一个月,否则每周的第几天要重新计算
                if (i !== len - 1 && itemArr[i + 1].slice(5, 7) !== tmpMonth) {
                    weekInit = weekCnt % 7;
                }

                //判断是最后一天或者是下一个月了
                if (i === len - 1 || itemArr[i + 1].slice(5, 7) !== tmpMonth) {
                    //更新tmpMonth
                    tmpMonth = (i === len - 1) ? itemArr[i].slice(5, 7) : itemArr[i + 1].slice(5, 7);
                    //定义key
                    var tmpMKey = itemArr[i].slice(0, 7);
                    //当月天数就是最后一天的日期值
                    var tmpMDays = itemArr[i].slice(-2);
                    singleMonth[tmpMKey] = Math.floor(mCnt / tmpMDays);
                    //月统计数据清零
                    mCnt = 0;
                }
            }
        }

        week[city] = singleWeek;
        month[city] = singleMonth;
        singleWeek = {};
        singleMonth = {};
    }

    // 处理好的数据存到 chartData 中
    chartData.day = aqiSourceData;
    chartData.week = week;
    chartData.month = month;
}

/**
 * 事件绑定，兼容不同浏览器
 * @param el
 * @param type
 * @param handler
 */
function bindEventListener(el, type, handler) {
    if (el.addEventListener) {
        el.addEventListener(type, handler, false);
    } else if (el.attachEvent) {
        el.attachEvent("on" + type, handler);
    } else {
        el["on" + type] = handler;
    }
}
/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();