import { Provider } from '@nestjs/common';
import { ElasticTranscoder } from '@aws-sdk/client-elastic-transcoder';
import {
  ELASTIC_TRANSCODER_MODULE_OPTIONS,
  ELASTIC_TRANSCODER_PROVIDER
} from '../elastic-transcoder.constants';
import { ElasticTranscoderModuleOptions } from '../interfaces';

export function createAsyncProviders(
  options: ElasticTranscoderModuleOptions
): Provider[] {
  return [
    {
      provide: ELASTIC_TRANSCODER_MODULE_OPTIONS,
      useFactory: () => options
    },
    {
      provide: ElasticTranscoder,
      useFactory: async (options: ElasticTranscoderModuleOptions) => {
        return new ElasticTranscoder({
          region: options.region,
          credentials: {
            accessKeyId: options.accessKeyId,
            secretAccessKey: options.secretAccessKey
          }
        });
      },
      inject: [ELASTIC_TRANSCODER_MODULE_OPTIONS]
    },
    {
      provide: ELASTIC_TRANSCODER_PROVIDER,
      useFactory: (elasticTranscoder: ElasticTranscoder) => {
        return {
          createJob: (
            pipelineId: string,
            inputKey: string,
            outputKey: string,
            presetId: string
          ) => {
            const params = {
              PipelineId: pipelineId,
              Input: {
                Key: inputKey
              },
              Outputs: [
                {
                  Key: outputKey,
                  PresetId: presetId
                }
              ]
            };
            return elasticTranscoder.createJob(params);
          }
        };
      },
      inject: [ElasticTranscoder]
    }
  ];
}
