#百度前端学院的练习

---

### 1. task 01 HTML
>*   主要用到了常用的`html`标签,以及对布局的初步运用

[预览地址](http://121.199.32.140/baidu-ife/task 01/task_1_1_1.html)
### 2. task 02 HTML+CSS 
>* 在task 01的基础上,加入了`css`的练习,加深了我对`css`的理解
>* 浮动定位(`float:left|right|inherit`),和绝对定位(`postion:absolute`)会使元素脱离文档流
>* 脱离文档流的元素通过z-index可以设置层叠顺序,数字小的被覆盖
>* 去掉无需列表黑点的方式
```
    ul:{
        list-style:none
    }
    或者
    ul li:{
        display:block
    }
```
>* margin重叠的几种情况
```
1.  相邻兄弟元素之间
2.  父元素和第一个或最后一个子元素之间
```

[预览地址](http://121.199.32.140/baidu-ife/task 02/task_1_2_1.html)

### 3. task 03 三栏式布局

>* 左右分别设置为浮动定位(`float:left & float:right`),中间通过`margin-left`和`margin-right`保持在中间
>* 解决浮动元素溢出的方式:`overflow:auto`

[预览地址](http://121.199.32.140/baidu-ife/task 03/task_1_3_1.html)

### 4. task 04 定位和居中问题

>* 深入理解position的三种定位方式

[预览地址](http://121.199.32.140/baidu-ife/task 04/task_1_4_1.html)

### 5. task 05

>* 前面的综合应用

[预览地址](http://121.199.32.140/baidu-ife/task 05/task_1_5_1.html)

### 6. task 06

>* 前面的综合应用

[预览地址](http://121.199.32.140/baidu-ife/task 06/task_1_6_1.html)

### 8. task 08

>* 仿bootstrap响应式栅格布局
>* .container控制整个布局容器,设置padding值使其内部的元素不至于紧贴着浏览器
>* .row包裹着.col,为了清除浮动,设置.row的两个伪类选择器(before,after)
>* .col的宽度根据浏览器的宽度变化动态计算,使用了calc()这个语法

[预览地址](http://121.199.32.140/baidu-ife/task 08/index.html)

### 9. task 09

>* display:flex的应用
>* [参考资料](https://segmentfault.com/a/1190000002910324)

[预览地址](http://121.199.32.140/baidu-ife/task 09/index.html)

### 13. task 13

[预览地址](http://121.199.32.140/baidu-ife/task 13/index.html)

### 14. task 14

[预览地址](http://121.199.32.140/baidu-ife/task 14/index.html)

### 15. task 15

[预览地址](http://121.199.32.140/baidu-ife/task 15/index.html)

### 16. task 16

>* 遍历属性(`for(var prop in obj)`)
>* 事件委派
>* call,apply的区别?apply传参必须是数组
>* dataset的运用

[预览地址](http://121.199.32.140/baidu-ife/task 16/index.html)

### 17. task 17
>* 这个有点难度

[预览地址](http://121.199.32.140/baidu-ife/task 17/index.html)

### 18. task 18

>* 闭包的运用
>* 函数作为参数传递的运用

[预览地址](http://121.199.32.140/baidu-ife/task 18/index.html)

### 19. task 19

>* 数组克隆:`array.concat()||array.slice(0)`
>* 定时器实现简单的动画效果

[预览地址](http://121.199.32.140/baidu-ife/task 19/index.html)