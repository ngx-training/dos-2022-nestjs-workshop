import { Post } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 500, nullable: true })
    description: string;

    @OneToMany(type => Post, post => post.category, { cascade: ['insert', 'update']})
    posts: Post[];
}
