import {
    Entity,
    Column,
    OneToMany
} from 'typeorm';

import { AppEntity } from '../base/BaseEntity';
import { FolderAccess } from 'src/folder-access/entities/folder-access.entity';

export enum UserRole {
    ROOT = 'root',
    ADMIN = 'admin',
    MANAGER = 'manager',
    FRANCHISOR = 'franchisor',
    FRANCHISEE = 'franchisee',
    EMPLOYEE = 'employee',
}

@Entity({ name: 'user' })
export class User extends AppEntity {

    @Column({ unique: true, length: 255 })
    email: string;

    @Column({ select: false, nullable: true })
    password: string;

    @Column({ unique: true, nullable: true })
    phone: string;

    @Column({ default: 'Offline' })
    status: string;

    @Column({ default: true })
    isComplete: boolean;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.EMPLOYEE,
    })
    role: UserRole;

    @Column({ default: 0 })
    tokenVersion: number;

    @OneToMany(() => FolderAccess, folderAccess => folderAccess.user)
    folderAccess: FolderAccess[];
}
