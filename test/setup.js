import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';

chai.use(chaiEnzyme());
chai.use(sinonChai);

const testsContext = require.context(".", true, /Test$/);
testsContext.keys().forEach(testsContext);
