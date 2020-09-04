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

function setAnimate(Cls){
    var currentScreen=document.querySelector(Cls);  //获取当前屏的元素  用 DOM0 级设置点击事件
    var animations=animateElements[Cls];  //取出需要被设置动画的元素，存储在 animations 中
    var isInit=false;  //样式初始化控制  false处于没有初始化状态
    var isDone=false;  //定义完成状态  false代表是 init

    currentScreen.onclick=function(){
        //初始化样式，增加init
        if(isInit===false){
            for(var i=0;i<animations.length;i++){
                var element=document.querySelector(animations[i]);
                var baseCls=element.className;
                element.className=baseCls+" "+animations[i].substr(1)+"--animate-init";
            }
            isInit=true;
            return;
        }
        //切换所有的 animateElements 的 init >> done
        if(isDone===false){
            for(var i=0;i<animations.length;i++){
                var element=document.querySelector(animations[i]);
                var baseCls=element.className;
                element.className=baseCls.replace("--animate-init","--animate-done");
            }
            isDone=true;
            return;
        }
        //切换所有的 animateElements 的 done >> init
        if(isDone===true){
            for(var i=0;i<animations.length;i++){
                var element=document.querySelector(animations[i]);
                var baseCls=element.className;
                element.className=baseCls.replace("--animate-done","--animate-init");
            }
            isDone=false;
            return;
        }
    }
}

// 初始化调用
for(k in animateElements){
    setAnimate(k);
}