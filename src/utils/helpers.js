import fs from 'fs';
import path from 'path';

export class Helpers {
  static readJsonFile(filePath) {
    const fullPath = path.resolve(process.cwd(), filePath);
    const data = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(data);
  }

  static writeJsonFile(filePath, data) {
    const fullPath = path.resolve(process.cwd(), filePath);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');
  }

  static generateRandomEmail() {
    const timestamp = Date.now();
    return `test.user.${timestamp}@example.com`;
  }

  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomNumber(min = 1, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getCurrentTimestamp() {
    return new Date().toISOString();
  }

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  static isValidJson(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  static sanitizeFileName(fileName) {
    return fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  }

  static formatDate(date = new Date(), format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }
}

export default Helpers;
