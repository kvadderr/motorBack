import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { AppEntity } from "src/base/BaseEntity";

import { User } from "src/user/user.entity";


@Entity({ name: 'franchisor' })
export class Franchisor extends AppEntity{

    @Column({nullable: true})
    FIO: string;

    @Column({nullable: true})
    company: string;

    @Column()
    user_id: number;

    @OneToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User
}
