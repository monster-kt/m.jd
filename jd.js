/**
 * @name: jd
 * @author: surui
 * @date: 2020-12-14 14:04
 * @description：jd
 * @update: 2020-12-14 14:04
 */
window.addEventListener('load',function () {
    // 获取最大的盒子
    var banner = document.querySelector('.banner');
    // 获取ul
    var ul = banner.children[0];
    // 获取ol
    var ol = banner.children[1];
    let count = 0;
    // 获取banner宽度
    let w = banner.offsetWidth;
    // 过渡时间
    var time = '';
    // 利用定时器自动轮播
    var timer = setInterval(function () {
        count++;
        movepic(count,'.3s')
    },2000);
    // 等待过渡完成了 再去判断  监听过渡完成的事件 transitionend
    ul.addEventListener('transitionend',function () {
        // 无缝滚动
        if(count >= 3){
            count = 0;
        }else if(count < 0){
            count = 2;
        }
        // 去掉过渡 直接跳到前面
        time = 'none';
        movepic(count,time);
        // 小圆点跟随变化效果
        ol.querySelector('.current').classList.remove('current');
        ol.children[count].classList.add('current');
    });
    // 手指滑动轮播图
    let x = 0;
    let movex = 0;
    ul.addEventListener('touchstart',function (e) {
        x = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    ul.addEventListener('touchmove',function (e) {
        movex = e.targetTouches[0].pageX - x;
        // 手指拖动不需要动画
        let translateX = -count * w + movex;
        this.style.transition = 'none';
        this.style.transform = 'translateX('+ translateX +'px)';
    });
    // 手指滑动播放上下张
    ul.addEventListener('touchend',function () {
        if (Math.abs(movex) > 50){
            if (movex > 0){
                count--;
            }else {
                count++;
            }
        }
        movepic(count,'.3s');
        timer = setInterval(function () {
            count++;
            movepic(count,'.3s')
        },2000);
    });

    function movepic(count,time) {
        let translatex = -count * w;
        ul.style.transition = time;
        ul.style.transform = 'translateX('+ translatex +'px)';
    }
});