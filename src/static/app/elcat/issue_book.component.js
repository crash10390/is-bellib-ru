const BaseElement = require('../components/BaseElement');
let template = require('./issued_book.template.handlebars');
const READERS_URL = '/elcat/api/readers/';
const ISSUED_BOOK_URL = '/elcat/api/issues/';

class IssueBook extends BaseElement {
    constructor(bookId) {
        super(template);
        this.bookId = bookId;
        this.render();
    }

    get contextData() {
        return {readers: this.readers}
    }


    getReader() {
        return this.$('#ticketNumber').val();
    }

    submit() {
        $.ajax(ISSUED_BOOK_URL + this.bookId + '/', {
            method: 'post',
            data: {reader: this.getReader()}
        }).then((response)=> {
            if (response.success) {
                alert('Книга выдана');
                this.runSuccessCallback();
                return;
            }
            if (response.error) {
                alert(response.error);
                return false;
            }
            alert(response);
            return false

        }, (failResponse)=>{alert('Произошла ошибка сети, повторите позднее.')});
    }
    runSuccessCallback(){
        if (this.successCallback){
            this.successCallback();
        }
    }

}
module.exports = IssueBook;