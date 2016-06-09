// TODO: uncomment for DOM-specific tests
// import {jsdom} from 'jsdom';
//
// global.document = jsdom('');
// global.window = document.defaultView;

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';

chai.use(chaiEnzyme());
chai.use(sinonChai);
