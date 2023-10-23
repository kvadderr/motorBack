import { Entity, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { AppEntity } from "src/base/BaseEntity";

import { Franchisor } from "src/franchisor/entities/franchisor.entity";

@Entity({ name: 'spacework' })
export class Spacework extends AppEntity{
    @Column({ nullable: true })
    avatar: string;

    @Column()
    name: string;

    @Column()
    franchisor_id: number;

    @ManyToOne(() => Franchisor)
    @JoinColumn({name: 'franchisor_id'})
    franchisor: Franchisor
}
