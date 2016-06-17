import {classToDOMAtom} from '../../src/utils/classToAtom';
import {ADD_ATOM_HOOK} from '../../src/components/Container';
import {expect} from 'chai';
import {stub} from 'sinon';

describe('classToDOMAtom()', () => {
  const Component = { displayName: "Test" };
  it('should use explicit name', () => {
    const card = classToDOMAtom(Component, 'Test');
    expect(card.name).to.eql('Test');
  });

  it('should infer name from component displayName', () => {
    const card = classToDOMAtom(Component);
    expect(card.name).to.eql('TestAtom');
  });

  it(`returns element created by options.${ADD_ATOM_HOOK}`, () => {
    const card = classToDOMAtom(Component);
    const destinationElement = "destinationElement";
    const cardArg = { options: { [ADD_ATOM_HOOK]: (atom) => ({atom, destinationElement}) },
                      env:     { onTeardown: stub() }};

    expect(card.render(cardArg)).to.equal(destinationElement);
  });
});
