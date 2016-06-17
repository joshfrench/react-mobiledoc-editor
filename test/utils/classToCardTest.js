import {classToDOMCard} from '../../src/utils/classToCard';
import {expect} from 'chai';

describe('classToDOMCard()', () => {
  const Component = { displayName: "Test" };
  it('should use explicit name', () => {
    const card = classToDOMCard(Component, 'Test');
    expect(card.name).to.eql('Test');
  });

  it('should infer name from component displayName', () => {
    const card = classToDOMCard(Component);
    expect(card.name).to.eql('TestCard');
  });
});
