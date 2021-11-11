import { classToDOMCard } from '../../src/utils/classToCard';
import { expect } from 'chai';

describe('classToDOMCard()', () => {
  it('should infer name from component displayName', () => {
    const card = classToDOMCard({ displayName: 'Test' });
    expect(card.name).to.eql('Test');
  });

  it('should raise if no displayName is set', () => {
    expect(() => classToDOMCard({})).to.throw(/no displayName defined/);
  });
});
