import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../nest-handler/src/app.module';
import { AppService } from '../../nest-handler/src/app.service';

export async function test(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  // const name = request.query.get('name') || await request.text() || 'world';

  const appContext = await NestFactory.createApplicationContext(AppModule);
  const appService = appContext.get(AppService);
  const name = appService.getHello();
  return { body: `Hello, ${name}!` };
}

app.http('test', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: test,
});
