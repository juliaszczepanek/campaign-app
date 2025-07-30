import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';

export default function CampaignListPage({ campaigns, deleteCampaign }) {
    return (
      <div className='campaign'>
        {campaigns.map((campaign) => (
          <article className="campaign-card" key={campaign.id}>
            <div className="campaign-card__header">
              <h3 className="campaign-card__title">{campaign.name}</h3>
              <span className={`campaign-card__status ${campaign.status === 'on' ? 'online' : 'offline'}`} />
            </div>
  
            <div className="campaign-card__tags">
              {campaign.keywords.map((keyword, index) => (
                <span className="tag" key={index}>{keyword}</span>
              ))}
            </div>
  
            <div className="campaign-card__details">
              <p><strong>Bid amount:</strong> {campaign.bid}</p>
              <p><strong>Campaign Fund:</strong> {campaign.fund}</p>
              <p><strong>Town:</strong> {campaign.town}</p>
              <p><strong>Radius:</strong> {campaign.radius} km</p>
            </div>
  
            <div className="campaign-card__actions">
              <Link to={`/edit/${campaign.id}`} className="action-btn"><EditIcon sx={{fontSize: "2rem"}}/></Link>
              <button className="action-btn" onClick={() => deleteCampaign(campaign.id)}><DeleteForeverIcon sx={{fontSize: "2rem"}}/></button>
            </div>
          </article>
        ))}
      </div>
    );
  }
  