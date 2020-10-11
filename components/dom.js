export default {
    buildDom(scope) {
        let result = {};

        scope.querySelectorAll(":host > [data-dom-name], :scope > [data-dom-name]").forEach( elem => {
            elem.dom = this.buildDom(elem);
            result[elem.dataset["domName"]] = elem;
        });

        return result;
    },

    buildSlots(scope) {
        let result = {};
        let count  = 1;

        scope.querySelectorAll("slot").forEach(slot => {
            let name = slot.name;

            if ( !name ) {
                name = `$anon${count++}`;
            }

            result[name] = slot;
        });

        return result;
    }
}
