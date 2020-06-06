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
           if (specialTags[i].getBoundingClientRect().top <= $(window).height() / 2 && specialTags[i].getBoundingClientRect().top >= 0) {
             // 通过和这个ID同名的href，找到a标签，这里ID是一个变量
             let a = this.view.$el.find(`a[href="#${id}"]`);
             // 找到a标签的父级元素li
             let target = a.parent("li");
             if (target.attr('class') !== 'highlight') {
               this.view.activeItem(target);
             }
           }
           let id = specialTags[i].id;
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















// /* 博客 */
// .blog{
//   width: 930px;
//   margin: 100px auto;
//   text-align: center;
// }
// .blog h2{
//   font-size: 34px;
//   margin-bottom: 32px;
//   color: #1c2c39;
// }
// .blog .swiper-container{
//   position: relative;
//   background: #fcfcfc;
//   box-shadow: 0px 1px 3px 1px rgba(102, 102, 102, 0.55);
// }
// .blog .swiper-container .swiper-wrapper{
//   /* padding-left: 25px;
//   padding-right: 110px; */
// }
// .blog .swiper-container .swiper-wrapper .swiper-slide{
//   padding: 55px 180px 40px 100px;
//   color: #757575;
//   text-align: left;
//   position: relative;
// }
// .blog .swiper-container .swiper-wrapper .swiper-slide .mark{
//   position: absolute;
//   left: 20px;
//   top: 50px;
// }
// .blog .swiper-container .swiper-wrapper .swiper-slide svg{
//   width: 40px;
//   height: 40px;
  
// }
// .blog .swiper-container .swiper-wrapper .blogTitle{
//   border-bottom: 1px solid #dddad9;
//   padding-bottom: 25px;
  
//   font-size: 20px;
//   font-weight: bold;
// }
// .blog .swiper-container .swiper-wrapper .bolgInfo{
//   margin-top: 25px;
// }
// .blog .swiper-nav{
//   position: absolute;
//   top: 25px;
//   right: 25px;
//   color: #3e4452;
// }
// .blog .swiper-nav > div{
//   padding: 18px 21px 19px 21px;
//   border: 1px solid #d7dbde;
//   margin: 10px auto;
//   color: #3e4452;
//   size: 14px;
//   position: static;
//   display: block;
//   --swiper-navigation-size: none;
// }
// .blog .swiper-nav > div::after{
//   content: '';
// }
// .blog .swiper-nav .icon{
//   color: #3e4452;
// }