/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { error } from 'console';

@Injectable()
export class BookmarkService {
    constructor(private prisma:PrismaService){}
  getBookmarks(userId: number) {
    this.prisma.bookmark.findMany({
        where:{
            userId,
        }
    })
  }
  async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {
    const bookmark =
      await this.prisma.bookmark.create({
        data: {
          userId,
          ...dto,
        },
      });

    return bookmark;
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
        where:{
            userId,
            id:bookmarkId,
        }
    })

  }

  deleteBookmarkById(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.delete({
        where:{
            id:bookmarkId,
            userId
        }
    })
  }

async  editBookmarkById(userId: number, bookmarkId: number, dto :EditBookmarkDto ){
    //get bookmark by id
    const bookmark =await this.prisma.bookmark.findUnique({
        where:{
            id:bookmarkId
        }
    })
    //check if user owns the bookmark
    if(!bookmark ||bookmark.userId!== userId){
        throw new ForbiddenException('access to service denied')
    }

    return this.prisma.bookmark.update({
        where :{
            id:bookmarkId,
        },
        data:{
            ...dto
        }
    })

  }
}
