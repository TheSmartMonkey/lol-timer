const fs = require('fs');
const path = require('path');

class FileService {
  constructor() {
    this.configPath = path.join(__dirname, '..', 'config', 'shortcuts.json');
  }

  readShortcuts() {
    try {
      const data = fs.readFileSync(this.configPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading shortcuts file:', error);
      return {};
    }
  }
}

module.exports = FileService; 
