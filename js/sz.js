// 获取元素样式
var getCls=function(element){
    return element.getAttribute("class");
}
// 设置元素样式
var setCls=function(element,cls){
    return element.setAttribute("class",cls);
}

//为元素添加样式
var addCls=function(element,cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)==-1){
        setCls(element,baseCls+" "+cls);
    }
}
//为元素删除样式
var delCls=function(element,cls){
    var baseCls=getCls(element);
    if(baseCls.indexOf(cls)!=-1){
        setCls(element,baseCls.split(cls).join(" "));
    }
}



// 第一步，初始化
var animateElements={
    ".screen-1":[
        ".screen-1__heading",
        ".screen-1__subheading",
    ],
    ".screen-2":[
        ".screen-2__heading",
        ".screen-2__subheading",
        ".screen-2__hr",
        ".screen-2__pic2",
        ".screen-2__pic3",
    ],
    ".screen-3":[
        ".screen-3__pic",
        ".screen-3__heading",
        ".screen-3__hr",
        ".screen-3__subheading",
        ".screen-3__icon",
    ],
    ".screen-4":[
        ".screen-4__heading",
        ".screen-4__hr",
        ".screen-4__subheading",
        ".screen-4__icon-item--i-1",
        ".screen-4__icon-item--i-2",
        ".screen-4__icon-item--i-3",
        ".screen-4__icon-item--i-4",
    ],
    ".screen-5":[
        ".screen-5__pic",
        ".screen-5__heading",
        ".screen-5__hr",
        ".screen-5__subheading",
    ],
}

//设置初始化
function setAnimate(Cls){
    var animations=animateElements[Cls];  //取出需要被设置动画的元素，存储在 animations 中
    for(var i=0;i<animations.length;i++){
        var element=document.querySelector(animations[i]);
        var baseCls=element.className;
        element.className=baseCls+" "+animations[i].substr(1)+"--animate-init";
    }
}
// 初始化调用
window.onload=function(){
    for(k in animateElements){
        if(k==".screen-1"){
            continue;
        }
        setAnimate(k);
    }
}


//第二步  配合滑动高度 top 设置屏内播放
//定义播放函数
function playAnimate(Cls){
    var animations=animateElements[Cls];  //取出需要被设置动画的元素，存储在 animations 中
    for(var i=0;i<animations.length;i++){
        var element=document.querySelector(animations[i]);
        var baseCls=element.className;
        element.className=baseCls.replace("--animate-init","--animate-done")
    }
}


//定义导航激活状态函数
var navItems=document.querySelectorAll(".header__nav-item"),  //获取头部导航项
    outlineItems=document.querySelectorAll(".outline__item");  //获取大纲项

function navActive(idx){
    for(var i=0,len=navItems.length-1;i<len;i++){
        delCls(navItems[i],"header__nav-item--status-active");
        navTip.style.left=0+"px";
    }
    addCls(navItems[idx],"header__nav-item--status-active");
    navTip.style.left=(idx*70)+"px";

    for(var i=0,len=outlineItems.length-1;i<len;i++){
        delCls(outlineItems[i],"outline__item--status-active");
    }
    addCls(outlineItems[idx],"outline__item--status-active");

}

//通过 onscroll 事件，逐步调用playAnimate()
    //设置页面加载完成后，自动播放第一屏动画(前面第一屏跳过了初始化，所以直接在 html 中将其初始化)
    setTimeout(function(){
        playAnimate(".screen-1");
    },100)
    //从第二屏起，通过 top值 触发事件，播放动画
    window.onscroll=function(){
        var top=document.body.scrollTop||document.documentElement.scrollTop;
        if(top>0){
            navActive(0);
        }
        if(top>640*1-80){
            this.playAnimate(".screen-2");
            navActive(1);
        }
        if(top>640*2-80){
            this.playAnimate(".screen-3");
            navActive(2);
        }
        if(top>640*3-80){
            this.playAnimate(".screen-4");
            navActive(3);
        }
        if(top>640*4-80){
            this.playAnimate(".screen-5");
            navActive(4);
        }

        // 导航切换
        if(top>80){
            this.addCls(document.querySelector(".header"),"header--status-change");
        }else{
            this.delCls(document.querySelector(".header"),"header--status-change");
        }
        //大纲切换
        if(top>80){
            this.addCls(document.querySelector(".outline"),"outline--status-in");
        }
    }


// 第三步 导航、大纲 双向定位
//定义跳转函数
function jump(lib,i){
    var item=lib[i];
    item.onclick=function(){
        document.documentElement.scrollTop=i*640+1;
    }
}
// 遍历调用
for(var i=0,len=navItems.length;i<len;i++){
    jump(navItems,i);
}
for(var i=0,len=outlineItems.length;i<len;i++){
    jump(outlineItems,i);
}

//第四步 滑动门
var navTip=document.querySelector(".header__nav-tip");

function setTip(lib,i){
    lib[i].onmouseover=function(){
        console.log(this,i);
        navTip.style.left=(i*70)+"px";
    }

    var now=0;
    lib[i].onmouseout=function(){
        console.log(this,now);
        for(var n=0;n<lib.length;n++){
            if(getCls(lib[n]).indexOf("header__nav-item--status-active")>-1){
                now=n;
                break;
            }
        }
        navTip.style.left=(now*70)+"px";

    }
}

for(var i=0,len=navItems.length-1;i<len;i++){
    setTip(navItems,i);
}



