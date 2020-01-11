module.exports = {
  name: 'dev-the-spiciest',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dev-the-spiciest',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
