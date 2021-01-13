import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserViewDocument, UserViewSchema } from '../schemas';
import { IUserView } from '../interfaces';
import { CreateUserViewRequest } from '../models';

@Injectable()
export class UserViewService {
  private Logger: Logger = new Logger(UserViewService.name);
  constructor(@InjectModel(UserViewSchema.name) private userViewModel: Model<UserViewDocument>) {}

  async findAll(): Promise<IUserView[]> {
    return this.userViewModel.find();
  }

  async createNewUserView(userView: CreateUserViewRequest): Promise<void> {
    await this.userViewModel.create(userView);
  }
}
