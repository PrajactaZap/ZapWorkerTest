import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const config = {
  baseUrl: process.env.BASE_URL || 'https://reqres.in/api',
  timeout: parseInt(process.env.TIMEOUT) || 30000,
  retryCount: parseInt(process.env.RETRY_COUNT) || 2,
  logLevel: process.env.LOG_LEVEL || 'info',
  env: process.env.ENV || 'qa',
  allureResultsDir: process.env.ALLURE_RESULTS_DIR || 'allure-results',
  allureReportDir: process.env.ALLURE_REPORT_DIR || 'allure-report',
  reqresApiKey: process.env.REQRES_API_KEY || ''
};

export default config;
