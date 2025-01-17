module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // new feature
        'fix',  // fix bug
        'docs', // documentation changes
        'style', // code style changes (white-space, formatting)
        'refactor', // code refactoring
        'perf', // performance improvements
        'test', // adding missing tests
        'build', // changes affecting build system
        'ci', // changes to CI/CD
        'chore', // maintenance tasks
        'revert' // reverting changes
      ]
    ],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 72]
  },
};
