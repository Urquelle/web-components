import Util     from "../util.js";
import Const    from "../constants.js";
import Dom      from "../dom.js";
import Template from "./template.js";

import Ui_Button          from "../ui/button/component.js";
import Ui_Select          from "../ui/select/component.js";
import Ui_Select_Multiple from "../ui/select_multiple/component.js";

import Header             from "../header/component.js";

export default class App extends HTMLElement {
    static get observedAttributes() {
        return [ "title" ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    connectedCallback() {
    }

    constructor() {
        super();

        this.root = this.attachShadow({mode: "open"});
        this.render();

        this.dom   = Dom.buildDom(this.root);
        this.slots = Dom.buildSlots(this.root);

        this.dom.header.on("user-login", e => {
            console.log("benutzer angemeldet");
        });
    }

    render() {
        this.root.innerHTML = Template.render({
            title: this.title
        });
    }

    set title(val) {
        this.setAttribute("title", val);
    }

    get title() {
        return this.getAttribute("title");
    }
}

if ( !customElements.get("urq-app") ) {
    customElements.define("urq-app", App);
}
