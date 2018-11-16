import { classToDOMAtom } from '../../src/utils/classToAtom';

describe(classToDOMAtom, () => {
  it('should infer name from component displayName', () => {
    const atom = classToDOMAtom({ displayName: "Test" });
    expect(atom.name).toBe('Test');
  });

  it('should raise if no displayName is set', () => {
    expect(() => classToDOMAtom({  })).toThrow(/no displayName defined/);
  });
});
