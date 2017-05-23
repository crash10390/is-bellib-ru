const BaseElement = require('../../components/BaseElement');
const TRANSFER_COMPLETE_URL = 'api/booktransfer/complete/';
let template = require('./BookTransfer.template.handlebars');

class BookTransfer extends BaseElement {
    constructor(message, closeCallback) {
        super(template);
        this.message = message;
        this.closeCallback = closeCallback;
        this.render();

    }

    setupListeners() {
        this.$('#confirmTransferButton').on('click', () => {
            this.transferComplete();
        })
    }

    transferComplete() {
        $.ajax(TRANSFER_COMPLETE_URL+this.message.system_context, {method:'post'}).then(
            (response)=>{
                if(response.success){
                    this.closeCallback();
                }
                else if (response.error ){
                    alert('error');
                }
            });
    }

    get contextData() {
        return {
            message: {
                subject: this.message.subject,
                text: this.message.text
            }
        }
    }
}

module.exports = BookTransfer;