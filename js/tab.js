{
  let view = {
    el: ".skill",
    init() {
      this.$el = $(this.el);
    },
    template:`
          <li>
              <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-duihao2"></use>
              </svg>
              <span>{{skillText}}</span>
          </li>`,
    render(data){
      this.$el.find('.skillTitle > h2').text(data[0])
      this.$el.find('.skillTitle > p').text(data[1])
      this.$el.find('ol.skillContentList').empty()
      for(let i=2; i<data.length; i++){
        console.log(data[i])
        $li = $(this.template.replace("{{skillText}}", data[i]))
        this.$el.find('ol.skillContentList').append($li)
      }
    },
    activeItem(li) {
      $li = $(li);
      $li.children(":first").addClass("active");
      $li.siblings().children(".active").removeClass("active");
    },
  };
  let model = {
    data: {
      HTML: [
        "HTML & CSS",
        "HTML称为超文本标记语言，是一种标识性的语言。CSS称为层叠样式表，是一种用来表现HTML或XML等文件样式的计算机语言。",
        "掌握 HTML5 常用标签，并能够编写HTML语义化页面",
        "掌握 CSS3 常用属性，能够高度还原设计稿",
        "能够使用文档流，盒模型，flex布局", 
        "能够使用媒体查询，动态REM等实现响应式页面"
      ],
      JavaScript: [
        "JavaScript",
        "JavaScript（简称“JS”） 是一种具有函数优先的轻量级，解释型或即时编译型的高级编程语言。",
        "掌握 JavaScript API 进行 DOM 操作，能够使用原生 JavaScript 进行项目开发 ",
        "掌握 JavaScript 重要概念，例如闭包、原型链、作用域等 ",
        "掌握 ES6 部分语法，例如 Promise、async/await、Class 与继承等"
      ],
      HTTP: [
        "HTTP",
        "http是一个简单的请求-响应协议，它通常运行在TCP之上。它指定了客户端可能发送给服务器什么样的消息以及得到什么样的响应。",
        "了解 HTTP 基础知识，了解常见状态码含义",
        "理解 AJAX、缓存、Cookie、Session、同源政策及跨域等 ",
        "了解前端性能优化策略"
      ],
      Vue框架: [
        "Vue 框架",
        "Vue是一套用于构建用户界面的渐进式JavaScript框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。",
        "能够使用 Vue 进行项目开发，理解Vue的生命周期函数，数据双向绑定，响应式原理等 ",
        "能够使用 Vue-Router 制作路由，进行SPA项目开发 ",
        "能够使用 VueX 进行状态管理", 
      ],
      Server: [
        "PHP & MySQL",
        "PHP即“超文本预处理器”，是一种通用开源脚本语言。PHP是在服务器端执行的脚本语言，是常用的网站编程语言。",
        "了解 node.js 后台语言，能够进行简单的代码编写，并可以连接自制的数据库进行增删改查",
        "了解 PHP，能够进行简单的编写，并可以连接 MySQL 进行增删改查",
      ],
      其他: [
        "其他知识",
        "正则表达式，又称规则表达式。计算机科学的一个概念。正则表达式通常被用来检索、替换那些符合某个模式(规则)的文本。",
        "能够使用正则表达式，对数据进行处理",
        "了解命令行，能够使用命令行进行常用操作",
        "能够使用版本控制器 Git 进行代码管理",
        "熟悉MVC模块化，能用 MVC 模块化思想编写代码", 
        "能够使用 BootStrap、Swiper、Element-UI、Antd等第三方框架、组件",
        "掌握 jQuery，能够使用jQuery进行项目开发",
        "能够使用 Webpack 工具进行开发"
      ],
    },
  };
  let controller = {
    init(view, model) {
      this.view = view;
      this.view.init();
      this.model = model;
      this.bindEvent();
    },
    bindEvent() {
      this.view.$el.on("click", "li", (e) => {
        this.view.activeItem(e.currentTarget);
        let name = e.currentTarget.lastElementChild.innerText
        console.log(this.model.data[name])
        this.view.render(this.model.data[name])
      });
    },
  };
  controller.init(view, model);
}
