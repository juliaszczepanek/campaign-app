import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import CampaignListPage from "./pages/CampaignListPage";
import CreateCampaignPage from "./pages/CreateCampaignPage";
import EditCampaignPage from "./pages/EditCampaignPage";
import { useState } from 'react';
import initialCampaigns from './data/campaigns.json';
import { getFromStorage, saveToStorage } from './utils/storage';


function App() {

  if (!localStorage.getItem("campaigns")) {
    localStorage.setItem("campaigns", JSON.stringify(initialCampaigns));
  }

  const [balance, setBalance] = useState(() =>
  getFromStorage('balance', 1000)
  );

  const [campaigns, setCampaigns] = useState(() =>
  getFromStorage('campaigns', initialCampaigns)
);

  const addCampaign = (newCampaign) => {
    const updated = [...campaigns, { ...newCampaign, id: Date.now() }];
    saveCampaignsToStorage(updated);
    updateBalance(balance - Number(newCampaign.fund));
  };

  const updateCampaign = (updatedCampaign) => {
    const updated = campaigns.map((c) =>
      c.id === updatedCampaign.id ? updatedCampaign : c
    );
    saveCampaignsToStorage(updated);
  };


  const deleteCampaign = (id) => {
    const campaignToDelete = campaigns.find((c) => c.id === id);
    const updated = campaigns.filter((c) => c.id !== id);
    saveCampaignsToStorage(updated);
  
    if (campaignToDelete) {
      const refunded = balance + Number(campaignToDelete.fund);
      updateBalance(refunded);
    }
  };

  const saveCampaignsToStorage = (data) => {
    setCampaigns(data);
    saveToStorage('campaigns', data);
  };

  const updateBalance = (newValue) => {
    setBalance(newValue);
    saveToStorage('balance', newValue);
  };

  const routing = [
    { path: "/", element: <CampaignListPage campaigns={campaigns} deleteCampaign={deleteCampaign} /> },
    { path: "/create", element: <CreateCampaignPage addCampaign={addCampaign} balance={balance} /> },
    { path: "/edit/:id", element: <EditCampaignPage campaigns={campaigns} updateCampaign={updateCampaign} /> },
  ];

  return (
    <Router>
      <Navigation  balance={balance}/>
      <main className="container">
        <Routes>
          {routing.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </Router>
  );
}

export default App
