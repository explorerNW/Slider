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
    // 帮助函数：has ClassName
    function hasClass(node,className) {
        var current = node.className || "";
        if (current.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
            return true;
        } else {
            return false;
        }
    }
    // 实例
    var template_slider = 
    '<div class="m-slider">\
        <div class="slide"><span class="slide-intro"></span></div>\
        <div class="slide"><span class="slide-intro"></span></div>\
        <div class="slide"><span class="slide-intro"></span></div>\
    </div>';
    var template_ctrl_prev = '<span class="slider-ctrl-prev"></span>';
    var template_ctrl_next = '<span class="slider-ctrl-next"></span>';
    
    // Slider
    function Slider(opt) {
        extend(this,opt);
        // 容器节点，设置overflow: hidden
        this.container = this.container || document.body;
        this.container.style.overflow = 'hidden';
        // 组件节点
        this.slider = this._layout.cloneNode(true);
        this.slides = [].slice.call(this.slider.querySelectorAll('.slide'));
        this.slidesIntro = [].slice.call(this.slider.querySelectorAll('.slide-intro'));      
        // 初始化
        this.pageNum = this.images.length; 
        this.imgPosition = this.imgPosition || '0% 0%';
        this.pageIndex = this.pageIndex || 0;
        this.slideIndex = 0;
        this.container.appendChild(this.slider);
        this.container.appendChild(html2node(template_ctrl_prev));
        this.container.appendChild(html2node(template_ctrl_next));
        this._conset();
        this.cons = [].slice.call(this.container.querySelectorAll('.slider-ctrl-cons'));
        this._init();
        this.cut();        
        this.auto();
        this.nav();
    }
    // 原型extend
    extend(Slider.prototype,{
        _layout: html2node(template_slider),
        // 初始设置 默认显示的图片
        _init: function() {
            this._step(0);       
        },
        // 左右切换
        cut: function() {
            // 左/右 上一页/下一页 切换控制
            let prev = this.container.querySelector('.slider-ctrl-prev');
            let next = this.container.querySelector('.slider-ctrl-next');
            prev.addEventListener('click',function() {
                this._step(-1);
            }.bind(this),false);
            next.addEventListener('click',function() {
                this._step(1);
            }.bind(this),false);
            // 点击slider左边/右边 上一页/下一页
            this.slider.addEventListener('click', function(e){
                if (e.pageX < this.slider.offsetWidth/2) {
                    this._step(-1);
                }else {
                    this._step(1);
                }
            }.bind(this),false) 
        },
        // 自动轮播
        auto: function() {
            setInterval(function() {
                this._step(1)
            }.bind(this),this.autotime);            
        },
        // 直接定位
        nav: function() {
            for (let i = 0; i < this.cons.length; i++ ) {                           
                this.cons[i].addEventListener('click',function() {
                    this.pageIndex = i;
                    this._step(0);
                }.bind(this),false); 
            }
        },
        // 直接定位按钮初始化
        _conset: function() {
            let ul = document.createElement('ul');
            ul.className = 'm-slider-ctrl-con';
            this.container.appendChild(ul);
            for (let i = 0; i < this.pageNum; i++) {
                let li = document.createElement('li');
                li.className = 'slider-ctrl-cons';
                ul.appendChild(li);
            }
            
        },
        // 图片切换逻辑控制
        _step: function(offset) {
            this.pageIndex += offset;
            // 控制cons激活显示
            let that = this;
            this.cons.forEach(function(con, index) {
                if (index === ((that.pageIndex % that.pageNum) + that.pageNum) % that.pageNum) {
                    addClass(con,'z-active');
                } else {
                    removeClass(con,'z-active');
                }
            });
            // slideIndex取值为0/1/2；通过parseInt(this.pageIndex / 3)取整数
            let slideIndex = this.pageIndex - 3*parseInt(this.pageIndex / 3);
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
            // 设置图片(background)url
            this.slides[this.slideIndex].style.background ='url(' + this.images[((this.pageIndex % this.pageNum) + this.pageNum) % this.pageNum] + ')' + this.imgPosition + '/ 100% 100%' + 'no-repeat';
            this.slidesIntro[this.slideIndex].innerText =this.imgIntro[((this.pageIndex % this.pageNum) + this.pageNum) % this.pageNum];
        }
    })
    
    // 暴露API到全局
    window.Slider = Slider;
}()