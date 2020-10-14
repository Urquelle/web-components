export default {
    render(params) {
        return `
            ${this.html(params)}
            ${this.css(params)}
        `;
    },

    html(params) {
        return `
            <div class="container" data-dom-name="container">
                <input class="filter" data-dom-name="filter" type="text" placeholder="${params.filter_placeholder}">
                <div class="options" data-dom-name="options">
                    <slot></slot>
                </div>
            </div>
        `;
    },

    css(params) {
        return `
            <style>
                :host {
                    position        : relative;
                    display         : inline-block;
                    width           : 500px;
                    background      : var(--bg-color);
                    color           : var(--fg-color);
                    box-shadow      : var(--box-shadow);
                    border-radius   : var(--border-radius);
                    user-select     : none;
                    outline         : none;
                }

                :host(:focus) .container {
                    box-shadow      : var(--box-shadow);
                }

                .container {
                    position        : relative;
                    border-style    : var(--border-style);
                    border-width    : var(--border-width);
                    border-color    : var(--border-color);
                    border-radius   : var(--border-radius);
                }

                .options {
                    border-radius   : 0 0 var(--border-radius) var(--border-radius);
                    overflow        : hidden;
                }

                .filter {
                    width           : 100%;
                    height          : var(--controls-height-m);
                    line-height     : var(--controls-height-m);
                    font-size       : var(--text-lg);
                    border-style    : none;
                    border-radius   : var(--border-radius) var(--border-radius) 0 0;
                    text-indent     : var(--padding-xl);
                    color           : var(--fg-color);
                    background      : var(--bg-color);
                    box-sizing      : border-box;
                    outline         : none;
                }

                ::slotted(option) {
                    width           : 100%;
                    height          : var(--controls-height-lg);
                    text-indent     : var(--padding-xl);
                    color           : var(--fg-color);
                    padding         : 10px 0;
                    font-size       : var(--text-lg);
                    box-sizing      : border-box;
                }

                ::slotted(option.selected) {
                    background      : var(--bg-color-inv);
                    color           : var(--fg-color-inv);
                }

                ::slotted(option.active) {
                    background      : var(--bg-color-hl);
                    color           : var(--fg-color-hl);
                }

                ::slotted(option.dragenter) {
                    background      : var(--bg-color-hl);
                    color           : var(--fg-color-hl);
                }
            </style>
        `;
    }
}
