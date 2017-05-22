const BaseModalDialog = require('../components/modal/modal.component');
const CHANGE_PROFILE_REQUEST_URL = '/accounts/api/change_request/';

class LibrarianProfile {
    constructor() {
        this.setupListener();
    }

    setupListener() {

    }
}

class ReaderProfile {
    constructor() {
        this.setupListener();
    }

    setupListener() {
        $('.btn-change-profile-request').on('click', ()=>{this.sendRequest();})
    }

    sendRequest() {
        new BaseModalDialog({
            title: "Запрос",
            content: 'Ходите отправить запрос на изменение информации в Вашем профиле?',
            okCaption: 'Отправить',
            callback: () => {
                $.ajax(CHANGE_PROFILE_REQUEST_URL, {method: 'get'}).then(
                    (data) => {
                        if (data.sucess) {
                            alert('Запрос принят');
                        }
                        else {
                            if (data.error) {
                                alert(data.error);
                            }
                        }
                    });
                return true;
            }
        })
    }
}
let readerProfile = new ReaderProfile();