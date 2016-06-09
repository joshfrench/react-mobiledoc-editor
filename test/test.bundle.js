import sinon from 'sinon';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

chai.use(chaiImmutable);

var context = require.context('.', true, /Test.js$/);
context.keys().forEach(context);
