import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
  } from '@nestjs/common';
  import { Role } from './../roles/role.enum';
  import { UsersService } from 'src/users/users.service';
  import { UserEntity } from './../entities/user';
  
  //Used with JWT guard to allow only admin access to endpoint.
  @Injectable()
  export class TenantGuard implements CanActivate {
    constructor(@Inject(UsersService) private usersService: UsersService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const userId: number = request.user.id;
      // const role = request.user.role;
      const user = await this.usersService.findOneById(userId);
  
      console.log('user in guard', user);
  
      return user && user.role === Role.User;
    }
  }