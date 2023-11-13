import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { AppEntity } from "src/base/BaseEntity";
import { Spacework } from "src/spacework/entities/spacework.entity";
import { FolderAccess } from "src/folder-access/entities/folder-access.entity";

@Entity({ name: 'folder' })
export class Folder extends AppEntity {
    @Column()
    name: string;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ nullable: true })
    parent_id: number;

    @Column({ select: false })
    spacework_id: number;

    @ManyToOne(() => Spacework)
    @JoinColumn({ name: 'spacework_id' })
    spacework: Spacework;

    @OneToMany(() => FolderAccess, folderAccess => folderAccess.group)
    folderAccess: FolderAccess[];

}
