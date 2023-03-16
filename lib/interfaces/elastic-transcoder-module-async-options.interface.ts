import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ElasticTranscoder } from '@aws-sdk/client-elastic-transcoder';

export interface ElasticTranscoderModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<{
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  }>;
  inject?: any[];
}
