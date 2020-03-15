import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  getHello(id: string): string {
    return `Hello World! ${id}`;
  }
}
