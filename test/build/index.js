const ReactMobiledocEditor = require('../../dist/main');
const { expect } = require('chai');

describe('build', () => {
  it('should build UMD compliant output', () => {
    expect(ReactMobiledocEditor).to.be.an('object');
  });
});
