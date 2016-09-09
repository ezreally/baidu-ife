#百度前端学院的练习

---

### 1. task 01
>*   主要用到了常用的`html`标签,以及对布局的初步运用

[预览地址](http://121.199.32.140/frontend-in-action/task 01/task_1_1_1.html)
### 2. task 02 
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

[预览地址](http://121.199.32.140/frontend-in-action/task 02/task_1_2_1.html)