import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log('Server starting');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(function logger(req, res, next) {
    console.log(`Request...`);
    console.log(`\t${req.path}`);
    console.log(`\t${req.url}`);
    next();
  });
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();
