import { Injectable, OnModuleInit } from "@nestjs/common";
import { CatDto } from "./cat.dto";

@Injectable()
export class CatsService implements OnModuleInit {
    private cats: CatDto[] = [];

    onModuleInit(): void {
        console.log('Cats service initialized.');
        this.addCat({ name: "Gismo", age: 10 });
    }

    addCat(cat: CatDto) {
        this.cats.push(cat);
    }

    getAll(): CatDto[] {
        return this.cats;
    }
}