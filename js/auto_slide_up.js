{
  let view = {
    el: "body",
    init() {
      this.$el = $(this.el);
    },
    activeItem(li) {
      // 找到li为其添加class，并去除其兄弟元素的class
      li.addClass("highlight").siblings().removeClass("highlight");
    },
  };
  let controller = {
    init(view) {
      this.view = view;
      this.view.init();
      this.scrollWow();
      this.bindEvnets();
    },
    scrollWow() {
      wow = new WOW({
        boxClass: "wow", // 默认属性名
        animateClass: "animated", // 默认触发的动画类(包含在animate css中)
        offset: 0, // 为所有添加wow的元素设置 data-wow-delay属性 的默认值
        mobile: true, // 是否在移动设备中开启动画
        live: true, // 持续监测页面中是否插入新的wow元素
      });
      wow.init();
    },
    bindEvnets() {
      window.addEventListener("scroll", () => {
        // 找到所有有data-x的元素
        let specialTags = this.view.$el.find("[data-x]");
        // 遍历这些元素
        for (var i = 0; i < specialTags.length; i++) {
          if (specialTags[i].getBoundingClientRect().top <= $(window).height() / 2 && specialTags[i].getBoundingClientRect().top >= 0) {
            let id = specialTags[i].id;
            // 通过和这个ID同名的href，找到a标签，这里ID是一个变量
            let a = this.view.$el.find(`a[href="#${id}"]`);
            // 找到a标签的父级元素li
            let target = a.parent("li");
            if (target.attr('class') !== 'highlight') {
              this.view.activeItem(target);
            }
          }
        }
      });
    },
  };
  controller.init(view);
}
