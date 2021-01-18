const Helpers = require('./../utils/helpers.js')

describe('helpers test', () => {
    test('check if function generates something', () => {
        expect(Helpers.generateUUID()).not.toBeUndefined();
    })
    test('check if generated is UUID', () => {
        expect(Helpers.generateUUID()).toMatch(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/)
    })
    test('number title entry must not be longer than 30 characters', () => {
        expect(Helpers.checkingTitle('Triva Math Date categories')).toBeDefined();
      });
    test('number title entry must be a string', () => {
        expect(Helpers.checkingTitle(10)).toBeFalsy();
      });

    
}) 


