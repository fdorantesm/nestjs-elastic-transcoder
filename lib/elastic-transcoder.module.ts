import {
  ElasticTranscoder,
  ElasticTranscoderClient,
  ElasticTranscoderClientConfig
} from '@aws-sdk/client-elastic-transcoder';
import { DynamicModule, Module } from '@nestjs/common';

import { ELASTIC_TRANSCODER_MODULE_OPTIONS } from './elastic-transcoder.constants';
import { ElasticTranscoderService } from './elastic-transcoder.service';
import { ElasticTranscoderModuleOptions } from './interfaces/elastic-transcoder-module-options.interface';
import { ElasticTranscoderModuleAsyncOptions } from './interfaces/elastic-transcoder-module-async-options.interface';

@Module({})
export class ElasticTranscoderModule {
  static forRoot(options: ElasticTranscoderModuleOptions): DynamicModule {
    return {
      module: ElasticTranscoderModule,
      providers: [
        {
          provide: ELASTIC_TRANSCODER_MODULE_OPTIONS,
          useValue: options
        },
        {
          provide: ElasticTranscoderClient,
          useFactory: () => {
            const config: ElasticTranscoderClientConfig = {
              region: options.region,
              credentials: {
                accessKeyId: options.accessKeyId,
                secretAccessKey: options.secretAccessKey
              }
            };
            return new ElasticTranscoderClient(config);
          }
        },
        ElasticTranscoderService
      ],
      exports: [ElasticTranscoderService]
    };
  }

  static async forRootAsync(
    options: ElasticTranscoderModuleAsyncOptions
  ): Promise<DynamicModule> {
    return {
      module: ElasticTranscoderModule,
      imports: options.imports,
      providers: [
        {
          provide: ELASTIC_TRANSCODER_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || []
        },
        {
          provide: ElasticTranscoderClient,
          useFactory: async (options: ElasticTranscoderModuleOptions) => {
            const config: ElasticTranscoderClientConfig = {
              region: options.region,
              credentials: {
                accessKeyId: options.accessKeyId,
                secretAccessKey: options.secretAccessKey
              }
            };
            return new ElasticTranscoderClient(config);
          },
          inject: [ELASTIC_TRANSCODER_MODULE_OPTIONS]
        },
        ElasticTranscoderService
      ],
      exports: [ElasticTranscoderService]
    };
  }

  static forFeature(): DynamicModule {
    const elasticTranscoderService = {
      provide: ELASTIC_TRANSCODER_MODULE_OPTIONS,
      useFactory: (elasticTranscoder: ElasticTranscoder) => {
        return new ElasticTranscoderService(elasticTranscoder);
      },
      inject: [ElasticTranscoder]
    };

    return {
      module: ElasticTranscoderModule,
      providers: [elasticTranscoderService],
      exports: [elasticTranscoderService]
    };
  }
}
