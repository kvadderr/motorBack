import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Group } from 'src/group/entities/group.entity';
import { Folder } from 'src/folder/entities/folder.entity';

@Entity()
export class FolderAccess {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.folderAccess)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Folder, folder => folder.folderAccess)
  @JoinColumn({ name: 'folder_id' })
  folder: Folder;
  
  @ManyToOne(() => Group, group => group.folderAccess)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Column()
  accessLevel: string;
}