import Util     from "../util.js";
import Keys     from "../keys.js";
import Dom      from "../dom.js";
import Template from "./template.js";

export default class Select_Field extends HTMLElement {
    static get observedAttributes() {
        return ["value", "expanded", "filter"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ( name === "expanded" ) {
            this.renderOptions();
            this.renderFilter();
        }

        if ( name === "filter" ) {
            this.renderFilter();
        }
    }

    connectedCallback() {
        if ( !this.hasAttribute("role") ) {
            this.setAttribute("role", "select");
        }

        if ( !this.hasAttribute('tabindex') ) {
            this.setAttribute('tabindex', 0);
        }

        if ( !this.expanded ) {
            this.expanded = false;
        }
    }

    constructor() {
        super();

        this.root = this.attachShadow({mode: "open"});
        this.render();

        this.dom   = Dom.buildDom(this.root);
        this.slots = Dom.buildSlots(this.root);
        this.slots.$anon1.slotNodes = this.slots.$anon1.assignedNodes().filter(n => n.classList != null);

        this.slots.$anon1.slotNodes.forEach(node => {
            if ( node.tagName === "OPTION" && node.value === this.value ) {
                this.setActive(node.value, node.innerHTML);
                return;
            }
        });

        this.dom.panel.addEventListener("click", e => this.onPanelEvent(e) );
        this.dom.options.addEventListener("click", e => this.onOptionsEvent(e) );
        this.addEventListener("keyup", this.onKeyup);
        this.dom.filter.addEventListener("input", e => {
            this.slots.$anon1.slotNodes.forEach(opt => {
                if ( opt.tagName === "OPTION" ) {
                    let pattern = e.originalTarget.value.split("").join(".*");

                    if ( !e.originalTarget.value || opt.innerHTML.match(pattern) ) {
                        opt.style.display = "block";
                    } else {
                        opt.style.display = "none";
                    }
                }
            });
        });

        document.addEventListener("click", e => {
            let rect  = this.dom.container.getBoundingClientRect();
            let coord = { x: e.clientX, y: e.clientY };

            if ( Util.rectContains(rect, coord) === false ) {
                this.expanded = false;
            }
        });

        this.active_item = -1;
    }

    set value(val) {
        this.setAttribute("value", val);
    }

    get value() {
        return this.getAttribute("value");
    }

    set expanded(val) {
        if ( this.disabled ) {
            return;
        }

        this.setAttribute("expanded", val);
        this.active_item = -1;
        this.renderActiveItem();
    }

    get expanded() {
        let result = this.getAttribute("expanded");

        return Util.toBool(result);
    }

    set disabled(val) {
        if ( val ) {
            this.setAttribute("disabled", "");
        } else {
            this.removeAttribute("disabled");
        }
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }

    set filter(val) {
        this.setAttribute("filter", val);
    }

    get filter() {
        let result = this.getAttribute("filter");

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

    onKeyup(e) {
        switch ( e.keyCode ) {
            case Keys.KEY_ARROW_DOWN:
            case Keys.KEY_ARROW_UP: {
                if ( this.expanded === true ) {
                    let nodes = this.slots.$anon1.slotNodes;

                    if ( e.keyCode == Keys.KEY_ARROW_DOWN ) {
                        this.active_item = Math.min(this.active_item + 1, nodes.length - 1);
                    } else {
                        this.active_item = Math.max(this.active_item - 1, 0);
                    }

                    this.renderActiveItem();
                } else {
                    this.expanded = true;
                }
            } break;

            case Keys.KEY_RETURN: {
                if ( this.expanded ) {
                    let nodes = this.slots.$anon1.slotNodes;

                    if ( this.active_item >= 0 ) {
                        let node = nodes[this.active_item];
                        this.setActive(node.value, node.innerHTML);
                        this.expanded = false;
                    }
                } else {
                    this.expanded = true;
                }
            } break;

            case Keys.KEY_F: {
                this.dom.filter.focus();
            } break;

            case Keys.KEY_ESC: {
                this.expanded = false;
            } break;
        }
    }

    setActive(value, text) {
        this.value               = value;
        this.dom.panel.innerHTML = text;

        Util.dispatchPublicEvent("changed", this.root, {
            value: value,
            text: text
        });
    }

    renderOptions() {
        let state = ( this.expanded === true ) ? "block" : "none";
        this.dom.options.style.display = state;
    }

    renderFilter() {
        let state = ( this.expanded === true && this.filter === true ) ? "block" : "none";
        this.dom.filter.style.display = state;
    }

    renderActiveItem() {
        let nodes = this.slots.$anon1.slotNodes;
        let count = 0;

        nodes.forEach(node => {
            if ( count !== this.active_item ) {
                node.classList.remove("active");
            } else {
                node.classList.add("active");
            }

            count += 1;
        });
    }

    render() {
        this.root.innerHTML = Template.render({
            filter_placeholder : "'f' drücken um zu filtern",
        });
    }
}

if ( !customElements.get("select-field") ) {
    customElements.define("select-field", Select_Field);
}
