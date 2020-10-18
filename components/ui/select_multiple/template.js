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
                <input tabindex="-1" class="filter" data-dom-name="filter" type="text" placeholder="${params.filter_placeholder}">
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
                    display         : inline-block;
                    position        : relative;
                    width           : 300px;
                    background      : var(--theme-bg);
                    color           : var(--theme-fg);
                    border-radius   : var(--border-radius);
                    user-select     : none;
                    outline         : none;
                }

                :host(:focus) .container {
                    box-shadow      : var(--theme-box-shadow);
                }

                input {
                    font-family     : var(--theme-font-family);
                    font-size       : var(--theme-font-size);
                }

                .container .filter::selection {
                    background      : var(--theme-ctrl-bg);
                    color           : var(--theme-ctrl-fg);
                }

                .container {
                    position        : relative;
                    background      : var(--theme-bg);
                    color           : var(--theme-fg);
                    border-style    : var(--border-style);
                    border-width    : var(--border-width);
                    border-color    : var(--theme-ctrl-bg);
                    border-radius   : var(--border-radius);
                    transition      : .4s;
                    overflow        : hidden;
                }

                .container:hover {
                    box-shadow      : var(--theme-box-shadow);
                }

                .options {
                    border-radius   : 0 0 var(--border-radius) var(--border-radius);
                    overflow        : hidden;
                }

                .filter {
                    width           : 100%;
                    height          : var(--theme-ctrl-height);
                    line-height     : var(--theme-ctrl-height);
                    border-radius   : var(--border-radius) var(--border-radius) 0 0;
                    text-indent     : var(--padding-xl);
                    background      : var(--theme-bg);
                    color           : var(--theme-fg);
                    border-style    : none;
                    box-sizing      : border-box;
                    outline         : none;
                }

                ::slotted(*.selected) {
                    background      : var(--theme-ctrl-bg);
                    color           : var(--theme-ctrl-fg);
                }

                ::slotted(*.active) {
                    text-decoration : underline;
                }

                ::slotted(*.dragenter) {
                    background      : var(--theme-ctrl-active-bg);
                    color           : var(--theme-ctrl-active-fg);
                }
            </style>
        `;
    }
}
