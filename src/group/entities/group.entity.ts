import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { AppEntity } from "src/base/BaseEntity";
import { User } from "src/user/user.entity";
import { FolderAccess } from "src/folder-access/entities/folder-access.entity";

@Entity({ name: 'group' })
export class Group extends AppEntity {
    @Column()
    name: string;

    @Column({ select: false })
    user_id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User

    @OneToMany(() => FolderAccess, folderAccess => folderAccess.group)
    folderAccess: FolderAccess[];
}
