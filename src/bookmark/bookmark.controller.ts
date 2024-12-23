/* eslint-disable prettier/prettier */
import {
    Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGaurd } from 'src/auth/gaurd';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGaurd)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId)
  }

  @Post()
  createBookmark(@GetUser('id') userId: number ,
  @Body() dto:CreateBookmarkDto) {
    return this.bookmarkService.createBookmark(userId , dto )

  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,

  ) {
    return this.bookmarkService.getBookmarkById(userId,bookmarkId)
  }

  @Delete()
  deleteBookmarkById(@GetUser('id') userId: number,
  @Param('id',ParseIntPipe) bookmarkId:number
) {this.bookmarkService.deleteBookmarkById(
    userId,bookmarkId
)}

  @Patch(':id')
  editBookmarkById(@GetUser('id') userId: number,
  @Param('id',ParseIntPipe) bookmarkId :number ,
  @Body() dto:EditBookmarkDto) {
    return this.bookmarkService.editBookmarkById(userId,bookmarkId,dto)

  }
}
