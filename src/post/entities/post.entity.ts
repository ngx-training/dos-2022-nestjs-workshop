import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 200 })
    title: string;

    @Column({ length: 500, nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ type: 'timestamp', default: new Date() })
    created_at: string;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: string;

    @ManyToOne(type => Category, category => category.posts, { cascade: ['insert', 'update']})
    category: Category;
}
