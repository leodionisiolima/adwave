import { CampaignService } from '../services/campaignService';
import { Router } from 'express';

const router = Router();
const campaignService = new CampaignService();

router.get('/campaigns', async (req, res) => {
  const campaigns = await campaignService.getAllCampaigns();
  res.json(campaigns);
});

router.post('/campaigns', async (req, res) => {
  const { name, message } = req.body;
  const newCampaign = await campaignService.createCampaign(name, message);
  res.json(newCampaign);
});

export default router;

