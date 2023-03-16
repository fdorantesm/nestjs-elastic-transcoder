import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface ElasticTranscoderModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<{
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
  }>;
  inject?: any[];
}
