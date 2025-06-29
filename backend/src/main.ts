import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://main.danec3gznhndc.amplifyapp.com',
    ],
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(3001);
  console.log('App running on http://localhost:3001');
}
bootstrap().catch((err) => {
  console.error('启动失败', err);
});
