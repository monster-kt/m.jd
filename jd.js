/**
 * @name: jd
 * @author: surui
 * @date: 2020-12-14 14:04
 * @description：jd
 * @update: 2020-12-14 14:04
 */
window.addEventListener('load',function () {
    // 获取最大的盒子
    let banner = document.querySelector('.banner');
    // 获取ul
    let ul = banner.children[0];
    // 获取ol
    let ol = banner.children[1];
    let count = 0;
    // 获取banner宽度
    let w = banner.offsetWidth;
    // 过渡时间
    let time = '';
    // 判断用户是否拖动
    let flag = false;

    // 利用定时器自动轮播
    let timer = setInterval(function () {
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
    let x = 0;               // 开始位置
    let movex = 0;          // 移动距离
    ul.addEventListener('touchstart',function (e) {
        x = e.targetTouches[0].pageX;
        clearInterval(timer);
    });

    ul.addEventListener('touchmove',function (e) {
        flag = true;        // 只有用户手指移动了我们再判断是否需要移动图片 否则不做判断
        movex = e.targetTouches[0].pageX - x;
        // 手指拖动不需要动画
        let translateX = -count * w + movex;
        this.style.transition = 'none';
        this.style.transform = 'translateX('+ translateX +'px)';
        e.preventDefault();             // 阻止屏幕滚动
    });

    // 手指滑动播放上下张
    ul.addEventListener('touchend',function () {
        if (flag) {
            if (Math.abs(movex) > 50) {
                if (movex > 0) {
                    count--;
                } else {
                    count++;
                }
            }
            movepic(count, '.3s');
            timer = setInterval(function () {
                count++;
                movepic(count, '.3s')
            }, 2000);
        }
    });

    // 封装轮播图函数
    function movepic(count,time) {
        let translatex = -count * w;
        ul.style.transition = time;
        ul.style.transform = 'translateX('+ translatex +'px)';
    }

    // 返回顶部
    let goBack = document.querySelector('.goBack');
    console.log(banner.offsetTop / 2);
    window.addEventListener('scroll',function () {
        if (window.pageYOffset >= banner.offsetTop){
            goBack.style.display = 'inline';
        }else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click',function () {
        // 快速返回顶部
        // window.scroll(0,0);

        // 采用缓动动画来页面滚动
        animate(window,0);
    });
    // 解决移动端 click 延时问题
    // 封装返回顶部缓动动画函数
    function  animate(obj,target,callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            let step = (target - obj.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.pageYOffset == target){
                clearInterval(obj.timer);
                timer = null;
                callback && callback();
            }
            obj.scroll(0,obj.pageYOffset + step);
        },15)
    }
});