import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import { AppEntity } from 'src/base/BaseEntity';
import { User } from 'src/user/user.entity';

@Entity({
    name: 'chats'
})
export class Chat extends AppEntity {

    @Column()
    user1_id: number;

    @Column()
    user2_id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user1_id' })
    user1: User

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user2_id' })
    user2: User
}