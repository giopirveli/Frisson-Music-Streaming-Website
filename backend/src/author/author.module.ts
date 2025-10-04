import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './author.repository';
import { Author } from './entities/author.entity';
import { S3Module } from 'src/common/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Author]), S3Module],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
  exports: [AuthorRepository],
})
export class AuthorModule {}
