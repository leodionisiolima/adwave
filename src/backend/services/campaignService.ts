import { getRepository } from 'typeorm';
import { Campaign } from '../entities/Campaign';

export class CampaignService {
  private campaignRepository = getRepository(Campaign);

  async createCampaign(name: string, message: string) {
    const newCampaign = this.campaignRepository.create({
      name,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.campaignRepository.save(newCampaign);
  }

  async getAllCampaigns() {
    return this.campaignRepository.find();
  }
}

