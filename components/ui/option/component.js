import Util     from "../../util.js";
import Const    from "../../constants.js";
import Dom      from "../../dom.js";

import Template from "./template.js";

export default class Ui_Option extends HTMLElement {
    static get observedAttributes() {
        return [ "value" ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ( name === "value" ) {
            Util.dispatchPublicEvent("change", this);
        }
    }

    connectedCallback() {
        if ( !this.hasAttribute("role") ) {
            this.setAttribute("role", "option");
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
        this.root.innerHTML = Template.render();
    }

    set value(val) {
        this.setAttribute("value", val);
    }

    get value() {
        return this.getAttribute("value");
    }
}

if ( !customElements.get("urq-ui-option") ) {
    customElements.define("urq-ui-option", Ui_Option);
}

