{
    let view ={
        el: '.experience',
        init(){
            this.$el = $(this.el)
        },
        activeItem(li){
            $li = $(li)
            if($li.next().hasClass('active')){
                $li.next().removeClass('active') 
            }else{
                $li.next().addClass('active')
            }
        }
    };
    let model = {

    };
    let controller = {
        init(view, model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvent()
        },
        bindEvent(){
            this.view.$el.on('click', 'h3', (e) => {
                this.view.activeItem(e.currentTarget)
            })
        }
    }
    controller.init(view, model)
}