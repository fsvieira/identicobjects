# objectfactory
    Javascript Object Factory for unique reference shared object creation.

    It creates unique objects references for same objects, since objects
    share references of unique objects inner equal objects will also share 
    same references, even if there father are not equal.

    All registered objects are read-only and therefor they can not be changed.

# install

`
    npm install objectfactory --save
`

# how to use

`
    const IdenticObjects = require("identicobjects");

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
    console.log(a, b, a.a.b.c[0] === b.a.b.c[0]); //  a.a.b.c[0] === b.a.b.c[0] = true

    // a and b are not equal,
    console.log(a, b, a === b); // a === b = false

    a.d = 1;

    // a is unchanged since a is read-only.
    console.log(JSON.stringify(a));
`

# Use cases

    * Comparing objects created on the fly or coming from different sources,
    * Use objects as unique key on a Map, or as a Set unique set value.

