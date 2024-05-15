import { Module } from '@nestjs/common';

import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/dataBase/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
