export default {
    buildDom(scope) {
        let result = {};

        scope.querySelectorAll(":host [data-dom-name], :scope [data-dom-name]").forEach( elem => {
            result[elem.dataset["domName"]] = elem;
            injectProcs(elem);
        });

        return result;
    },

    buildSlots(scope) {
        let result = {};
        let count  = 1;

        scope.querySelectorAll("slot").forEach(slot => {
            injectProcs(slot);
            slot.slotNodes = slot.assignedNodes().filter(n => n.classList != null);

            let name = slot.name;

            if ( !name ) {
                name = `$anon${count++}`;
            }

            slot.slotNodes.forEach( node => injectProcs(node) );

            result[name] = slot;
        });

        return result;
    },
}

function injectProcs(elem) {
    elem.show = function() {
        elem.style.display = "block";
    }

    elem.hide = function() {
        elem.style.display = "none";
    }

    elem.on = function(event, callback) {
        this.addEventListener(event, callback);
    }

    elem.onClick = function(callback) {
        this.on("click", callback);
    }

    elem.onInput = function(callback) {
        this.on("input", callback);
    }
}
