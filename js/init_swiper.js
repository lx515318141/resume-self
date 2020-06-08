{
  let view = {
    el: '.swiper-container',
    init(){
      this.$el = $(this.el)
    }
  };
  let controll = {
    init(view){
      this.view = view
      this.view.init()
      this.initSwiper()
    },
    swiper: null,
    swiperOptions: {
      loop: true,
      pagination: {
        el: ".swiper-pagination"
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      // 轮播是否自动播放
      autoplay:true,
      // 当认为点击前进后退按钮时，是否停止自动播放
      autoplay: {
        disableOnInteraction: false,
      },
    },
    initSwiper(){
      this.swiper = new Swiper(
        this.view.$el,
        this.swiperOptions
      );
    }
  }
  controll.init(view)
}

