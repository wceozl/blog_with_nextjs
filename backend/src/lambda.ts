// Lambda环境crypto polyfill
import { webcrypto } from 'node:crypto';
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as any;
}

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import {
  Context,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import * as express from 'express';

let cachedServer: any;

/**
 * 创建NestJS应用实例
 */
async function createNestServer(): Promise<express.Application> {
  const expressApp = express();

  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    {
      logger: ['error', 'warn'], // 只保留错误和警告日志
      bufferLogs: true,
    },
  );

  nestApp.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://d350xeuecjph8o.cloudfront.net', // Amplify CloudFront域名
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'X-Api-Key',
      'X-Amz-Date',
      'X-Amz-Security-Token',
    ],
  });

  nestApp.setGlobalPrefix('api');
  await nestApp.init();

  return expressApp;
}

/**
 * Lambda处理函数
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    if (!cachedServer) {
      const expressApp = await createNestServer();
      cachedServer = serverlessExpress({ app: expressApp });
    }

    const response = await cachedServer(event, context);
    return response;
  } catch (error) {
    console.error('Lambda Error:', error.message);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: false,
        message: 'Internal Server Error',
      }),
    };
  }
};
