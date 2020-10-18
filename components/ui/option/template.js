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
            <slot></slot>
        `;

        return result;
    },

    css(params) {
        let result = `
            <style>
                :host {
                    display         : inline-block;
                    width           : 100%;
                    height          : var(--theme-ctrl-height);
                    line-height     : var(--theme-ctrl-height);
                    padding         : 0 var(--theme-padding);
                    border-style    : none;
                    user-select     : none;
                    outline         : none;
                    background      : var(--theme-bg);
                    color           : var(--theme-fg);
                    cursor          : pointer;
                    box-sizing      : border-box;
                    transition      : .4s;
                }

                :host(:hover) {
                    background      : var(--theme-ctrl-hover-bg);
                    color           : var(--theme-ctrl-hover-fg);
                    box-shadow      : 0 5px 5px -3px rgba(69, 98, 10, 0.2),
                                      0 8px 10px 1px rgba(69, 98, 10, 0.14),
                                      0 3px 14px 2px rgba(69, 98, 10, 0.12);
                }

                :host(:active) {
                    transform       : scale(.95);
                    transition      : .25s;
                }
            </style>
        `;

        return result;
    }
}


