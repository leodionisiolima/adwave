import { CampaignService } from '../services/campaignService';
import { Router } from 'express';
import { validate } from 'class-validator';
import { Campaign } from '../entities/Campaign';

const router = Router();
const campaignService = new CampaignService();

// Rota para obter todas as campanhas
router.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    res.json(campaigns); // Retorna todas as campanhas em formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar campanhas.', error }); // Tratamento de erro
  }
});

// Rota para criar uma nova campanha
router.post('/campaigns', async (req, res) => {
  const { name, message, sendDate } = req.body;

  // Cria uma nova instância de Campaign e define os valores recebidos
  const newCampaign = new Campaign();
  newCampaign.name = name;
  newCampaign.messages = message; // Supondo que message seja um array de mensagens ou um campo string
  newCampaign.createdAt = new Date(sendDate); // Define a data de criação a partir do sendDate enviado pelo cliente

  // Valida os dados da campanha antes de continuar
  const errors = await validate(newCampaign);
  if (errors.length > 0) {
    // Retorna erros de validação se houver
    return res.status(400).json({ errors }); // Retorna erros de validação em formato JSON
  }

  try {
    // Cria a campanha após a validação
    const createdCampaign = await campaignService.createCampaign(newCampaign.name, newCampaign.messages);
    res.status(201).json(createdCampaign); // Retorna a campanha criada
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar campanha.', error }); // Tratamento de erro
  }
});

export default router;
