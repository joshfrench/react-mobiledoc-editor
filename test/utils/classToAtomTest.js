import { classToDOMAtom } from '../../src/utils/classToAtom';
import { expect } from 'chai';

describe('classToDOMAtom()', () => {
  it('should infer name from component displayName', () => {
    const atom = classToDOMAtom({ displayName: 'Test' });
    expect(atom.name).to.eql('Test');
  });

  it('should raise if no displayName is set', () => {
    expect(() => classToDOMAtom({})).to.throw(/no displayName defined/);
  });
});
