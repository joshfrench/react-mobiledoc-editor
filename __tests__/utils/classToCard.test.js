import { classToDOMCard } from '../../src/utils/classToCard';

describe(classToDOMCard, () => {
  it('should infer name from component displayName', () => {
    const card = classToDOMCard({ displayName: "Test" });
    expect(card.name).toBe('Test');
  });

  it('should raise if no displayName is set', () => {
    expect(() => classToDOMCard({  })).toThrow(/no displayName defined/);
  });
});
