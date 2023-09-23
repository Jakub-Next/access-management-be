import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {dataSourceOptions} from "./hidden/.typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import { AnalyzerModule } from './analyzer/analyzer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AnalyzerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
