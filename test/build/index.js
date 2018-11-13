const ReactMobiledocEditor = require('../../dist/main');
const { expect } = require('chai');

describe('build', () => {
  it('should build UMD compliant output', () => {
    expect(typeof ReactMobiledocEditor).to.equal('object');
    expect(ReactMobiledocEditor).to.be.a('module');
  });
});
