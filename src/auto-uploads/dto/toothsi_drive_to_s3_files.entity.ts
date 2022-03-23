import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { State } from './state.enum';
import { GeneralSelection } from './generalSelection.enum';

@Entity()
export class toothsi_drive_to_s3_files {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  drivelink: string;

  @Column()
  s3link: string;

  @Column()
  creation_time: string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column({ type: 'enum', enum: State, default: State.INSERTED })
  state: State;

  @Column({ type: 'enum', enum: GeneralSelection })
  Active: GeneralSelection;
}
