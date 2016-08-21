!(() => {
    // 将HTML转换为节点
    let html2node = (str) => {
        let container = document.createElement('div');
        container.innerHTML = str;
        return container.children[0];
    }
    // 帮助函数：赋值、扩展
    let extend = (a,b) => {
        for (let i in b) {
            if (typeof a[i] === 'undefined') {
                a[i] = b[i];
            }
        }
        return a;
    }
    // 帮助函数：add ClassName
    let addClass = (node, className) => {
        let current = node.className || "";
        if ((` ${current} `).indexOf(` ${className} `) === -1) {
        node.className = current? ( `${current} ${className}` ) : className;
        }
    }   
    // 帮助函数：remove ClassName
    let removeClass = (node, className) => {
        let current = node.className || "";
        node.className = (` ${current} `).replace(` ${className} `, " ").trim();
    }
    // 帮助函数：has ClassName
    let hasClass = (node,className) => {
        let current = node.className || "";
        if (current.match(new RegExp(`(\\s|^)${className}(\\s|$)`))) {
            return true;
        } else {
            return false;
        }
    }
    // 实例
    let template = 
    '<div class="m-slider">\
        <div class="slide"><span class="slide-intro"></span></div>\
        <div class="slide"><span class="slide-intro"></span></div>\
        <div class="slide"><span class="slide-intro"></span></div>\
    </div>';
    
    // Slider
    function Slider(opt) {
        extend(this,opt);
        // 容器节点，设置overflow: hidden
        this.container = this.container || document.body;
        this.container.style.overflow = 'hidden';
        // 组件节点
        this.slider = this._layout.cloneNode(true);
        this.slides = Array.from(this.slider.querySelectorAll('.slide'));
        this.slidesIntro = Array.from(this.slider.querySelectorAll('.slide-intro'));
        this.ctrlCon = this.container.querySelector('.m-slider-ctrl-con');
        this.cons = Array.from(this.container.querySelectorAll('.slider-ctrl-cons'));    
        // 初始化
        this.pageNum = this.images.length; 
        this.pageIndex = this.pageIndex || 0;
        this.slideIndex = 0;
        this._init(); 
        this.container.appendChild(this.slider);
    }
    // 原型extend
    extend(Slider.prototype,{
        _layout: html2node(template),
        // 初始设置 默认显示的图片
        _init() {
            this._step(0); 
        },
        prev() {
            this._step(-1);
        },
        next() {
            this._step(1);
        },
        // 图片切换逻辑控制
        _step(offset) {
            this.pageIndex += offset;
            // 直接定位
            if (this.ctrlCon) {
                this._nav();
            }
            // slideIndex取值为0/1/2；通过parseInt(this.pageIndex / 3)取整数
            let slideIndex = this.pageIndex - 3*parseInt(this.pageIndex / 3);
            if (slideIndex >= 0) {
                this.slideIndex = slideIndex;
            }else {
                this.slideIndex = -1 * slideIndex;
            } 
            this.slider.style.transitionDuration = '.5s';
            // 偏移量
            this.slider.style.transform = `translateX(${-this.pageIndex*100}%)`;
            this.slides[this.slideIndex].style.left = `${this.pageIndex*100}%`;
            this.slides[(this.slideIndex + 4)%3].style.left = `${(this.pageIndex + 1)*100}%`;
            this.slides[(this.slideIndex + 2)%3].style.left = `${(this.pageIndex - 1)*100}%`;
            // 设置图片(background)url
            this.slides[this.slideIndex].style.background =`url(${this.images[((this.pageIndex % this.pageNum) + this.pageNum) % this.pageNum]})0 0 / 100% 100%no-repeat`;
            // 设置图片说明文字
            if (this.imgIntro) {
                this.slidesIntro[this.slideIndex].style.display = 'block';
                this.slidesIntro[this.slideIndex].innerText = this.imgIntro[((this.pageIndex % this.pageNum) + this.pageNum) % this.pageNum];
            }
        },
        // 直接定位
        _nav() {
            this.ctrlCon.style.display = 'block';
            let that = this;
            this.cons.forEach((con, index) => {
                // 点击con直接切换到目标slide
                con.addEventListener('click', () => {
                    that.pageIndex = index;
                    that._step(0);
                },false);
                // 控制cons激活显示
                if (index === ((that.pageIndex % that.pageNum) + that.pageNum) % that.pageNum) {
                    addClass(con,'z-active');
                } else {
                    removeClass(con,'z-active');
                }
            });
        }
    })
    
    // 暴露API到全局
    window.Slider = Slider;
})()