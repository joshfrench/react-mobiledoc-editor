import {classToDOMCard} from '../../src/utils/classToCard';
import {expect} from 'chai';
import {stub} from 'sinon';

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

  it('returns element created by options.addComponentCard', () => {
    const card = classToDOMCard(Component);
    const destinationElement = "destinationElement";
    const cardArg = { options: { addComponentCard: (card) => ({card, destinationElement}) },
                      env:     { onTeardown: stub() }};

    expect(card.render(cardArg)).to.eql(destinationElement);
  });
});
