import CampaignForm from "../components/CampaignForm";
import React from "react";
import { useNavigate } from "react-router-dom";

function CreateCampaignPage({ addCampaign, balance }) {
    const navigate = useNavigate();
  
    const handleCreate = (formData) => {
      addCampaign(formData);
      navigate('/');
    };
  
    return (
      <CampaignForm
        mode="create"
        onSubmit={handleCreate}
        balance={balance}
      />
    );
  }

export default CreateCampaignPage;
