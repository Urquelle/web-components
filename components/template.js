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
            <div part="panel" class="panel" data-dom-name="panel"></div>
            <div part="options" class="options" data-dom-name="options">
                <slot></slot>
            </div>
        `;

        return result;
    },

    css(params) {
        let result = `
            <style>
                :host {
                    --element-width : 500px;

                    display         : inline-block;
                    position        : relative;
                    width           : var(--element-width);
                    background      : var(--bg-color);
                    color           : var(--fg-color);
                    border          : solid 1px var(--border-color);
                    border-radius   : var(--border-radius);
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
                    border-radius   : var(--border-radius);
                }
            </style>
        `;

        return result;
    }
}
