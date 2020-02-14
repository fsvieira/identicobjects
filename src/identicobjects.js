const sum = require("hash-sum");

class IdenticObjects {
    constructor() {
        this.objects = new Map();
    }

    get(o) {
        if (o instanceof Array) {
            const r = [];

            for (let i = 0; i < o.length; i++) {
                const v = this.get(o[i]);
                r.push(v);
            }

            o = r;
        }
        else if (o instanceof Object) {
            const r = {};
            for (let k in o) {
                r[k] = this.get(o[k]);
            }

            o = r;
        }

        const s = sum(o);
        const l = this.objects.get(s);

        Object.freeze(o);

        if (!l) {
            this.objects.set(s, new Set([o]));
        }
        else {
            for (let item of l) {
                if (this.isEqual(item, o)) {
                    return item;
                }
            }

            l.add(o);
        }

        return o;
    }

    isEqual(a, b) {
        const compare = [{ a, b }];

        while (compare.length) {
            const { a, b } = compare.pop();

            if (a !== b) {
                if (
                    (a instanceof Array && b instanceof Array)
                ) {
                    if (a.length === b.length) {
                        for (let i = 0; i < a.length; i++) {
                            compare.push({ a: a[i], b: b[i] });
                        }
                    }
                    else {
                        return false;
                    }
                }
                else if (a instanceof Object && b instanceof Object) {
                    const aKeys = Object.keys(a);
                    const bKeys = Object.keys(b);

                    if (aKeys.length === bKeys.length) {
                        aKeys.sort();
                        bKeys.sort();

                        for (let i = 0; i < aKeys.length; i++) {
                            const aKey = aKeys[i];
                            const bKey = bKeys[i];

                            if (aKey === bKey) {
                                compare.push({ a: a[aKey], b: b[bKey] });
                            }
                            else {
                                return false;
                            }
                        }
                    }
                }
                else if (
                    typeof a !== typeof b ||
                    typeof a === 'string' ||
                    typeof a === 'number'
                ) {
                    return false;
                }
                else if (
                    typeof a === 'number' &&
                    typeof b === 'number' &&
                    isNaN(a) && isNaN(b)) {
                    continue;
                }
                else {
                    return false;
                }
            }
        }

        return true;
    }
}

module.exports = IdenticObjects;
