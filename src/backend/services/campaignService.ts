import { getRepository } from 'typeorm';
import { Campaign } from '/home/leo/Projects/adwave/backend/entities/Campaign';

export class CampaignService {
  private campaignRepository = getRepository(Campaign); // Inicializa o repositório de Campaign

  // Criação de uma nova campanha
  async createCampaign(name: string, message: string) {
    const newCampaign = this.campaignRepository.create({
      name,
      message,
      createdAt: new Date(), // Define a data de criação
      updatedAt: new Date(), // Caso use updatedAt, também pode ser necessário garantir esse campo na entidade
    });
    return await this.campaignRepository.save(newCampaign); // Salva a nova campanha
  }

  // Recupera todas as campanhas
  async getAllCampaigns() {
    return await this.campaignRepository.find(); // Retorna todas as campanhas do banco de dados
  }
}
