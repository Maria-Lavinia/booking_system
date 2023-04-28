import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardMemberEntity } from '../authentication/entities/boardmember';
import { TenantEntity } from '../authentication/entities/tenant';
import { UserEntity } from '../authentication/entities/user';
import { UsersService } from './users.service';
import { ProblemsModule } from 'src/problems/problems.module';
import { Problem } from 'src/problems/entities/problem.entity';

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
