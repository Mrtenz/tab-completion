import { tabComplete } from '../src';
import { expect } from 'chai';
import 'mocha';

describe('Tab complete', () => {
    it('should equal foo bar', () => {
        const values = ['foo bar', 'baz qux'];
        const result = tabComplete(values, 'foo');
        expect(result).to.equal('foo bar');
    });

    it('should equal baz qux', () => {
        const values = ['foo bar', 'baz qux'];
        const result = tabComplete(values, 'qux');
        expect(result).to.equal('baz qux');
    });

    it('should not have a match', () => {
        const values = ['foo', 'bar'];
        const result = tabComplete(values, 'baz');
        expect(result).to.equal(null);
    });

    it('should not have a match', () => {
        const values = ['foo bar', 'baz qux'];
        const result = tabComplete(values, 'foo', { minLength: 7 });
        expect(result).to.equal(null);
    });
});
