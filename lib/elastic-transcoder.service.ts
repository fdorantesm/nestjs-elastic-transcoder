import {
  CreateJobCommandInput,
  CreateJobCommandOutput,
  ElasticTranscoder
} from '@aws-sdk/client-elastic-transcoder';
import {} from '@aws-sdk/client-elastic-transcoder';
import { Inject, Injectable } from '@nestjs/common';

import { ELASTIC_TRANSCODER_MODULE_OPTIONS } from './elastic-transcoder.constants';

@Injectable()
export class ElasticTranscoderService {
  constructor(
    @Inject(ELASTIC_TRANSCODER_MODULE_OPTIONS)
    private readonly elasticTranscoder: ElasticTranscoder
  ) {}

  public async createJob(
    pipelineId: string,
    inputKey: string,
    outputKey: string,
    presetId: string
  ): Promise<CreateJobCommandOutput> {
    const params: CreateJobCommandInput = {
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
    return this.elasticTranscoder.createJob(params);
  }
}
