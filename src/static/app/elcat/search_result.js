const BaseModalDialog = require('../components/modal/modal.component');
const BOOK_INFO_URL = '/elcat/api/bookinfo/';
const BOOK_ORDER_URL = '/elcat/api/bookorder/';
const BOOK_BACK_URL = '/elcat/api/bookback/';
const BOOK_PROLONG_URL = '/elcat/api/prolonged/';
const BOOK_CANCELLATION_URL = '/elcat/api/cancellation/';
let IssueBook = require('./issue_book.component');

let buttonsOrder = $('.btn-order-book');
buttonsOrder.on('click', (e)=> {
    let bookId = $(e.currentTarget).data("book_id");
    getBookInfo(bookId).then((data)=> {
        new BaseModalDialog({
            title: 'Заказ книги',
            content: `${data.card} <p><strong>Действительно заказать книгу?</strong></p>`,
            okCaption: 'Заказать',
            callback: ()=> {
                OrderedBook(bookId);

                return true;
            }
        });
    });
});


function OrderedBook(bookId) {
    $.ajax(BOOK_ORDER_URL + bookId, {
        method: "get"
    }).then((data)=> {
        if (data.success) {
            alert('Книга успешно заказана');
        } else {
            alert(data.error);
        }
    }, (error)=> {
        alert(error);
    });
}


function getBookInfo(bookId) {
    return $.ajax(BOOK_INFO_URL + bookId, {
        method: "get"
    });
}


let buttonsIssue = $('.btn-issued');

buttonsIssue.on('click', (e)=> {
    let bookId = $(e.currentTarget).data("book_id");
    let issueControl = new IssueBook(bookId);
    let dialog = new BaseModalDialog({
        title: 'Выдача книги',
        content: '<i class="fa fa-spiner fa-spin"></i>',
        okCaption: 'Выдать',
        callback: ()=> {

            issueControl.submit();

        }
    });
    issueControl.runSuccessCallback = ()=> {
        dialog.hide();
    };
    dialog.setContent(issueControl.el);
});

let buttonsBack = $('.btn-back');

buttonsBack.on('click', (e)=> {
    let bookId = $(e.currentTarget).data("book_id");
    getBookInfo(bookId).then((data)=> {
        new BaseModalDialog({
            title: 'Возврат книги',
            content: `${data.card} <p><strong>Действительно вернуть книгу?</strong></p>`,
            okCaption: 'Возврат',
            callback: ()=> {
                BookBack(bookId);

                return true;
            }
        });
    });
});

function BookBack(bookId) {
    $.ajax(BOOK_BACK_URL + bookId + '/', {method: 'post'}).then(
        (data)=> {
            if (data.success) {
                alert('Книга возвращена.');
            }
            else {
                alert(data.error);
            }
        }
    )
}


let buttonsProlonged = $('.btn-prolonged');

buttonsProlonged.on('click', (e)=> {
    let bookId = $(e.currentTarget).data("book_id");
    getBookInfo(bookId).then((data)=> {
        new BaseModalDialog({
            title: 'Продлить выдачу книги',
            content: `${data.card} <p><strong>Действительно продлить книгу?</strong></p>`,
            okCaption: 'Продлить',
            callback: ()=> {
                ProlongBack(bookId);

                return true;
            }
        });
    });
});

function ProlongBack(bookId) {
    $.ajax(BOOK_PROLONG_URL + bookId + '/', {method: 'post'}).then(
        (data)=> {
            if (data.success) {
                alert('Книга продлена.');
            }
            else {
                alert(data.error);
            }
        }
    )
}


let buttonsCancellation = $('.btn-cancellation');

buttonsCancellation.on('click', (e)=> {
    let bookId = $(e.currentTarget).data("book_id");
    getBookInfo(bookId).then((data)=> {
        new BaseModalDialog({
            title: 'Списание книги',
            content: `${data.card} <p><strong>Действительно СПИСАТЬ книгу?</strong></p>`,
            okCaption: 'Списать',
            callback: ()=> {
                CancellationBook(bookId);

                return true;
            }
        });
    });
});

function CancellationBook(bookId) {
    $.ajax(BOOK_CANCELLATION_URL + bookId + '/', {method: 'post'}).then(
        (data)=> {
            if (data.success) {
                alert('Книга списана.');
            }
            else {
                alert(data.error);
            }
        }
    )
}

