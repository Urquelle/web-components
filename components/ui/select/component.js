import Util     from "../../util.js";
import Const    from "../../constants.js";
import Dom      from "../../dom.js";

import Template from "./template.js";

export default class Ui_Select extends HTMLElement {
    static get observedAttributes() {
        return ["name", "value", "expanded", "filter"];
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
        this.setupEvents();

        this.active_item = -1;
    }

    setupEvents() {
        this.slots.$anon1.slotNodes.forEach(node => {
            node.on("change", e => {
                if ( node.value === this.value ) {
                    this.setActive(node.value, node.innerHTML);
                    return;
                }
            });
        });

        this.addEventListener("blur", e => {
            this.expanded = false;
        });

        this.addEventListener("keyup", this.onKeyup);

        this.dom.panel.onClick( e => this.onPanelEvent(e) );
        this.dom.options.onClick(e => this.onOptionsEvent(e) );
        this.dom.filter.onInput(e => {
            this.slots.$anon1.slotNodes.forEach(opt => {
                let pattern = this.dom.filter.value.split("").join(".*");

                if ( !e.originalTarget.value || opt.innerHTML.match(pattern) ) {
                    opt.style.display = "block";
                } else {
                    opt.style.display = "none";
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
    }

    set name(val) {
        this.setAttribute("name", val);
    }

    get name() {
        return this.getAttribute("name");
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

        let max_height = window.innerHeight - this.dom.options.getBoundingClientRect().y - 10;
        this.dom.options.style.maxHeight = `${max_height}px`;
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
            case Const.KEY_J:
            case Const.KEY_ARROW_DOWN: {
                if ( this.expanded === true ) {
                    let nodes = this.slots.$anon1.slotNodes;
                    this.active_item = Math.min(this.active_item + 1, nodes.length - 1);
                    this.renderActiveItem();
                } else {
                    this.expanded = true;
                }
            } break;

            case Const.KEY_K:
            case Const.KEY_ARROW_UP: {
                if ( this.expanded === true ) {
                    let nodes = this.slots.$anon1.slotNodes;
                    this.active_item = Math.max(this.active_item - 1, 0);
                    this.renderActiveItem();
                } else {
                    this.expanded = true;
                }
            } break;

            case Const.KEY_RETURN: {
                if ( this.expanded ) {
                    let nodes = this.slots.$anon1.slotNodes;

                    if ( this.active_item >= 0 ) {
                        let node = nodes[this.active_item];
                        this.setActive(node.value, node.innerHTML);
                        this.dom.filter.blur();
                        this.expanded = false;
                    }
                } else {
                    this.expanded = true;
                }
            } break;

            case Const.KEY_F: {
                this.dom.filter.focus();
            } break;

            case Const.KEY_ESC: {
                this.dom.filter.blur();
                this.expanded = false;
            } break;
        }
    }

    setActive(value, text) {
        this.value               = value;
        this.dom.panel.innerHTML = text;

        Util.dispatchPublicEvent("change", this.root, {
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

if ( !customElements.get("urq-ui-select") ) {
    customElements.define("urq-ui-select", Ui_Select);
}
