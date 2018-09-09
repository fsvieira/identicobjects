const IdenticObjects = require("../src/identicobjects");

const objects = new IdenticObjects();
const a = objects.get({
    a: {
        b: {
            c: [{}]
        }
    }
});

const b = objects.get({
    a: {
        b: {
            c: [{}]
        }
    },
    b: []
});

const c = objects.get(1);
console.log(c); // print 1

// a and b, deep c field is equal,
console.log(a, b, a.a.b.c[0] === b.a.b.c[0]); // a.a.b.c[0] === b.a.b.c[0] = true

// a and b are not equal,
console.log(a, b, a === b); // a === b = false

a.d = 1;

// a is unchanged since a is read-only.
console.log(JSON.stringify(a));

