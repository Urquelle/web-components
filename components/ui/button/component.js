import Util     from "../../util.js";
import Const    from "../../constants.js";
import Dom      from "../../dom.js";

import Template from "./template.js";

export default class Ui_Button extends HTMLElement {
    static get observedAttributes() {
        return ["name", "type", "flavor"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    connectedCallback() {
        if ( !this.hasAttribute("role") ) {
            this.setAttribute("role", "button");
        }

        if ( !this.hasAttribute('tabindex') ) {
            this.setAttribute('tabindex', 0);
        }
    }

    constructor() {
        super();

        this.root = this.attachShadow({mode: "open"});
        this.render();

        this.dom   = Dom.buildDom(this.root);
        this.slots = Dom.buildSlots(this.root);
    }

    render() {
        this.root.innerHTML = Template.render({
            flavor: this.flavor
        });
    }

    set name(val) {
        this.setAttribute("name", val);
    }

    get name() {
        return this.getAttribute("name");
    }

    set type(val) {
        this.setAttribute("type", val);
    }

    get type() {
        return this.getAttribute("type");
    }

    set flavor(val) {
        this.setAttribute("flavor", val);
    }

    get flavor() {
        return this.getAttribute("flavor");
    }
}

if ( !customElements.get("urq-ui-button") ) {
    customElements.define("urq-ui-button", Ui_Button);
}
