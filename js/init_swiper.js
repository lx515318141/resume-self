{
  let view = {
    el: ".swiper-container",
    init() {
      this.$el = $(this.el);
    },
    template: `
      <div class="swiper-slide">
          <div class="mark">
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-baojiaquotation"></use>
              </svg>
          </div>
          <div class="blogTitle">
              <a href="{{url}}">{{title}}</a>
          </div>
          <div class="bolgInfo">{{content}}</div>
      </div>
      `,
    render(data) {
      data.map((value) => {
        let $div = $(
          this.template
            .replace("{{title}}", value.title)
            .replace("{{url}}", value.url)
            .replace("{{content}}", value.content)
        );
        this.$el.find('#swiper-wrapper').append($div)
      });
    },
  };
  let model = {
    data: [
      {
        title: "简历系列——常用api",
        url: "https://github.com/lx515318141/NOTES/issues/1",
        content:
          "本篇博客会整理一些本次在编写个人简历项目过程中使用到的一些api，以及相关同类型的常用api，其中包括 jQuery api 和 DOM api。",
      },
      {
        title: "简历系列——关于页面中的距离关系",
        url: "https://github.com/lx515318141/NOTES/issues/2",
        content:
          "在本次项目中多次使用了元素与视口距离的关系，作为执行js的判断条件，如：当元素顶部超过视口二分之一时，顶部导航栏对应的模块名出现下划线，以及元素顶部超过视口底部100px元素执行上浮动画效果等。这些都需要对元素与视口以及页面顶部三种之间的距离关系进行分析以及处理，下面整理一些本次用到的求三者之间距离关系的api和思路。",
      },
      {
        title: "简历系列——日历的制作",
        url: "https://github.com/lx515318141/NOTES/issues/3",
        content:
          "本篇博客详细记录了，我在本次制作日历过程中的主体思路和算法，以及遇到的一些相关问题和它们的解决办法。最后我还整理了一些关于深拷贝的方法和大家共享。",
      },
      {
        title: "简历系列——滑入动画",
        url: "https://github.com/lx515318141/NOTES/issues/4",
        content:
          "我在本篇简历中各个模块使用了滑入的动画效果，最初使用原生JS实现，后因为有时会出现闪烁现象，而改为使用动画效果库。先后使用了 scrollReveal.js 和 wow.js 。<br>本篇博客详细记录了两种动画效果库的使用方法，以及我使用的逻辑判断。",
      },
    ],
  };
  let controll = {
    init(view, model) {
      this.view = view;
      this.view.init();
      this.model = model;
      this.view.render(this.model.data);
      this.initSwiper();
      
    },
    swiper: null,
    swiperOptions: {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // 轮播是否自动播放
      autoplay: true,
      // 当认为点击前进后退按钮时，是否停止自动播放
      autoplay: {
        disableOnInteraction: false,
      },
    },
    initSwiper() {
      this.swiper = new Swiper(this.view.$el, this.swiperOptions);
    },
  };
  controll.init(view, model);
}
