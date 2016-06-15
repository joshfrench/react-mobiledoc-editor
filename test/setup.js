import {jsdom} from 'jsdom';

global.document = jsdom('<div id="root"></div>');
global.window = document.defaultView;

// Stub some DOM specs that jsdom doesn't support
global.window.getSelection = () => ({ rangeCount: null, getRangeAt: () => null });
global.MutationObserver = () => ({ observe: () => null, disconnect: () => null });
global.window.requestAnimationFrame = (f) => f();

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';

chai.use(chaiEnzyme());
chai.use(sinonChai);
