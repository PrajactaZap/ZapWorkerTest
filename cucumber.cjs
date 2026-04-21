module.exports = {
  default: {
    require: ['src/step-definitions/**/*.js', 'src/support/**/*.js'],
    requireModule: ['@babel/register'],
    format: [
      'progress-bar',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      allure: {
        resultsDir: 'allure-results'
      }
    },
    parallel: 1,
    tags: 'not @skip'
  },
  smoke: {
    require: ['src/step-definitions/**/*.js', 'src/support/**/*.js'],
    requireModule: ['@babel/register'],
    format: [
      'progress-bar',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      allure: {
        resultsDir: 'allure-results'
      }
    },
    tags: '@smoke'
  },
  regression: {
    require: ['src/step-definitions/**/*.js', 'src/support/**/*.js'],
    requireModule: ['@babel/register'],
    format: [
      'progress-bar',
      'html:test-results/cucumber-report.html',
      'json:test-results/cucumber-report.json',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      allure: {
        resultsDir: 'allure-results'
      }
    },
    tags: '@regression'
  }
};
