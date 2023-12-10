import * as process from 'process';
import { Logger } from '@nestjs/common';

export class GlobalConfig {
  static getPort() {
    const { PORT } = process.env;

    if (PORT) {
      return Number(PORT);
    } else {
      Logger.error('CONFIG ERROR: BAD ENVIRONMENT (PORT)');
      process.exit();
    }
  }
}
