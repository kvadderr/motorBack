import { Entity, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { AppEntity } from "src/base/BaseEntity";
import { User } from "src/user/user.entity";

@Entity({ name: 'spacework' })
export class Spacework extends AppEntity{
    @Column({ nullable: true })
    avatar: string;

    @Column()
    name: string;

    @Column()
    user_id: number;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User
}
