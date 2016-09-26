/**
 * Created by ezreally on 26/09/2016.
 */
window.onload = function () {


    /**
     * 封装id获取dom节点操作
     * @param id
     * @returns {Element}
     */
    var $ = function (id) {
        return document.querySelector("#" + id);
    };

    /**
     * aqiData，存储用户输入的空气指数数据
     * 示例格式：
     * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
     */
    var aqiData = {};

    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */
    function addAqiData() {
        var city = $("aqi-city-input").value.trim();
        var score = $("aqi-value-input").value.trim();
        //校验参数
        if (validateParam(city, score)) {
            aqiData[city] = score;
        }
    }

    function validateParam(city, score) {
        var flag = true;
        var cityRegex = new RegExp("^[a-zA-Z\u4e00-\u9fa5]+$");
        var scoreRegex = new RegExp("[1-9]+");
        if (!cityRegex.test(city)) {
            flag = false;
            alert("城市号输入非法,只能是英文或中文字符且不能有空格!");
            return flag;
        }

        if (!scoreRegex.test(score)) {
            flag = false;
            alert("空气质量必须为整数!")
            return flag;
        }
        return flag;
    }

    /**
     * 渲染aqi-table表格
     */
    function renderAqiList() {
        var table = $("aqi-table");
        var table_content = "";
        var table_th = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        var table_tr = "";

        for (props in aqiData) {
            table_tr += "<tr><td>" + props + "</td><td>" + aqiData[props] + "</td><td><button data-city='" + props + "'>删除</button></td></tr>";
        }

        table_content = table_th + table_tr;

        table.innerHTML = table_content;
    }

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    function addBtnHandle() {
        addAqiData();
        renderAqiList();
    }

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle(city) {
        // do sth.
        delete aqiData[city];
        renderAqiList();
    }

    function init() {

        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        $("add-btn").addEventListener("click", addBtnHandle);

        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        var table = $("aqi-table");
        table.addEventListener("click", function (event) {
            if (event.target && event.target.nodeName.toLowerCase() == "button") {
                delBtnHandle.call(null, event.target.dataset.city);
            }
        })
    }

    init();

};