//音乐自动播放
~function () {
    var music = document.getElementById("music");
    var audioFir = document.getElementById("audioFir");
    //->给页面的加载缓冲500MS时间
    window.setTimeout(function () {
        audioFir.play();

        //->当音频文件可以播放(出声了)的时候:canplay/canplaythrough
        audioFir.addEventListener("canplay", function () {
            music.style.display = "block";
            music.className = "music musicMove";
        })
    }, 500);

    //->移动端使用CLICK存在300MS的延迟
    music.addEventListener("click", function () {
        //->当前是暂停的
        if (audioFir.paused) {
            audioFir.play();
            music.className = "music musicMove";
            return;
        }
        //->当前是播放的
        audioFir.pause();
        music.className = "music";
    }, false);
}();

//滑动切换
var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#main>ul>li");
var winW = document.documentElement.clientWidth;

var winH = document.documentElement.clientHeight;

var desW = 640;

var desH = 960;

if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
});

function start(e) {
    this.startY = e.changedTouches[0].pageY;
}
function move(e) {
    this.flag = true;
    e.preventDefault();
    var moveY = e.changedTouches[0].pageY;
    var movePos = moveY - this.startY;
    var index = this.index;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=index){
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";
        arguments[0].firstElementChild.id = "";
    });
    if (movePos > 0) {
        this.prevsIndex = index == oLis.length - 1 ? 0 : index + 1;
        var duration = -winH + movePos;
    } else if (movePos < 0) {
        this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
        var duration = winH + movePos;
    }
    oLis[this.prevsIndex].style.display  ="block";
    oLis[this.prevsIndex].className = "zIndex";
    oLis[this.prevsIndex].style.webkitTransform = "translate(0," + duration + "px)";

    oLis[index].style.webkitTransform = "scale("+(1-Math.abs(movePos)/winH*1/2)+") translate(0,"+movePos+"px)";

}
function end(e) {
    if(this.flag){

    oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
    oLis[this.prevsIndex].style.webkitTransition = "0.7s";
    oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(){
        this.style.webkitTransition = "";
        this.firstElementChild.id = "p"+this.index;
    });
        this.flag = false;
    }

}








