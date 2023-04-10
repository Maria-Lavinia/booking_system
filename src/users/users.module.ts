import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardMemberEntity } from '../authentication/entities/boardmember';
import { TenantEntity } from '../authentication/entities/tenant';
import { UserEntity } from '../authentication/entities/user';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TenantEntity, BoardMemberEntity]),
  ],
  providers: [UsersService],
  exports: [
    UsersService,
    TypeOrmModule.forFeature([UserEntity, TenantEntity, BoardMemberEntity]),
  ],
})
export class UsersModule {}
