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
                    height          : var(--theme-ctrl-height);
                    line-height     : var(--theme-ctrl-height);
                    padding         : 0 var(--theme-padding);
                    border-style    : none;
                    border-radius   : var(--border-radius);
                    user-select     : none;
                    outline         : none;
                    background      : var(--theme-ctrl-bg);
                    color           : var(--theme-ctrl-fg);
                    text-transform  : uppercase;
                    text-align      : center;
                    cursor          : pointer;
                    transition      : .4s;
                }

                :host(:focus) {
                    box-shadow      : var(--theme-box-shadow);
                }

                :host(:hover) {
                    background      : var(--theme-ctrl-hover-bg);
                    color           : var(--theme-ctrl-hover-fg);
                    box-shadow      : var(--theme-box-shadow);
                }

                :host(:active) {
                    transform       : scale(.95);
                    transition      : .25s;
                }

                :host([flavor=outline]) {
                    background      : var(--theme-bg);
                    color           : var(--theme-ctrl-bg);
                    border          : solid 1px var(--theme-ctrl-bg);
                }

                :host([flavor=text]) {
                    background      : var(--theme-bg);
                    color           : var(--theme-ctrl-bg);
                }
            </style>
        `;

        return result;
    }
}

