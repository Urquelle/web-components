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
                <input non-clickable tabindex="-1" data-dom-name="filter" placeholder="${params.filter_placeholder}" type="text" class="filter">
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
                    height          : var(--theme-ctrl-height);
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
                    position        : absolute;
                    width           : 100%;
                    border-style    : var(--border-style);
                    border-width    : var(--border-width);
                    border-color    : var(--theme-ctrl-bg);
                    border-radius   : var(--border-radius);
                    background      : var(--theme-ctrl-bg);
                    cursor          : pointer;
                    transition      : .4s;
                    overflow        : hidden;
                    z-index         : 1;
                }

                .container:hover {
                    border-color    : var(--theme-ctrl-hover-bg);
                    box-shadow      : var(--theme-box-shadow);
                }

                .container:hover .panel {
                    background      : var(--theme-ctrl-hover-bg);
                }

                .panel {
                    position        : relative;
                    width           : 100%;
                    height          : var(--theme-ctrl-height);
                    line-height     : var(--theme-ctrl-height);
                    text-indent     : var(--padding-xl);
                    background      : var(--theme-ctrl-bg);
                    color           : var(--theme-ctrl-fg);
                    border-radius   : var(--border-radius) var(--border-radius) 0 0;
                    transition      : .4s;
                }

                .panel:before {
                    position        : absolute;
                    content         : "";
                    right           : 20px;
                    top             : calc(var(--theme-ctrl-height) / 2 - 2px);
                    height          : 2px;
                    width           : 5px;
                    background      : var(--theme-ctrl-fg);
                    transform       : skew(0deg, 25deg);
                }

                .panel:after {
                    position        : absolute;
                    content         : "";
                    right           : 16px;
                    top             : calc(var(--theme-ctrl-height) / 2 - 2px);
                    height          : 2px;
                    width           : 5px;
                    background      : var(--theme-ctrl-fg);
                    transform       : skew(0deg, -25deg);
                }

                .options {
                    display         : none;
                    position        : relative;
                    width           : 100%;
                    background      : var(--theme-bg);
                    color           : var(--theme-fg);
                    border-radius   : 0 0 var(--border-radius) var(--border-radius);
                    overflow-y      : auto;
                    overflow-x      : hidden;
                }

                .filter {
                    height          : var(--theme-ctrl-height);
                    line-height     : var(--theme-ctrl-height);
                    text-indent     : var(--padding-xl);
                    color           : var(--theme-fg);
                    background      : var(--theme-bg);
                    width           : 100%;
                    border-style    : none;
                    box-sizing      : border-box;
                    outline         : none;
                }

                ::slotted(*.active) {
                    text-decoration : underline;
                }

                ::slotted(option.active) {
                    text-decoration : underline;
                }
            </style>
        `;

        return result;
    }
}
