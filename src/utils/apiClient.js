import { request } from '@playwright/test';
import config from '../config/environment.js';
import { logRequest, logResponse, logError } from './logger.js';

export class ApiClient {
  constructor() {
    this.context = null;
    this.baseUrl = config.baseUrl;
    this.timeout = config.timeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  async initialize() {
    if (!this.context) {
      const headers = { ...this.defaultHeaders };
      
      console.log('[DEBUG] API Key from config:', config.reqresApiKey ? 'Present (length: ' + config.reqresApiKey.length + ')' : 'Missing');
      
      if (config.reqresApiKey) {
        headers['x-api-key'] = config.reqresApiKey;
        console.log('[DEBUG] Added x-api-key header');
      }
      
      console.log('[DEBUG] Headers being used:', JSON.stringify(headers, null, 2));
      
      this.context = await request.newContext({
        timeout: this.timeout,
        ignoreHTTPSErrors: true,
        extraHTTPHeaders: headers
      });
    }
    return this.context;
  }

  async dispose() {
    if (this.context) {
      await this.context.dispose();
      this.context = null;
    }
  }

  async get(endpoint, options = {}) {
    return await this._request('GET', endpoint, options);
  }

  async post(endpoint, options = {}) {
    return await this._request('POST', endpoint, options);
  }

  async put(endpoint, options = {}) {
    return await this._request('PUT', endpoint, options);
  }

  async patch(endpoint, options = {}) {
    return await this._request('PATCH', endpoint, options);
  }

  async delete(endpoint, options = {}) {
    return await this._request('DELETE', endpoint, options);
  }

  async _request(method, endpoint, options = {}) {
    const startTime = Date.now();
    
    try {
      if (!this.context) {
        await this.initialize();
      }

      const { headers = {}, data = null, params = {}, token = null } = options;

      const requestHeaders = { ...this.defaultHeaders, ...headers };
      
      if (config.reqresApiKey) {
        requestHeaders['x-api-key'] = config.reqresApiKey;
      }
      
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }

      const url = this._buildUrl(endpoint, params);
      
      logRequest(method, url, requestHeaders, data);

      let response;
      const requestOptions = {
        headers: requestHeaders
      };

      if (data) {
        requestOptions.data = data;
      }

      switch (method) {
        case 'GET':
          response = await this.context.get(url, requestOptions);
          break;
        case 'POST':
          response = await this.context.post(url, requestOptions);
          break;
        case 'PUT':
          response = await this.context.put(url, requestOptions);
          break;
        case 'PATCH':
          response = await this.context.patch(url, requestOptions);
          break;
        case 'DELETE':
          response = await this.context.delete(url, requestOptions);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      const responseTime = Date.now() - startTime;
      const status = response.status();
      const statusText = response.statusText();
      
      let responseBody = null;
      const contentType = response.headers()['content-type'] || '';
      
      if (contentType.includes('application/json')) {
        try {
          responseBody = await response.json();
        } catch (e) {
          responseBody = await response.text();
        }
      } else {
        responseBody = await response.text();
      }

      logResponse(status, statusText, responseBody, responseTime);

      return {
        status,
        statusText,
        headers: response.headers(),
        body: responseBody,
        responseTime,
        ok: response.ok()
      };

    } catch (error) {
      const responseTime = Date.now() - startTime;
      logError(error, `during ${method} request to ${endpoint}`);
      
      return {
        status: 0,
        statusText: 'Request Failed',
        headers: {},
        body: { error: error.message },
        responseTime,
        ok: false,
        error: error.message
      };
    }
  }

  _buildUrl(endpoint, params = {}) {
    let url = endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`;
    
    if (Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      url = `${url}?${queryString}`;
    }
    
    return url;
  }

  setDefaultHeader(key, value) {
    this.defaultHeaders[key] = value;
  }

  removeDefaultHeader(key) {
    delete this.defaultHeaders[key];
  }

  setAuthToken(token) {
    this.setDefaultHeader('Authorization', `Bearer ${token}`);
  }

  clearAuthToken() {
    this.removeDefaultHeader('Authorization');
  }
}

export default ApiClient;
