{
  let view = {
    el: "nav.menu",
    init() {
      this.$el = $(this.el);
    },
  };
  let controller = {
    init(view) {
      this.view = view;
      this.view.init();
      this.initAnimation();
      this.bindEvents();
    },
    initAnimation() {
      function animate(time) {
        // 使用tween需要这段代码，让电脑根据实际情况分批时间
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);
    },
    bindEvents() {
      this.view.$el.on("click", "a", (e) => {
        // 阻止a标签的默认动作，即不会转跳
        e.preventDefault();
        //获取到我们监听的元素，即a标签
        let a = e.currentTarget;
        //获取a标签的href，如果直接用a.href,获得的是经过浏览器解析后带有http协议的href的内容
        // 所以要用a.getAttribute('href')
        let href = a.getAttribute("href");
        //通过选择器获取匹配这个href的元素，即与id与该a标签的href一致的元素
        let $element = $(`${href}`);
        this.scrollToElement($element);
      });
    },
    scrollToElement(element) {
      //得到该元素顶端距离页面顶端的距离top，注意是距离页面顶端，不是距离窗口顶端，这个top值是固定值
      let top = element.offset().top;
      // $(window).scrollY 指页面划过的距离，即窗口顶部到页面顶部的距离
      let currentTop = $(window).scrollTop();
      // 让window滑动到X方向不变，Y方向top减80
      let targetTop = top - 80;
      let s = targetTop - currentTop
      // 实现缓动效果，采用淡入淡出效果
      // 起点位置
      var coords = { y: currentTop };
      // 每走100px需要300毫秒，外面要加绝对值，因为距离可能出现负数，但是时间不行
      var t = Math.abs((s / 100) * 300);
      // 当时间大于0.5s时就让时间等于0.5s
      if (t > 500) {
        t = 500;
      }
      // tween的起点位置为coords
      var tween = new TWEEN.Tween(coords)
        // 起点位置和时间
        .to({ y: targetTop }, t)
        // 使用慢入慢出模式
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function () {
          // 每当点击时就会运行下面的函数，窗口就会缓动到终点位置，速度时间根据tween自行计算分配
          window.scrollTo(0, coords.y);
        }).start();
        // 开始运行tween
        
    },
  };
  controller.init(view);
}

