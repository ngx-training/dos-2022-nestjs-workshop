import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
