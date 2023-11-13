import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import { AppEntity } from 'src/base/BaseEntity';
import { Chat } from './chats.entity';
import { User } from 'src/user/user.entity';

@Entity({
    name: 'messages'
})
export class Message extends AppEntity {

    @Column()
    public content: string;

    @Column({ default: false })
    public see: boolean

    @ManyToOne(() => User)
    @JoinColumn({ name: 'sender_id' })
    public sender: User

    @ManyToOne(() => Chat)
    @JoinColumn({ name: 'chat_id' })
    public chat: Chat
}