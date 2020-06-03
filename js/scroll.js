{
    let view = {
        el: 'body',
        init(){
            this.$el = $(this.el)
        },
        activeItems(){

        }
    };
    let controller = {
        init(view){
            this.view = view
            this.view.init
            this.bindEvents()
        },
        bindEvents(){
            this.view.$el.on('')
        },
        findClosetAndRemoveOffset(){

        }
    }
    controller.init(view)
}