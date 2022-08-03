import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme from 'enzyme';
import sinonChai from 'sinon-chai';
import React from 'react';
import Adapter from '@cfaester/enzyme-adapter-react-18';

console.log('Testing with React version:', React.version); // eslint-disable-line no-console

Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());
chai.use(sinonChai);

const testsContext = require.context('.', true, /Test$/);
testsContext.keys().forEach(testsContext);
