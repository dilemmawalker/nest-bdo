import { Injectable } from '@nestjs/common';
import { Cluster } from '@shared/app/schemas/users/cluster.schema';
import { ClusterRepository } from './cluster.repository';
import { ClusterDto } from './dtos/cluster.dto';

@Injectable()
export class ClusterService {
  constructor(private readonly clusterRepository: ClusterRepository) {}

  async createCluster(clusterDto: ClusterDto): Promise<Cluster> {
    return await this.clusterRepository.create(clusterDto);
  }

  async findOne(clusterName: string): Promise<Cluster> {
    return await this.clusterRepository.findOne({ name: clusterName });
  }

  async getClusters(): Promise<Cluster[]> {
    return await this.clusterRepository.find();
  }
}
