#Slider
原生js编写的轮播图组件。

#Usage
1. 接口示例说明
  ```
    let slider = new Slider({
            // 视口容器
            container: document.body,
            // 图片列表
            images: [
                'imgs/slideshow/1.jpg',
                'imgs/slideshow/2.jpg',
                'imgs/slideshow/3.jpg',
                'imgs/slideshow/4.jpg',
                'imgs/slideshow/5.jpg',
                'imgs/slideshow/6.jpg'
            ],
            // 图片介绍
            imgIntro: [
                '1 Hello',
                '2 Hello',
                '3 Hello',
                '4 Hello',
                '5 Hello',
                '6 Hello',
            ],
            // 默认显示的图片页数 从0开始计算
            pageIndex: 2
        }); 

        // 上一页/下一页 切换控制
        let prev = document.querySelector('.slider-ctrl-prev');
        let next = document.querySelector('.slider-ctrl-next');
        prev.addEventListener('click',function() {
            slider.prev();
        },false);
        next.addEventListener('click',function() {
            slider.next();
        },false);

        // 自动轮播
        setInterval(() => {
            slider.next();
        },10000); 
  ```
  
2. [Demo](http://watermelonfruit.github.io/Slider/)

