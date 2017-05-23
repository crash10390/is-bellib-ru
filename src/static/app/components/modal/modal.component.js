const BaseElement = require('../BaseElement');
let template = require('./modal.template.handlebars');

class BaseModalDialog extends BaseElement {
    constructor(options) {
        super(template);
        this.title = options.title || "";
        this.content = options.content || "";
        this.okCaption = options.okCaption || "ОК";
        this.hideOkButton = options.hideOkButton || false;
        this.callback = options.callback || null;
        this.modalMode = options.modalMode || "md";
        this.render(true);
        $('body').append(this.el);
        if (this.hideOkButton) {
            this.$('.btn-ok').addClass('hidden');
        }
        this.show();
    }

    get contextData() {
        return {
            title: this.title,
            content: this.content,
            okCaption: this.okCaption || "OK"
        }
    }

    setupListeners() {
        if (this.callback) {
            this.$('.btn-ok').on('click', (e) => {
                this.runCallback(e);
            });
        }
    }

    runCallback(e) {
        let result = this.callback(e);
        if (result) {
            this.hide();
        }
    }

    hide() {
        this.$el.modal('hide');
    }

    show() {
        this.$el.modal('show');
    }

    setContent(content) {
        this.$('.custom-content').html(content);
    }
}

module.exports = BaseModalDialog;