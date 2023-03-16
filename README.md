# NestJS Elastic Transcoder

### forRoot method

```ts

@Module({
  imports: [
    ElasticTranscoderModule.forRoot({
      accessKeyId: '',
      region: '',
      secretAccessKey: ''
    })
  ]
})
export class AppModule {}
```

### forRootAsync method

```ts
@Module({
  imports: [
    ElasticTranscoderModule.forRootAsync({
      imports: [ConfigModule.forFeature(elasticTranscoderLoader)],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          accessKeyId: configService.get('accessKeyId'),
          region: configService.get('region'),
          secretAccessKey: configService.get('secretAccessKey')
        };
      }
    })
  ]
})
export class AppModule {}
```

### forFeature method
```ts
@Module({
  imports: [
    ElasticTranscoderModule.forFeature()
  ]
})
export class VideosModule {}
```

