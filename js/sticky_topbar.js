{
  let view = {
    el: "#topNavBar",
    init() {
      this.$el = $(this.el);
    },
    active: function () {
      this.$el.addClass("sticky");
    },
    deactive: function () {
      this.$el.removeClass("sticky");
    },
  };
  let contreller = {
    init(view) {
      this.view = view;
      this.view.init();
      this.bindEvents();
      this.sticky()
    },
    bindEvents() {
      // 监听屏幕滑动
      window.addEventListener("scroll", (e) => {
        this.sticky()
      });
    },
    sticky() {
      // 箭头函数没有this，所有箭头函数内外this不变
      if (window.scrollY > 0) {
        //window.scrollY：文档从顶部开始滚动过的像素值
        this.view.active();
        // 给topNavBar的class添加sticky
      } else {
        this.view.deactive();
      }
    },
  };
  contreller.init(view);
}
