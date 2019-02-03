const IdenticObjects = require('../src/identicobjects');

test('simple object', () => {
    const io = new IdenticObjects();

    const test1 = {test: 1};

    const a = io.get(test1);
    const b = io.get(test1);
    
    expect(a).toBe(b);
    expect(a).toEqual(test1);

});

test('array with repeated object elements', () => {
    const io = new IdenticObjects();

    const test1 = [{d:1},{d:2},{d:1}];
    const test2 = [{d:1},{d:2},{d:2}];

    const a = io.get(test1);
    const b = io.get(test2);
    
    expect(a).toEqual(test1);
    expect(b).toEqual(test2);

});
