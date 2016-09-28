/**
 * Created by ezreally on 27/09/2016.
 */
function bindEventListener(el, type, fn) {
    if (el.addEventListener) {
        el.addEventListener(type, fn);
    } else if (el.attachEvent()) {
        el.attachEvent("on" + type, fn)
    } else {
        el["on" + type] = fn;
    }
}

window.onload = function () {
    var queueDiv = document.querySelector(".queue-show");
    var buttons = document.querySelectorAll("button");

    function forEach(arr, fn) {
        for (var i = 0, len = arr.length; i < len; i++) {
            fn(arr[i], i);
        }
    }

    var queue = {
        elements: [],
        leftPush: function (num) {
            this.elements.unshift(num);
            this.paint();
        },
        leftPop: function () {
            if (this.isEmpty()) {
                alert("队列中元素为空!");
                return;
            }
            this.elements.shift();
            this.paint();
        },
        rightPush: function (num) {
            this.elements.push(num);
            this.paint();
        },
        rightPop: function () {
            if (this.isEmpty()) {
                alert("队列中元素为空!");
                return;
            }
            this.elements.pop();
            this.paint();
        },
        isEmpty: function () {
            return this.elements.length === 0;
        },
        delete: function (index) {
            this.elements.splice(index, 1);
            this.paint();
        },
        paint: function () {
            var queue_html = "";

            forEach(this.elements, function (item) {
                console.log(arguments);
                queue_html += '<div class="queue-element">' + parseInt(item) + '</div>';
            });

            queueDiv.innerHTML = queue_html;
            bindDelEvent();
        }
    };

    function bindDelEvent() {
        var nodes = queueDiv.childNodes;
        for (var cur = 0, len = nodes.length; cur < len; cur++) {

            bindEventListener(nodes[cur], "click", (function (cur) {
                return function () {
                    queue.delete(cur);
                };
            })(cur))
        }
    }

    function getInputValue() {
        var ele = document.querySelector("#queue-input");
        var val = ele.value;
        ele.value = "";
        ele.focus();
        return val
    }

    bindEventListener(buttons[0], "click", function () {
        var val = getInputValue();
        if (/^[0-9]+$/.test(val)) {
            queue.leftPush(val);
        } else {
            alert("请输入数字!");
        }
    });

    bindEventListener(buttons[1], "click", function () {
        var val = getInputValue();
        if (/^[0-9]+$/.test(val)) {
            queue.rightPush(val);
        } else {
            alert("请输入数字!");
        }
    });

    bindEventListener(buttons[2], "click", function () {
        queue.leftPop();
    });

    bindEventListener(buttons[3], "click", function () {
        queue.rightPop();
    });
};

