
import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { AppEntity } from "src/base/BaseEntity";

import { User } from "src/user/user.entity";
import { Franchisor } from "src/franchisor/entities/franchisor.entity";

@Entity({ name: 'franchisee' })
export class Franchisee extends AppEntity{

    @Column({nullable: true})
    FIO: string;

    @Column({nullable: true})
    post: string;

    @Column({nullable: true})
    llc: string;
    
    @Column({nullable: true})
    inn: string;

    @Column({nullable: true})
    legal_address: string;

    @Column({nullable: true})
    number_employee: number;

    @Column()
    franchisor_id: number;

    @Column()
    user_id: number;
    
    @OneToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User
}

