import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { AppEntity } from "src/base/BaseEntity";
import { Spacework } from "src/spacework/entities/spacework.entity";

@Entity({ name: 'file' })
export class File extends AppEntity {
    @Column()
    name: string;

    @Column()
    document_id: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ nullable: true })
    folder_id: number;

    @Column()
    type: string;

    @Column({ select: false })
    spacework_id: number;

    @ManyToOne(() => Spacework)
    @JoinColumn({ name: 'spacework_id' })
    spacework: Spacework;

}
