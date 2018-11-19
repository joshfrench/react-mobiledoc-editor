const ReactMobiledocEditor = require('../../dist/main');

describe('build', () => {
  it('should build UMD compliant output', () => {
    expect(typeof ReactMobiledocEditor).toBe('object');
  });
});
