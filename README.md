#Slider
原生js编写的轮播图组件（只有三栏是常驻的）。
#Notes
1. 实现功能
    * 左右箭头切换
    * 平滑无限滚动
    * 直接按钮定位切换
    * 基本动画效果
    * 自适应页面
2. 计划功能
    * 触摸切换
    * 鼠标拖拽切换（优先级低）
    * JQuery版本（优先级低）
    * 更多定制选项
3. 功能增强 
    * 动画效果增强
    * “直接按钮定位切换的图片快速移动”（修复）
    * README更多说明（优先级低）
    * UI优化    

#Usage
1. 接口示例说明
  ```
  var slider = new Slider({
        //视口容器
        container: document.body,
        //图片列表
        images: [
            "imgs/1.jpg",
            "imgs/2.jpg",
            "imgs/3.jpg",
            "imgs/4.jpg",
            "imgs/5.jpg",
            "imgs/6.jpg"
        ],
        // 默认显示的图片页数 从0开始计算
        pageIndex: 4
    });
  ```
  
2. [Demo](http://watermelonfruit.github.io/Slider/)

