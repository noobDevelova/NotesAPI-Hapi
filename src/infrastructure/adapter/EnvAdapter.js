require('dotenv').config();

class EnvAdapter {
  static get(key) {
    return process.env[key];
  }

  static getDBConfig() {
    return {
      user: this.get('PGUSER'),
      host: this.get('PGHOST'),
      password: this.get('PGPASSWORD'),
      database: this.get('PGDATABASE'),
      port: this.get('PGPORT'),
    };
  }
}

module.exports = EnvAdapter;
