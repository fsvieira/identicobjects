const IdenticObjects = require('../src/identicobjects');

test('simple object', () => {
    const io = new IdenticObjects();

    const test1 = { test: 1 };

    const a = io.get(test1);
    const b = io.get(test1);

    expect(a).toBe(b);
    expect(a).toEqual(test1);

});

test('array with repeated object elements', () => {
    const io = new IdenticObjects();

    const test1 = [{ d: 1 }, { d: 2 }, { d: 1 }];
    const test2 = [{ d: 1 }, { d: 2 }, { d: 2 }];

    const a = io.get(test1);
    const b = io.get(test2);

    expect(a).toEqual(test1);
    expect(b).toEqual(test2);

});

test('object same number of keys but different keys.', () => {
    const io = new IdenticObjects();

    const test1 = { a: 1, b: { two: 2 } };
    const test2 = { a: { two: 2 }, c: 1 };

    const a = io.get(test1);
    const b = io.get(test2);

    expect(a.b).toBe(b.a);
    expect(a.a).not.toBe(b.a);

    expect(a).toEqual(test1);
    expect(b).toEqual(test2);

});

test('array with different number of elements', () => {
    const io = new IdenticObjects();

    const test1 = [1, 2, 3];
    const test2 = [1, 2];

    const a = io.get(test1);
    const b = io.get(test2);

    expect(a).toEqual(test1);
    expect(b).toEqual(test2);

});


test('array with repeated object elements', () => {
    const io = new IdenticObjects();

    const test1 = [{ "variables": [39], "domain": [13] }, { "variables": [42], "domain": [13, 23] }, { "variables": [45], "domain": [13, 23] }];
    const test2 = [{ "variables": [39], "domain": [13] }, { "variables": [42], "domain": [13, 23] }, { "variables": [45], "domain": [13] }];

    const a = io.get(test1);
    const b = io.get(test2);

    expect(a).toEqual(test1);
    expect(b).toEqual(test2);

});
