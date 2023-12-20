import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  HttpException,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { friendService } from './friend.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('friend')
export class friendController {
  constructor(private friendService: friendService) {}

  //GET MANY
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getFriends(@Req() req) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.friendService.getFriends(id_user);
      return result;
    } catch (error) {
      throw new HttpException('Failed to find friends', 444);
    }
  }

  //GET MANY
  @UseGuards(AuthGuard('jwt'))
  @Get('/search/')
  async searchFriends(@Req() req) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.friendService.searchFriends(id_user);
      return result;
    } catch (error) {
      throw new HttpException('Failed to find friends', 444);
    }
  }

  //POST
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async postFriend(@Req() req, @Query('id_friend') id_friend: string) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.friendService.postFriend(id_user, id_friend);
      return result;
    } catch (error) {
      throw new HttpException('Failed to create friendship', 444);
    }
  }

  //PUT ACCEPTED
  @UseGuards(AuthGuard('jwt'))
  @Put('/accept/')
  async acceptFriend(@Req() req, @Query('id_friend') id_friend: string) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.friendService.acceptFriend(id_user, id_friend);
      return result;
    } catch (error) {
      throw new HttpException('Failed to accept friend', 444);
    }
  }

  //PUT REFUSED
  @UseGuards(AuthGuard('jwt'))
  @Put('/refuse/')
  async refuseFriend(@Req() req, @Query('id_friend') id_friend: string) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.friendService.refuseFriend(id_user, id_friend);
      return result;
    } catch (error) {
      throw new HttpException('Failed to refuse friend', 444);
    }
  }

  //PUT BLOCK
  @UseGuards(AuthGuard('jwt'))
  @Put('/block/')
  async blockFriend(@Req() req, @Query('id_friend') id_friend: string) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.friendService.blockFriend(id_user, id_friend);
      return result;
    } catch (error) {
      throw new HttpException('Failed to block friend', 444);
    }
  }

  //PUT UNBLOCK
  @UseGuards(AuthGuard('jwt'))
  @Put('/unblock/')
  async unblockFriend(@Req() req, @Query('id_friend') id_friend: string) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.friendService.unblockFriend(id_user, id_friend);
      return result;
    } catch (error) {
      throw new HttpException('Failed to unblock friend', 444);
    }
  }

  //DELETE
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteFriend(@Req() req, @Query('id_friend') id_friend: string) {
    try {
      const id_user: string = req.user.sub;
      const result = await this.friendService.deleteFriend(id_user, id_friend);
      return result;
    } catch (error) {
      throw new HttpException('Failed to delete friend', 444);
    }
  }

  // // send request
  // @Post('send')
  // @UseGuards(AuthGuard('jwt'))
  // async send(@Req() req, @Res() res: Response, @Body() dto: friendDto){
  //     res
  //     .status(200)
  //     .json(await this.friendService.send(req.user.sub, dto.friend));
  // }

  // // accept request
  // @Post('accept')
  // @UseGuards(AuthGuard('jwt'))
  // async accept(@Req() req, @Res() res, @Body() dto: friendDto){
  //     res
  //     .status(200)
  //     .json(await this.friendService.accept(req.user.sub, dto.friend));
  // }

  // // decline requset
  // @Delete('decline')
  // @UseGuards(AuthGuard('jwt'))
  // async decline(@Req() req, @Res() res, @Body() dto: friendDto){
  //     res
  //     .status(200)
  //     .json(await this.friendService.decline(req.user.sub, dto.friend));
  // }

  // // remove friend
  // @Delete('remove')
  // @UseGuards(AuthGuard('jwt'))
  // async remove(@Req() req, @Res() res, @Body() dto: friendDto){
  //     res
  //     .status(200)
  //     .json(await this.friendService.remove(req.user.sub, dto.friend));
  // }

  // // block user
  // @Patch('block')
  // @UseGuards(AuthGuard('jwt'))
  // async block(@Req() req, @Res() res, @Body() dto: friendDto){
  //     res
  //     .status(200)
  //     .json(await this.friendService.block(req.user.sub, dto.friend));

  // }

  // // sort friends, requests and blocked users
  // @Get('sort')
  // @UseGuards(AuthGuard('jwt'))
  // async sort(@Req() req, @Res() res) {
  //     res
  //     .status(200)
  //     .json(await this.friendService.sort(req.user.sub));
  // }

  // @Get('search')
  // @UseGuards(AuthGuard('jwt'))
  // async search(@Req() req, @Res() res) {
  //     res
  //     .status(200)
  //     .json(await this.friendService.search(req.user.sub));
  // }
}
