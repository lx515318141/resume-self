{
  let view = {
    el: "body",
    init() {
      this.$el = $(this.el);
    },
    activeItem(li) {
      // 再把最近的元素加上highlight状态
      li.addClass("highlight");
      // 遍历a标签自己及其全部兄弟元素，将他们都移除highlight状态
      li.siblings().removeClass("highlight");
    },
    scrollreveal(id) {
      // console.log(id);
      if (id.indexOf(" ") === -1) {
        let up = {
          duration: 500,
          distance: "200px",
          easing: "ease-out",
          cleanup: true
        };
        ScrollReveal().destroy(`#${id}`);
        ScrollReveal().reveal(`#${id}`, up);
        this.$el.find(`#${id}`).addClass("offset");
        
      } else {
        let classList = id.split(" ");
          if (classList[0] === "even") {
            let left = {
              duration: 500,
              distance: "100px",
              easing: "ease-out",
              origin: "right",
              cleanup: true
            };
            ScrollReveal().destroy(`.${classList[1]}`, left);
            ScrollReveal().reveal(`.${classList[1]}`, left);
            this.$el.find(`.${classList[1]}`).addClass("offset");
          } else {
            let right = {
              duration: 500,
              distance: "100px",
              easing: "ease-out",
              origin: "left",
              cleanup: true
            };
            ScrollReveal().destroy(`.${classList[1]}`, right);
            ScrollReveal().reveal(`.${classList[1]}`, right);
            this.$el.find(`.${classList[1]}`).addClass("offset");
          }
        
        
      }
    },
  };
  let controller = {
    init(view) {
      this.view = view;
      this.view.init();
      this.bindEvents();
      let card = "siteAbout";
      this.view.scrollreveal(card);
    },
    bindEvents() {
      wow = new WOW(
        {
            boxClass: 'wow',      // 默认属性名
            animateClass: 'animated', // 默认触发的动画类(包含在animate css中)
            offset: 0,          // 为所有添加wow的元素设置 data-wow-delay属性 的默认值
            mobile: true,       // 是否在移动设备中开启动画
            live: true        // 持续监测页面中是否插入新的wow元素
        }
    );
    wow.init();

      window.addEventListener('scroll', () => {
        // 找到所有有data-x的元素
        let specialTags = this.view.$el.find("[data-x]");
        // 遍历这些元素
        for (var i = 0; i < specialTags.length; i++) {
          let isMidline =
            $(window).height() / 2 >= specialTags[i].offsetTop - window.scrollY;
          let id = specialTags[i].id;
          if (isMidline) {
            // 通过和这个ID同名的href，找到a标签，这里ID是一个变量
            let a = this.view.$el.find(`a[href="#${id}"]`);
            // 找到a标签的父级元素
            let li = a.parent("li");
            // 找到li下所有子元素，包括a标签自己
            this.view.activeItem(li);
          }
          this.findOverBottom(specialTags[i], id);
        }
      }) 
    },
    // 寻找顶部超过窗口底部30px的元素
    findOverBottom(target, id) {
      // 找到元素顶部超出窗口底部30px以上的元素
      // $(window).height()为窗口高度；target.offsetTop元素到页面顶部距离，是个固定值；
      // window.scrollY，窗口划过的距离，即窗口顶部到页面顶部的距离
      let $height = $(window).height() - (target.offsetTop - window.scrollY);
      if ($height > 100 && target.getBoundingClientRect().bottom > 0) {
        if (id === "siteWorks") {
          let works = this.view.$el.find(`#siteWorks .workList > div`);
          for (let j = 0; j < works.length; j++) {
            let workParity = works[j].getAttribute("class");
            if(workParity.indexOf('offset') === -1){
              let $height_small =
                $(window).height() - works[j].getBoundingClientRect().top;
              if ($height_small > 100){
                this.view.scrollreveal(workParity);
              }
            }
            // let isShow_small = this.view.$el.find(`.${workParity}`).hasClass("offset");
            // console.log(this.view.$el
            //   .find(`.${workParity}`))
            // console.log(workParity);
            // console.log(isShow_small);
            // if (!isShow_small) {
            //   let $height_small =
            //     $(window).height() - works[j].getBoundingClientRect().top;
            //   if ($height_small > 100){
            //     this.view.scrollreveal(workParity);
            //   }
            // }
          }
        } else {
          let isShow = this.view.$el.find(`#${id}`).hasClass("offset");
          if (!isShow) {
            this.view.scrollreveal(id);
          }
        }
      }
    },
  };
  controller.init(view);
}
