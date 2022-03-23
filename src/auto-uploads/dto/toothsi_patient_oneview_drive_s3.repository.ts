import { EntityRepository, Repository } from 'typeorm';
import { toothsi_patient_oneview_drive_s3 } from './toothsi_patient_oneview_drive_s3.entity';

// @EntityRepository(AutoUpload)
@EntityRepository(toothsi_patient_oneview_drive_s3)
export class Toothsi_patient_oneview_drive_s3 extends Repository<toothsi_patient_oneview_drive_s3> {}
