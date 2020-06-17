import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { roleConstans as role } from '../auth/constants'; // 引入角色常量
import { RbacGuard } from '../guards/rbac.guard';
// import { RbacInterceptor } from '../interceptor/rbac.interceptor';
import { CommodityService } from './commodity.service';

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  // 查询商品列表
  @UseGuards(new RbacGuard(role.NORMAL)) // 调用 RBAC 守卫
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.NORMAL)) // 调用 RBAC 拦截器
  @Get('list')
  async queryColumnList(@Req() req: Request) {
    return await this.commodityService.queryCommodityList(req.query);
  }

  // 新建商品
  @UseGuards(new RbacGuard(role.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.DEVELOPER))
  @Post('create')
  async createCommodity(@Body() body: any, @Req() req: any) {
    return await this.commodityService.createCommodity(body, req.user.username);
  }

  // 修改商品
  @UseGuards(new RbacGuard(role.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.DEVELOPER))
  @Post('update')
  async updateCommodity(@Body() body: any, @Req() req: any) {
    return await this.commodityService.updateCommodity(body, req.user.username);
  }

  // 删除商品
  @UseGuards(new RbacGuard(role.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.ADMIN))
  @Post('delete')
  async deleteCommodity(@Body() body: any) {
    return await this.commodityService.deleteCommodity(body);
  }
}
