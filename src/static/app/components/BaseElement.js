class BaseElement {
    /**
     * Конструктор
     * @param template Шаблон
     * @param element элемент, в который все оборачивается
     */
    constructor(template, element = 'div') {
        /**
         * Элемент, в который оборачивается виджет
         * @type {Element}
         */
        this.el = document.createElement(element);
        //небольшой хелпер
        this.$el = $(this.el);
        /**
         * Шаблон элемента
         */
        this.template = template
    }

    /**
     * Локальный скоуп
     * @param selector
     * @returns {*}
     */
    $(selector) {
        return this.$el.find(selector);
    }

    setupListeners() {
    }

    get contextData() {
        return {}
    }

    render(revertToChild = false, autoSetupListeners = true) {
        this.$el.html(this.template(this.contextData));
        if (revertToChild) {
            this.el = this.el.firstElementChild;
            this.$el = $(this.el);
        }
        if (autoSetupListeners) {
            this.setupListeners();
        }
    }
}

module.exports = BaseElement;