const BaseModalDialog = require('../components/modal/modal.component');
const BookTransfer = require('./widgets/BookTransfer');


class Message {
    constructor(element) {
        this.$el = $(element);
        this.loadData();
        this.$('.open-message-button').on('click', () => {
            this.showModal();
        })
    }

    $(selector) {
        return this.$el.find(selector);
    }

    loadData() {
        this.id = this.$el.data('id');
        this.type = this.$el.data('type');
        this.context = this.$el.data('context');
        this.subject = this.$el('.message-subject').html();
        this.text = this.$el('.message-text').html();
        this.setMode(this.type);
    }

    setMode(mode) {
        switch (mode) {
            case 'book_order':
                this.modalWidget = new BookTransfer({
                    id: this.id,
                    subject: this.subject,
                    text: this.text,
                    system_context: this.context,

                }, ()=>{this.closeWidgetCallback();});
                break;
        }
    }

    showModal() {
        this.modelDialog = new BaseModalDialog({
            title: `Сообщение №${this.id}`,
            hideOkButton: true
        });
        this.modelDialog.setContent(this.modalWidget.el);

    }

    closeWidgetCallback() {
        this.modelDialog.hide();
        this.$el.html('');
    }

}

class MessageBox {

    constructor(element) {
        this.$el = $(element);
        this.messges = [];
        this.loadMessages();
    }

    $(selector) {
        return this.$el.find(selector);
    }

    loadMessages() {
        this.$('.message').each((index, elem)=>{
            this.messges.push(new Message(elem));
        });
    }

}

if ($('#message-box').length > 0){
    new MessageBox($('#message-box'));
}