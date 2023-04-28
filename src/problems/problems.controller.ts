import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { UsersService } from 'src/users/users.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { AdminGuard } from 'src/authentication/roles/admin.guard';

@Controller('problems')
export class ProblemsController {
  constructor(
    private readonly problemsService: ProblemsService,
    private readonly userService: UsersService,
  ) {}


  @Post()
  async create(@Req() req, @Body() body) {
      console.log("body", body);
      
      const display_url = await this.problemsService.savePic(body.data.photo.base64);
      
      console.log("image url", display_url);
      
      const createProblemDto = new CreateProblemDto(body.data.subject, body.data.description, display_url);
      //  createProblemDto.tenant = 
      //   (await this.usersService.findOne(req.user.username)).tenant;
      
       
      
      return this.problemsService.create(createProblemDto);

  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll(@Request() req: any) {
    console.log('user/tenant in ctrl', req.user);
    return this.problemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
  //   return this.problemsService.update(+id, updateProblemDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemsService.remove(+id);
  }

  // @Post('savePic')
  // async savePic(@Body() body) {
  //   console.log('body', body);
  //   return this.problemsService.savePic();
  // }
}
