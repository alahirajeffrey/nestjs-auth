import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities:true,
      synchronize:true
    }),
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
