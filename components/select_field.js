import Util     from "./util.js";
import Template from "./template.js";
import Dom      from "./dom.js";

export default class Select_Field extends HTMLElement {
    static get observedAttributes() {
        return ["value", "expanded"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ( name === "expanded" ) {
            this.renderOptions();
        }
    }

    connectedCallback() {
        if ( !this.expanded ) {
            this.expanded = false;
        }
    }

    constructor() {
        super();

        this.root = this.attachShadow({mode: "open"});
        this.root.innerHTML = Template.render();

        this.dom   = Dom.buildDom(this.root);
        this.slots = Dom.buildSlots(this.root);

        this.dom.panel.addEventListener("click", e => this.onPanelEvent(e) );
        this.dom.options.addEventListener("click", e => this.onOptionsEvent(e) );

        this.slots.$anon1.assignedNodes().forEach(node => {
            if ( node.tagName === "OPTION" && node.value === this.value ) {
                this.setActive(node.value, node.innerHTML);
                return;
            }
        });

        document.addEventListener("click", e => {
            let rect  = this.getBoundingClientRect();
            let coord = { x: e.clientX, y: e.clientY };

            if ( Util.rectContains(rect, coord) === false ) {
                this.expanded = false;
            }
        });
    }

    set value(val) {
        this.setAttribute("value", val);
    }

    get value() {
        return this.getAttribute("value");
    }

    set expanded(val) {
        this.setAttribute("expanded", val);
    }

    get expanded() {
        let result = this.getAttribute("expanded");

        return Util.toBool(result);
    }

    onPanelEvent(e) {
        if ( e.type === "click" ) {
            this.expanded = !this.expanded;
        }
    }

    onOptionsEvent(e) {
        if ( e.type === "click" ) {
            if ( !e.target.hasAttribute("non-clickable") ) {
                this.setActive(e.target.value, e.target.innerHTML);
                this.expanded = false;
            }
        }
    }

    renderOptions() {
        let state = ( this.expanded === true ) ? "block" : "none";
        this.dom.options.style.display = state;
    }

    setActive(value, text) {
        this.value               = value;
        this.dom.panel.innerHTML = text;

        Util.dispatchPublicEvent("changed", this.root, {
            value: value,
            text: text
        });
    }
}

customElements.define("select-field", Select_Field);
