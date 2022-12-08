import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';
import { CatDto } from './cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    
    constructor(private catsService: CatsService) {}

    @Get()
    getAll(): CatDto[] {
        return this.catsService.getAll();
    }

    @Post()
    @HttpCode(201)
    createCat(@Body() catDto: CatDto): string {
        this.catsService.addCat(catDto);
        return `Cat ${catDto.name} created`;
    }

    @Get('details')
    displayDetails(@Req() request: Request, @Query('name') name: string): string {
        return `Request method: ${request.method}, Query name: ${name}`;
    }

    /*@Get('redirect')
    @Redirect('https://bbk.bund.de', 301)
    testRedirect(): string {
        return 'Redirect';
    }*/

    @Get(':id')
    @Header('Cache-control', 'none')
    displayParams(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number): string {
        return `Load cat with id ${id}`;
    }
}
