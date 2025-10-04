import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { MusicModule } from './music/music.module';
// import { SearchModule } from './search/search.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from './album/albums.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokenBlacklistsModule } from './token-blacklists/token-blacklists.module';
import { ListenersTableModule } from './listeners-table/listeners-table.module';
import { PlaylistModule } from './playlist/playlist.module';
import { S3Module } from './common/s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthorModule,
    MusicModule,
    AlbumsModule,
    SearchModule,
    UsersModule,
    AuthModule,
    TokenBlacklistsModule,
    ListenersTableModule,
    PlaylistModule,
    S3Module,
  ],
})
export class AppModule {}
