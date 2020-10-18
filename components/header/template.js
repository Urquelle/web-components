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
            <div class="container">
                <section class="logo"><img src="img/logo.svg"></section>
                <section class="title">~ ${params.title} ~</section>
                <section class="user" data-dom-name="user">
                    ${params.user}
                </section>
            </div>
        `;

        return result;
    },

    css(params) {
        let result = `
            <style>
                :host {
                    display               : block;
                    background            : var(--theme-wgt-bg);
                    color                 : var(--theme-wgt-fg);
                    box-shadow            : 0 1px 3px var(--theme-wgt-bg);
                    height                : 100%;
                }

                .container {
                    display               : grid;
                    height                : 100%;
                    grid-template-columns : 50px auto 150px;
                    grid-template-areas   : "logo title user";
                }

                .logo {
                    grid-area             : logo;
                    justify-self          : start;
                    align-self            : center;
                }

                .title {
                    grid-area             : title;
                    text-transform        : uppercase;
                    text-shadow           : 1px 1px 2px var(--theme-wgt-fg);
                    place-self            : center;
                    user-select           : none;
                }

                .user {
                    height                : 100%;
                    line-height           : 50px;
                    grid-area             : user;
                    justify-self          : end;
                    align-self            : center;
                    transition            : .4s;
                }

                .user:hover {
                    background            : var(--theme-wgt-hover-bg);
                    color                 : var(--theme-wgt-hover-fg);
                    cursor                : pointer;
                }
            </style>
        `;

        return result;
    }
}

