export default {
    render(params) {
        let result = `
            ${this.html(params)}
            ${this.css(params)}
        `;

        return result;
    },

    html(params) {
        let result = `
            <div class="container" data-dom-name="container">
                <div part="panel" class="panel" data-dom-name="panel"></div>
                <input non-clickable data-dom-name="filter" placeholder="${params.filter_placeholder}" type="text" class="filter">
                <div part="options" class="options" data-dom-name="options">
                    <slot></slot>
                </div>
            </div>
        `;

        return result;
    },

    css(params) {
        let result = `
            <style>
                :host {
                    display         : inline-block;
                    position        : relative;
                    width           : 300px;
                    background      : var(--bg-color);
                    color           : var(--fg-color);
                    height          : var(--controls-height-lg);
                    border-radius   : var(--border-radius);
                    user-select     : none;
                    outline         : none;
                }

                :host(:focus) .container {
                    box-shadow      : var(--box-shadow);
                }

                .container {
                    position        : absolute;
                    width           : 100%;
                    border-style    : var(--border-style);
                    border-width    : var(--border-width);
                    border-color    : var(--border-color);
                    border-radius   : var(--border-radius);
                    z-index         : 1;
                }

                .panel {
                    position        : relative;
                    width           : 100%;
                    height          : var(--controls-height-lg);
                    line-height     : var(--controls-height-lg);
                    text-indent     : var(--padding-xl);
                    color           : var(--fg-color);
                    background      : var(--bg-color);
                    font-size       : var(--text-lg);
                    border-radius   : var(--border-radius);
                }

                .panel:before {
                    position        : absolute;
                    content         : "";
                    right           : 20px;
                    top             : calc(var(--controls-height-lg) / 2 - 2px);
                    height          : 2px;
                    width           : 5px;
                    background      : var(--fg-color);
                    transform       : skew(0deg, 25deg);
                }

                .panel:after {
                    position        : absolute;
                    content         : "";
                    right           : 15px;
                    top             : calc(var(--controls-height-lg) / 2 - 2px);
                    height          : 2px;
                    width           : 5px;
                    background      : var(--fg-color);
                    transform       : skew(0deg, -25deg);
                }

                .options {
                    display         : none;
                    position        : relative;
                    width           : 100%;
                    background      : var(--bg-color);
                    color           : var(--fg-color);
                    font-size       : var(--text-lg);
                    border-radius   : 0 0 var(--border-radius) var(--border-radius);
                    overflow        : hidden;
                }

                .filter {
                    width           : 100%;
                    height          : var(--controls-height-m);
                    line-height     : var(--controls-height-m);
                    font-size       : var(--text-lg);
                    text-indent     : var(--padding-xl);
                    color           : var(--fg-color);
                    background      : var(--bg-color);
                    border-width    : var(--border-width);
                    border-color    : var(--fg-color);
                    border-style    : solid none;
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

                ::slotted(option:last-child) {
                    border-radius   : 0 0 var(--border-radius) var(--border-radius);
                }

                ::slotted(option:hover) {
                    background      : var(--bg-color-inv);
                    color           : var(--fg-color-inv);
                }

                ::slotted(option.active) {
                    background      : var(--bg-color-hl);
                    color           : var(--fg-color-hl);
                }
            </style>
        `;

        return result;
    }
}
