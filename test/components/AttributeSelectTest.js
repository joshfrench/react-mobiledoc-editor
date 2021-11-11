import React from 'react';
import { AttributeSelect, ReactMobileDocContext } from 'react-mobiledoc-editor';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';

describe('<AttributeSelect />', () => {
  it('should render the first value by default if no attribute is specified', () => {
    const activeSectionAttributes = [{}];
    const context = { activeSectionAttributes };
    const wrapper = mount(
      <ReactMobileDocContext.Provider value={context}>
        <AttributeSelect attribute="text-align" values={['left', 'right']} />
      </ReactMobileDocContext.Provider>
    );
    const option = (
      <option value="left" key="left">
        Left
      </option>
    );
    expect(wrapper.containsMatchingElement(option)).to.be.true;
    expect(wrapper.find('select')).to.have.prop('value', 'left');
  });

  it('should select the specified attribute value', () => {
    const activeSectionAttributes = [{ 'data-md-text-align': 'right' }];
    const context = { activeSectionAttributes };
    const wrapper = mount(
      <ReactMobileDocContext.Provider value={context}>
        <AttributeSelect attribute="text-align" values={['left', 'right']} />
      </ReactMobileDocContext.Provider>
    );
    const option = (
      <option value="right" key="right">
        Right
      </option>
    );
    expect(wrapper.containsMatchingElement(option)).to.be.true;
    expect(wrapper.find('select')).to.have.prop('value', 'right');
  });

  it('should pass props to <select>', () => {
    const wrapper = mount(
      <AttributeSelect
        attribute="text-align"
        values={['left', 'right', 'center']}
        className="alignment"
      />
    );
    expect(wrapper).to.have.className('alignment');
  });

  it('should set the attribute section when a new attribute is selected', () => {
    const editor = { setAttribute: spy() };
    const context = { editor };
    const wrapper = mount(
      <ReactMobileDocContext.Provider value={context}>
        <AttributeSelect
          attribute="text-align"
          values={['left', 'right', 'center']}
        />
      </ReactMobileDocContext.Provider>
    );
    wrapper.find('select').simulate('change', { target: { value: 'center' } });
    expect(editor.setAttribute).to.be.calledWith('text-align', 'center');
  });

  it('should remove the section attribute when the default value is selected', () => {
    const editor = { setAttribute: spy(), removeAttribute: spy() };
    const context = { editor };
    const wrapper = mount(
      <ReactMobileDocContext.Provider value={context}>
        <AttributeSelect
          attribute="text-align"
          values={['left', 'right', 'center']}
        />
      </ReactMobileDocContext.Provider>
    );
    wrapper.find('select').simulate('change', { target: { value: 'center' } });
    expect(editor.setAttribute).to.be.calledWith('text-align', 'center');
    wrapper.find('select').simulate('change', { target: { value: 'left' } });
    expect(editor.removeAttribute).to.be.calledWith('text-align');
  });
});
