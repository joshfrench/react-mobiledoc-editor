import {jsdom} from 'jsdom';

global.document = jsdom('');
global.window = document.defaultView;
global.window.getSelection = () => false; // disable SelectionTether for testing

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';

chai.use(chaiEnzyme());
chai.use(sinonChai);
