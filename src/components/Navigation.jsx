import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CampaignIcon from '@mui/icons-material/Campaign';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useIsMobile } from '../hooks/useIsMobile'; 


export default function Navigation({ balance }) {
  const isMobile = useIsMobile()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <CampaignIcon sx={{ fontSize: '2.2rem' }} />
        <span>Campaign Manager</span>
      </div>

      <div className="navbar__right">
        {isMobile ? (
          <>
            <IconButton onClick={handleMenuOpen}>
              <MenuIcon sx={{ color: '#000', fontSize: "2rem" }} />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/" className="navbar__link">Campaigns</Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/create" className="navbar__link">+ Add Campaign</Link>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Link to="/" className="navbar__link">Campaigns</Link>
            <Link to="/create" className="navbar__link">+ Add Campaign</Link>
          </>
        )}
        <span className="navbar__balance" style={{ fontSize: isMobile ? '0.9rem' : '1.2rem' }}>
          <strong>Balance:</strong> {balance} $
        </span>
      </div>
    </nav>
  );
}