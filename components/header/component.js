import Util     from "../util.js";
import Const    from "../constants.js";
import Dom      from "../dom.js";
import Template from "./template.js";

export default class Header extends HTMLElement {
    static get observedAttributes() {
        return ["title"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ( name === "title" ) {
            this.render();
        }
    }

    connectedCallback() {
        this.dom   = Dom.buildDom(this.root);
        this.slots = Dom.buildSlots(this.root);

        this.dom.user.onClick( e => this.onUserEvent(e) );
    }

    constructor() {
        super();

        this._user = null;

        this.root = this.attachShadow({mode: "open"});
        this.render();
    }

    render() {
        this.root.innerHTML = Template.render({
            title : this.title,
            user  : (this._user)
                ? `${this._user.username}`
                : "anmelden"
        });
    }

    get title() {
        return this.getAttribute("title");
    }

    set title(val) {
        this.setAttribute("title", val);
    }

    onUserEvent(e) {
        Util.dispatchPublicEvent("user-login", this, {
            username: "noob"
        });
    }
}

if ( !customElements.get("urq-header") ) {
    customElements.define("urq-header", Header);
}
