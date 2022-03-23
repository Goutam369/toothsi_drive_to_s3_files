import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from './status.enum';

@Entity()
export class AutoUpload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  source: string;

  @Column()
  destination: string;

  @Column({ type: 'enum', enum: Status, default: Status.NOT_DONE })
  status: Status;
}
