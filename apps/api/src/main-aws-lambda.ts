import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as serverlessExpress from 'aws-serverless-express';
import * as express from 'express';

import { AppModule } from './app/app.module';

let cachedServer: any;

async function bootstrapServer() {
  const expressServer = express();
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressServer));
  nestApp.setGlobalPrefix('api');
  await nestApp.init();
  return serverlessExpress.createServer(expressServer);
}

export const handler = (event: any, context) => {
  if (!cachedServer) {
    bootstrapServer().then(server => {
      cachedServer = server;
      return serverlessExpress.proxy(server, event, context);
    });
  } else {
    return serverlessExpress.proxy(cachedServer, event, context);
  }
};
