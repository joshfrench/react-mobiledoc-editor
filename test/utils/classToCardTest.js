import {classToDOMCard} from '../../src/utils/classToCard';
import {ADD_CARD_HOOK} from '../../src/components/Container';
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

  it(`returns element created by options.${ADD_CARD_HOOK}`, () => {
    const card = classToDOMCard(Component);
    const destinationElement = "destinationElement";
    const cardArg = { options: { [ADD_CARD_HOOK]: (card) => ({card, destinationElement}) },
                      env:     { onTeardown: stub() }};

    expect(card.render(cardArg)).to.eql(destinationElement);
  });
});
