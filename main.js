!function() {
    
    // 将HTML转换为节点
    function html2node(str) {
        var container = document.createElement('div');
        container.innerHTML = str;
        return container.children[0];
    }
    // 帮助函数：赋值、扩展
    function extend(a,b) {
        for (let i in b) {
            if (typeof a[i] === 'undefined') {
                a[i] = b[i];
            }
        }
        return a;
    }
    // 帮助函数：add ClassName
    function addClass(node, className) {
        var current = node.className || "";
        if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
        node.className = current? ( current + " " + className ) : className;
        }
    }   
    // 帮助函数：remove ClassName
    function removeClass(node, className){
        var current = node.className || "";
        node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
    }

    var template = 
    '<div class="m-slider">\
        <div class="slide"><img></div>\
        <div class="slide"><img></div>\
        <div class="slide"><img></div>\
    </div>';

    function Slider(opt) {
        extend(this,opt);
        // 容器节点，设置overflow: hidden
        this.container = this.container || document.body;
        this.container.style.overflow = 'hidden';
        // 组件节点
        this.slider = this._layout.cloneNode(true);
        // this.m_cursor = document.querySelector('.m-cursor').cloneNode(true);
        this.slides = [].slice.call(this.slider.querySelectorAll('.slide'));
        this.imgs = [].slice.call(this.slider.querySelectorAll('.slide img'));
        this.cursors = [].slice.call(document.querySelectorAll('.m-cursor > .cursor'));
        
        // 初始化
        this.pageNum = this.images.length; 
        this.pageIndex = this.pageIndex || 0;
        this.slideIndex = 0;
        this.container.appendChild(this.slider);
        this._init();
        this.nav();
        this.next();
        this.prev();
        
        // this.cursors[4].addEventListener('click',function() {
        //     this.onnav();
        // },false);
        
    }

    extend(Slider.prototype,{
        _layout: html2node(template),
        // 初始设置 默认显示的图片
        _init: function() {
            this._step(0);
        },
        // 下一张
        next: function() {
            let next = document.querySelector('.m-cursor > .next');
            let that = this;
            next.addEventListener('click', function(){
                that._step(1);
            },false);
            
            
        },
        // 上一张
        prev: function() {
            let prev = document.querySelector('.m-cursor > .prev');
            let that = this;
            prev.addEventListener('click', function(){
                that._step(-1);
            },false);
        },
        // 直接定位
        nav: function() {
            let that = this;
            for (let i = 0; i < this.cursors.length; i++ ) {
                this.cursors[i].addEventListener('click',function() {
                    that.pageIndex = i;
                    that._step(0);
                },false); 
            }
        },
        // 图片切换逻辑控制
        _step: function(offset) {
            this.pageIndex += offset;
            // slideIndex取值为0/1/2；通过parseInt(this.pageIndex / 3)取整数
            let  slideIndex = this.pageIndex - 3*parseInt(this.pageIndex / 3);
            if (slideIndex >= 0) {
                this.slideIndex = slideIndex;
            }else {
                this.slideIndex = -1 * slideIndex;
            } 
            this.slider.style.transitionDuration = '.5s';
            // 偏移量
            this.slider.style.transform = 'translateX(' + (-this.pageIndex*100) + '%)';
            this.slides[this.slideIndex].style.left = (this.pageIndex*100) + '%';
            this.slides[(this.slideIndex + 4)%3].style.left = ((this.pageIndex + 1)*100) + '%';
            this.slides[(this.slideIndex + 2)%3].style.left = ((this.pageIndex - 1)*100) + '%';
            // 设置图片src
            this.imgs[this.slideIndex].src = this.images[((this.pageIndex % this.pageNum) + this.pageNum) % this.pageNum];
        }
    })

    // 暴露API到全局
    window.Slider = Slider;
}()