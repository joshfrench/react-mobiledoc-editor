import React from 'react';
import { shallow, mount } from 'enzyme';
import Editor from '../../src/components/Editor';

describe(Editor, () => {
  it('mounts Mobiledoc.Editor', () => {
    const context = { editor: { render: jest.fn() }};
    mount(<Editor />, { context });

    expect(context.editor.render).toBeCalled();
  });

  it('passes arbitrary props to node', () => {
    const wrapper = shallow(<Editor className="foo" />);
    expect(wrapper).toMatchSnapshot();
  });
});
