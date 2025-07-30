import { useParams, useNavigate } from 'react-router-dom';
import CampaignForm from '../components/CampaignForm';

export default function EditCampaignPage({ campaigns, updateCampaign }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaign = campaigns.find((c) => c.id === Number(id));

  const handleUpdate = (formData) => {
    updateCampaign({ ...formData, id: Number(id) });
    navigate('/');
  };

  if (!campaign) return <p>Campaign not found</p>;

  return (
    <CampaignForm
      mode="edit"
      onSubmit={handleUpdate}
      initialData={campaign}
    />
  );
}
