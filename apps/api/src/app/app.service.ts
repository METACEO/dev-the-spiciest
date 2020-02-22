import { Injectable } from '@nestjs/common';
import { Message } from '@dev-the-spiciest/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: `The time is ${new Date()}` };
  }
}
