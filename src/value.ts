import {Properties} from "./properties";

export function Value(expression) {

    return (targetClass: any, attributeName: string) => {

        if (delete targetClass[attributeName]) {

            let value;

            Object.defineProperty(targetClass, attributeName, {

                get: function() {
                    value = value !== undefined ? value : Properties.initialize().get(expression);
                    return value;
                },

                set: function(v) {
                    value = v;
                },

                enumerable: true,
                configurable: true
            });
        }

    };
}