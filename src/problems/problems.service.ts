import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './entities/problem.entity';
import { Repository } from 'typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
    private readonly httpService: HttpService,
  ) 
  
  
  
  {}

  create(createProblemDto: CreateProblemDto) {
    const problem = this.problemRepository.save(createProblemDto);
    return problem;
  }

  findAll() {
    return this.problemRepository.find();
  }

  findOne(id: number) {
    return this.problemRepository.findOneBy({ id: id });
  }

  // update(id: number, updateProblemDto: UpdateProblemDto) {
  //   return `This action updates a #${id} problem`;
  // }

  remove(id: number) {
    return this.problemRepository.delete(id);
  }

  async savePic(base64EncodedImage: string) {
  const formData = new FormData();
  formData.append('image', base64EncodedImage);
  const {data: imageData} = await firstValueFrom(
    this.httpService
    .post(
      `https://freeimage.host/api/1/upload?key=${process.env.IMG_API_KEY}`,
      formData,
    )
    .pipe(
      catchError((error: AxiosError) => {
        console.log("error", error);
        throw error;
      }
      )))


      console.log("imageData", imageData);
      console.log("imageData", imageData.image.display_url);

      return imageData.image.display_url;
}}
