/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateBookmarkDto {
    
    @IsString()
    @IsNotEmpty()
    title:string

    @IsString()
    @IsOptional()
    description?:string

    @IsString()
    link:string



}