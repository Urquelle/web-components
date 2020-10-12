import Util     from "../util.js";
import Dom      from "../dom.js";
import Template from "./template.js";

export default class Select_Multiple_Field extends HTMLElement {
    static get formAssociated() {
        return true;
    }

    static get observedAttributes() {
        return ["values", "filter"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ( name === "values" ) {
            this._values = newValue.split(",");
            this.renderOptions();
        }

        if ( name === "filter" ) {
            this.renderFilter();
        }
    }

    connectedCallback() {
        if ( !this.expanded ) {
            this.expanded = false;
        }

        if ( !this._values ) {
            this._values = [];
        }
    }

    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });
        this.render();

        this.dom   = Dom.buildDom(this.root);
        this.slots = Dom.buildSlots(this.root);

        this.dom.options.addEventListener("click", e => this.onOptionsEvent(e) );

        this.dom.filter.addEventListener("input", e => {
            this.slots.$anon1.assignedNodes().forEach(opt => {
                if ( opt.tagName === "OPTION" ) {
                    let pattern = e.target.value.split("").join(".*");

                    if ( !e.target.value || opt.innerHTML.match(pattern) ) {
                        opt.style.display = "block";
                    } else {
                        opt.style.display = "none";
                    }
                }
            });
        });
    }

    get values() {
        return this._values;
    }

    set values(val) {
        this.setAttribute("values", val);
    }

    get filter() {
        let result = Util.toBool(this.getAttribute("filter"));

        return result;
    }

    set filter(val) {
        this.setAttribute(val);
    }

    onOptionsEvent(e) {
        if ( this._values.includes(e.target.value) ) {
            this._values = this._values.filter(value => value != e.target.value);
        } else {
            this._values.push(e.target.value);
        }

        this.renderOptions();
    }

    renderOptions() {
        this.slots.$anon1.assignedNodes().forEach(node => {
            if ( this._values.includes(node.value) ) {
                if ( node.classList ) {
                    node.classList.add("selected");
                }
            } else {
                if ( node.classList ) {
                    node.classList.remove("selected");
                }
            }
        });
    }

    renderFilter() {
        let state = ( this.filter === true ) ? "block" : "none";
        this.dom.filter.style.display = state;
    }

    render() {
        this.root.innerHTML = Template.render({
            filter_placeholder: "tippen"
        });
    }
}

if ( !customElements.get("select-multiple-field") ) {
    customElements.define("select-multiple-field", Select_Multiple_Field);
}
