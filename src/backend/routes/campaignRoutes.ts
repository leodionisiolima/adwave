import { CampaignService } from '../services/campaignService';
import { Router } from 'express';
import { validate } from 'class-validator';
import { Campaign } from '../entities/Campaign';

const router = Router();
const campaignService = new CampaignService();

router.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar campanhas.', error });
  }
});

router.post('/campaigns', async (req, res) => {
  const { name, message, sendDate } = req.body;

  // Cria uma nova instância de Campaign e define os valores recebidos
  const newCampaign = new Campaign();
  newCampaign.name = name;
  newCampaign.messages = message;  // Assumindo que message seja um array de mensagens
  newCampaign.createdAt = new Date(sendDate);

  // Valida os dados da campanha antes de continuar
  const errors = await validate(newCampaign);
  if (errors.length > 0) {
    // Retorna erros de validação se houver
    return res.status(400).json({ errors });
  }

  try {
    // Cria a campanha após a validação
    const createdCampaign = await campaignService.createCampaign(newCampaign);
    res.status(201).json(createdCampaign);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar campanha.', error });
  }
});

export default router;
