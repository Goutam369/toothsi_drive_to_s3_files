import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.enum';
import { GeneralSelection } from './generalSelection.enum';
import { State } from './state.enum';
import { SubCategory } from './subCategory.enum';
import { toothsi_drive_to_s3_files } from './toothsi_drive_to_s3_files.entity';

@Entity()
export class toothsi_patient_oneview_drive_s3 {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @Column()
  //   toothsi_drive_to_s3_files_id: string;

  @OneToOne(() => toothsi_drive_to_s3_files)
  @JoinColumn()
  toothsi_drive_to_s3: toothsi_drive_to_s3_files;
  @Column('enum', {
    name: 'Category',
    enum: Category,
  })
  @Column({ type: 'enum', enum: Category })
  category: string;

  @Column({ type: 'enum', enum: SubCategory })
  subCategory: string;

  @Column()
  category_id: string;
}
