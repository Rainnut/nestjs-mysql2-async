import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from './common.constants';
import {
  MysqlModuleAsyncOptions,
  MySqlOptions,
} from './interfaces/config.interface';
import { MysqlService } from './mysql.service';

@Module({})
@Global()
export class MysqlModule {
  static forRoot(options: MySqlOptions): DynamicModule {
    return {
      module: MysqlModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        MysqlService,
      ],
      exports: [MysqlService],
    };
  }

  static forRootAsync(options: MysqlModuleAsyncOptions): DynamicModule {
    return {
      module: MysqlModule,
      imports: options.imports,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        MysqlService,
      ],
      exports: [MysqlService],
    };
  }
}
