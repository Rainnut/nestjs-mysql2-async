# nestjs-mysql2-async

# 解决问题

1. `@nestjs/typeorm`使用时必须声明至少一个entity，并且entity必须有主键，否则会抛错。在业务上，我们使用了 `StarRocks`，数据组不建议给表加上主键，所以没法使用`@nestjs/typeorm`做数据查询
2. 本来打算使用`nest-mysql2`这个包做数据库连接配置，不过它不支持异步，我希望获取到数据库变量配置后再做链接，达到类似`@nestjs/typeorm`的效果

```ts
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'mysql',
    entities: [Empty],
    host: configService.get('STARROCKS_HOST'),
    port: configService.get<number>('STARROCKS_PORT'),
    username: configService.get('STARROCKS_USER'),
    password: configService.get('STARROCKS_PWD'),
    database: configService.get('STARROCKS_DATABASE'),
  }),
}),
```

# 解决方案

在[`nest-mysql2`](https://www.npmjs.com/package/nest-mysql2)这个包的基础上，添加`forRootAsync`方法

## 安装

```markdown
npm i nestjs-mysql2-async mysql2
```
