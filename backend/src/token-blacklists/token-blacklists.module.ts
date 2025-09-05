import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenBlacklist } from './entities/token-blacklist.entity';
import { TokenBlacklistService } from './token-blacklists.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenBlacklist])],
  providers: [TokenBlacklistService],
  exports: [TokenBlacklistService, TypeOrmModule],
})
export class TokenBlacklistsModule {}