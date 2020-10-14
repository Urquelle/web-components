import Util     from "../util.js";
import Keys     from "../keys.js";
import Dom      from "../dom.js";
import Template from "./template.js";

export default class Select_Multiple_Field extends HTMLElement {
    static get formAssociated() {
        return true;
    }

    static get observedAttributes() {
        return ["value", "filter"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ( name === "value" ) {
            this._value = newValue.split(",");
            this.renderOptions();
        }

        if ( name === "filter" ) {
            this.renderFilter();
        }
    }

    connectedCallback() {
        if ( !this.hasAttribute('tabindex') ) {
            this.setAttribute('tabindex', 0);
        }

        if ( !this._value ) {
            this._value = [];
        }
    }

    constructor() {
        super();

        this.root = this.attachShadow({ mode: "open" });
        this.render();

        this.dom   = Dom.buildDom(this.root);
        this.slots = Dom.buildSlots(this.root);
        this.slots.$anon1.slotNodes =
            this.slots.$anon1.assignedNodes().filter(n => n.classList != null);

        this.addEventListener("keyup", this.onKeyup);
        this.slots.$anon1.slotNodes.forEach(node => {
            node.setAttribute("draggable", true);

            node.addEventListener("dragstart", e => {
                if ( this.disabled ) {
                    return;
                }

                this._dragItem = node;
                e.dataTransfer.effectAllowed = "move";
            });

            node.addEventListener("dragenter", e => {
                node.classList.add("dragenter");
            });

            node.addEventListener("dragleave", e => {
                node.classList.remove("dragenter");
            });
        });

        this.dom.options.addEventListener("dragover", e => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";

            return false;
        });

        this.dom.options.addEventListener("drop", e => {
            e.stopPropagation();
            e.target.classList.remove("dragenter");

            let target_elem = e.target;
            let temp_elem   = target_elem.cloneNode(true);
            let source_elem = this._dragItem;

            if ( !source_elem || source_elem === target_elem ) {
                return false;
            }

            let source_html = source_elem.innerHTML;
            let target_html = target_elem.innerHTML;

            target_elem.innerHTML = source_html;
            target_elem.classList = source_elem.classList;
            target_elem.value     = source_elem.value;

            source_elem.innerHTML = target_html;
            source_elem.classList = temp_elem.classList;
            source_elem.value     = temp_elem.value;

            this._dragItem = null;
        });

        this.dom.filter.addEventListener("input", e => {
            this.slots.$anon1.slotNodes.forEach(opt => {
                let pattern = e.target.value.split("").join(".*");

                if ( !e.target.value || opt.innerHTML.match(pattern) ) {
                    opt.style.display = "block";
                } else {
                    opt.style.display = "none";
                }
            });
        });

        this.dom.options.addEventListener("click", e => this.onOptionsEvent(e) );

        this.active_row = -1;
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

    get value() {
        return this._value;
    }

    set value(val) {
        this.setAttribute("value", val);
    }

    get filter() {
        let result = Util.toBool(this.getAttribute("filter"));

        return result;
    }

    set filter(val) {
        this.setAttribute(val);
    }

    onOptionsEvent(e) {
        this.toggleEntry(e.target.value);
        this.renderOptions();
    }

    onKeyup(e) {
        switch ( e.keyCode ) {
            case Keys.KEY_ARROW_DOWN:
            case Keys.KEY_ARROW_UP: {
                let nodes = this.slots.$anon1.slotNodes;

                if ( e.keyCode == Keys.KEY_ARROW_DOWN ) {
                    this.active_row = Math.min(this.active_row + 1, nodes.length - 1);
                } else {
                    this.active_row = Math.max(this.active_row - 1, 0);
                }

                this.renderActiveItem();
            } break;

            case Keys.KEY_SPACE: {
                this.toggleEntry(this.slots.$anon1.slotNodes[this.active_row].value);
                this.renderOptions();
                this.renderActiveItem();
            } break;

            case Keys.KEY_RETURN: {
                this.toggleEntry(this.slots.$anon1.slotNodes[this.active_row].value);
                this.active_row = -1;
                this.renderOptions();
                this.renderActiveItem();
            } break;

            case Keys.KEY_ESC: {
                this.active_row = -1;
                this.renderActiveItem();
            } break;

            case Keys.KEY_F: {
                this.dom.filter.focus();
            } break;
        }
    }

    renderOptions() {
        this.slots.$anon1.slotNodes.forEach(node => {
            if ( this._value.includes(node.value) ) {
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

    renderActiveItem() {
        let nodes = this.slots.$anon1.slotNodes;
        let count = 0;

        nodes.forEach(node => {
            if ( count !== this.active_row ) {
                node.classList.remove("active");
            } else {
                node.classList.add("active");
            }

            count += 1;
        });
    }

    renderFilter() {
        let state = ( this.filter === true ) ? "block" : "none";
        this.dom.filter.style.display = state;
    }

    render() {
        this.root.innerHTML = Template.render({
            filter_placeholder: "'f' drücken um zu filtern"
        });
    }

    toggleEntry(val) {
        if ( this._value.includes(val) ) {
            this._value = this._value.filter(value => value != val);
        } else {
            this._value.push(val);
        }
    }
}

if ( !customElements.get("select-multiple-field") ) {
    customElements.define("select-multiple-field", Select_Multiple_Field);
}
