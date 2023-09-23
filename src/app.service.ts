import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkAvailability(): string {
    return 'Aplikacja Access Maganement Be działa prawidłowo';
  }
}
