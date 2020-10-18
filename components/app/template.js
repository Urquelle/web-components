import Ui_Option from "../ui/option/component.js";

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
                <header>
                    <urq-header title="${params.title}" data-dom-name="header"></urq-header>
                </header>
                <main>
                    <form method="get" action="">
                        <urq-ui-select name="t" value="2" expanded="false" filter="true">
                            <urq-ui-option value="1">eins</urq-ui-option>
                            <urq-ui-option value="2">zwei</urq-ui-option>
                            <urq-ui-option value="3">drei</urq-ui-option>
                            <urq-ui-option value="4">vier</urq-ui-option>
                            <urq-ui-option value="5">fünf</urq-ui-option>
                            <urq-ui-option value="6">sechs</urq-ui-option>
                            <urq-ui-option value="7">sieben</urq-ui-option>
                            <urq-ui-option value="8">acht</urq-ui-option>
                            <urq-ui-option value="9">neun</urq-ui-option>
                            <urq-ui-option value="10">zehn</urq-ui-option>
                        </urq-ui-select>
                        <urq-ui-select-multiple value="1,3" filter="true">
                            <urq-ui-option value="1">eins</urq-ui-option>
                            <urq-ui-option value="2">zwei</urq-ui-option>
                            <urq-ui-option value="3">drei</urq-ui-option>
                            <urq-ui-option value="4">vier</urq-ui-option>
                            <urq-ui-option value="5">fünf</urq-ui-option>
                            <urq-ui-option value="6">sechs</urq-ui-option>
                            <urq-ui-option value="7">sieben</urq-ui-option>
                            <urq-ui-option value="8">acht</urq-ui-option>
                            <urq-ui-option value="9">neun</urq-ui-option>
                            <urq-ui-option value="10">zehn</urq-ui-option>
                        </urq-ui-select-multiple>
                        <br>
                        <urq-ui-button type="submit">senden</urq-ui-button>
                        <urq-ui-button flavor="text">mehr</urq-ui-button>
                        <urq-ui-button flavor="outline" type="reset">abbrechen</urq-ui-button>
                    </form>
                </main>
                <footer>
                    <urq-footer>footer</urq-footer>
                </footer>
            </div>
        `;

        return result;
    },

    css(params) {
        let result = `
            <style>
                :host {
                    background            : var(--theme-bg);
                    color                 : var(--theme-fg);
                }

                .container {
                    display               : grid;
                    height                : 100vh;

                    grid-template-columns : 1fr;
                    grid-template-rows    : 50px auto 200px;
                    grid-template-areas   :
                                            "header"
                                            " main "
                                            "footer"
                    ;
                }

                header {
                    grid-area             : header;
                }

                main {
                    grid-area             : main;
                    width                 : 800px;
                    margin                : 15px auto;
                }

                footer {
                    grid-area             : footer;
                    background            : var(--theme-wgt-bg);
                    color                 : var(--theme-wgt-fg);
                    box-shadow            : 0 -1px 3px var(--theme-wgt-bg);
                    height                : 100%;
                }
            </style>
        `;

        return result;
    }
}
