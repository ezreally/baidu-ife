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

    //排序算法
    var sort = {
        //冒泡排序
        bubbleSort: function (arr) {
            // for (var i = 0; i < arr.length; i++) {
            //     for (var j = 0; j < arr.length - i; j++) {
            //         if (arr[j] > arr[j + 1]) {
            //             var tmp = arr[j];
            //             arr[j] = arr[j + 1];
            //             arr[j + 1] = tmp;
            //         }
            //     }
            // }
            var i = 0, j = 1, tmp = 0;
            var len = arr.length;
            var timer = null;

            timer = setInterval(run, 2);

            function run() {
                if (i < len) {
                    if (j < len) {
                        if (arr[i] > arr[j]) {
                            tmp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = tmp;
                        }
                        queue.paint();
                        j++;
                    } else {
                        i++;
                        j = i + 1;
                    }
                } else {
                    clearInterval(timer);
                    return;
                }
            }
        }
    };

    var queue = {
        elements: [],
        leftPush: function (num) {
            if (!this.check(num)) {
                return;
            }
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
            if (!this.check(num)) {
                return;
            }
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
            return this.size() == 0;
        },
        size: function () {
            return this.elements.length;
        }
        ,
        delete: function (index) {
            this.elements.splice(index, 1);
            this.paint();
        },
        check: function (num) {
            var flag = true;
            if (this.size() > 60) {
                flag = false;
                alert("元素不能超过60个!");
            }
            if (num < 10 || num > 100) {
                flag = false;
                alert("只能输入10--100的数字!");
            }
            return flag;
        },
        paint: function () {
            var queue_html = "";

            forEach(this.elements, function (item) {
                queue_html += '<div class="queue-element" style="height: ' + item * 2 + 'px"></div>';
            });

            queueDiv.innerHTML = queue_html;
            bindDelEvent();
        },
        sort: {
            bubbleSort: function () {
                sort.bubbleSort(queue.elements);
                queue.paint();
            }
        },
        upset: function () {
            var len = this.elements.length;
            var tmp = 0;
            var self = this;
            this.elements.forEach(function (item, index, arr) {
                if (index != len - 1) {
                    var randomIndex = Math.ceil(Math.random() * (len - index - 1)) + (index);
                    console.log("index:" + index + "randomIndex:" + randomIndex);
                    tmp = self.elements[index];
                    self.elements[index] = self.elements[randomIndex];
                    self.elements[randomIndex] = tmp;
                }
            });
            this.paint();
        },
        randomBuild: function () {
            this.elements = [];
            for (var i = 0; i < 50; i++) {
                this.elements.push(Math.floor(Math.random() * 91) + 10);
            }
            this.paint();
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

    bindEventListener(buttons[4], "click", function () {
        queue.randomBuild();
    });

    bindEventListener(buttons[5], "click", function () {
        queue.upset();
    });

    bindEventListener(buttons[6], "click", function () {
        queue.sort.bubbleSort();
    })
};

