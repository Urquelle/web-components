export default {
    toBool(val) {
        if ( typeof val === "boolean" ) return val;

        if ( typeof val === "string" ) {
            if ( val === "true" ) return true;
            if ( val === "false" ) return false;
        }

        if ( typeof val === "number") return val != 0;

        return false;
    },

    rectContains(rect, point) {
        let x_min = rect.left;
        let x_max = x_min + rect.width;

        let y_min = rect.top;
        let y_max = y_min + rect.height;

        if ( point.x < x_min || point.x > x_max ||
             point.y < y_min || point.y > y_max )
        {
            return false;
        }

        return true;
    },

    dispatchPrivateEvent(name, scope, detail) {
        let event = new CustomEvent(name, {
            bubbles  : true,
            detail   : detail
        });

        scope.dispatchEvent(event);
    },

    dispatchPublicEvent(name, scope, detail) {
        let event = new CustomEvent(name, {
            bubbles  : true,
            composed : true,
            detail   : detail
        });

        scope.dispatchEvent(event);
    }
}
