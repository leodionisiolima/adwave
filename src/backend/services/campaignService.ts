import { Campaign } from '/home/leo/Projects/adwave/src/backend/entities/campaign.ts';
import { AppDataSource } from '/home/leo/Projects/adwave/src/backend/db.ts'; // Certifique-se de que o caminho de 'AppDataSource' está correto
import { Repository } from 'typeorm';

export class CampaignService {
  private campaignRepository: Repository<Campaign>;

  constructor() {
    // Inicializa o repositório de Campaign
    this.campaignRepository = AppDataSource.getRepository(Campaign);
  }

  // Criação de uma nova campanha
  async createCampaign(name: string, message: string) {
    const newCampaign = this.campaignRepository.create({
      name,
      messages,
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
