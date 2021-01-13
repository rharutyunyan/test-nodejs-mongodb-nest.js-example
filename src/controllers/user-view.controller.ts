import { Controller, Logger, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UserViewService } from '../services/user-view.service';
import { IUserView } from '../interfaces';
import { CreateUserViewRequest } from '../models';

@Controller('user-view/v1/views')
@ApiTags('Views')
export class UserViewController {
  private Logger: Logger = new Logger(UserViewController.name);
  constructor(private readonly userViewService: UserViewService) {}

  @Get()
  @ApiOperation({ summary: 'Get User Views' })
  @ApiResponse({ status: 200, description: 'User Views are gotten' })
  async getUserViews(): Promise<IUserView[]> {
    return this.userViewService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Add user view' })
  @ApiResponse({ status: 200, description: 'User view is created' })
  async createUserViews(@Body() createParams: CreateUserViewRequest): Promise<void> {
    await this.userViewService.createNewUserView(createParams);
  }
}
