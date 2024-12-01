import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { QueueName } from '@libs/common/src/events';
import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class AppService {
  constructor(
  ) { }

  async getHello(): Promise<any> {
    return 'Hello World!';
  }
}
