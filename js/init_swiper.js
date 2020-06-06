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
      autoplay:true,
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
// !function(){
//   var view = View("#blog");

//   var controller = Controller({
//     init: function(view) {
//       this.initSwiper();
//     },
//     swiper: null,
//     swiperOptions: {
//       loop: true,
//       pagination: {
//         el: ".swiper-pagination"
//       },
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev"
//       }
//     },
//     initSwiper: function() {
//       this.swiper = new Swiper(
//         this.view.querySelector(".swiper-container"),
//         this.swiperOptions
//       );
//     }
//   });
//   controller.init(view);
// }.call();
