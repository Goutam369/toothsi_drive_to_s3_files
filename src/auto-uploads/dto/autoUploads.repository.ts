import { EntityRepository, Repository } from 'typeorm';
import { Status } from './status.enum';
import { CreateAutoUploadDto } from './create-autoUpload.dto';
import { GetAutoUploadsFilterDto } from './get-autoUploads-filter.dto';
import { AutoUpload } from './autoUpload.entity';

// @EntityRepository(AutoUpload)
@EntityRepository(AutoUpload)
export class AutoUploadsRepository extends Repository<AutoUpload> {
  async getAutoUpload(
    filterDto: GetAutoUploadsFilterDto,
  ): Promise<AutoUpload[]> {
    // console.log('Called in Repo');
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('autoUpload');

    if (status) {
      query.andWhere('autoUpload.status = :status', { status });
    }

    // if (search) {
    //   query.andWhere(
    //     'LOWER(product.title) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search)',
    //     { search: `%${search}%` },
    //   );
    // }

    const products = await query.getMany();
    return products;
  }

  async createAutoUpload(
    createAutoUploadDto: CreateAutoUploadDto,
  ): Promise<AutoUpload> {
    const { source } = createAutoUploadDto;
    const autoUpload = this.create({
      source,
      destination: 'N.A.',
      status: Status.NOT_DONE,
    });
    await this.save(autoUpload);
    return autoUpload;
  }
}
