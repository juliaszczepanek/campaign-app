import React, { useState } from 'react';
import {
  Input,
  Typography,
  Grid,
  Button,
  Select,
  Option,
  Switch
} from '@mui/joy';

export default function CampaignForm({ onSubmit, initialData }) {
    const [form, setForm] = useState(() =>
    initialData
      ? {
          ...initialData,
          keywords: initialData.keywords.join(', '), 
          town: initialData.town[0] || '', 
        }
      : {
          name: '',
          keywords: '',
          bid: '',
          fund: '',
          status: true,
          town: '',
          radius: ''
        }
  );
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const bid = parseFloat(form.bid);
    const fund = parseFloat(form.fund);

    if (isNaN(bid) || bid < 0 || isNaN(fund) || fund < 0) {
        alert("Bid amount and campaign fund must be non-negative numbers.");
        return;
      }
  
    const keywordsArray = form.keywords
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k !== '');
  
    const campaignData = {
      ...form,
      status: form.status ? "on" : "off",
      keywords: keywordsArray,
      town: [form.town] 
    };
  
    onSubmit(campaignData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const towns = ['Warsaw', 'Krakow', 'Gdansk', 'Wroclaw'];

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Typography level="h1" className="form__title" sx={{ fontSize: {
      xs: '1.6rem',  
      sm: '2.4rem', 
    }}} >Create Campaign</Typography>

      <label className="form__label">Campaign Name</label>
      <Input
      required
        placeholder="Q1 Product Launch"
        name="name"
        value={form.name}
        onChange={handleChange}
        sx={{p: "0.8rem", fontSize: "1.3rem"}}
      />

      <label className="form__label">Keywords</label>
      <Input
        placeholder="Values separated by comma example: marketing, product"
        name="keywords"
        required
        value={form.keywords}
        onChange={handleChange}
        endDecorator={<span>⚡</span>}
        sx={{p: "0.8rem", fontSize: "1.3rem"}}
      />

      <Grid container spacing={4}>
        <Grid xs={6} >
          <label className="form__label">Bid Amount</label>
          <Input
            placeholder="5"
            name="bid"
            type="number"
            value={form.bid}
            onChange={handleChange}
            endDecorator="zł"
            required
            inputProps={{ min: 0 }}
            sx={{ p: "0.8rem", fontSize: "1.3rem" }}
            error={form.bid !== '' && Number(form.bid) < 0}
            helperText={form.bid !== '' && Number(form.bid) < 0 ? 'Bid must be ≥ 0' : ''}
          />

        </Grid>
        <Grid xs={6}>
          <label className="form__label">Campaign Fund</label>
          <Input
            placeholder="500"
            name="fund"
            type="number"
            value={form.fund}
            onChange={handleChange}
            endDecorator="zł"
            required
            error={form.fund !== '' && Number(form.fund) < 0}
            helperText={form.fund !== '' && Number(form.fund) < 0 ? 'Fund must be ≥ 0' : ''}
            inputProps={{ min: 0 }}
            sx={{ p: "0.8rem", fontSize: "1.3rem" }}
          />
        </Grid>
      </Grid>

      <label className="form__label">Status</label>
      <Switch
        checked={form.status}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, status: e.target.checked }))
        }
        variant="soft"
        color={form.status ? 'success' : 'neutral'}
        endDecorator={form.status ? 'On' : 'Off'}
        sx={{p: "0.8rem", fontSize: "1.3rem"}}
      />

      <label className="form__label">Town</label>
      <Select
      required
        placeholder="Choose town"
        name="town"
        value={form.town}
        onChange={(e, val) => setForm((prev) => ({ ...prev, town: val }))}
        sx={{p: "0.8rem", fontSize: "1.3rem"}}
      >
        {towns.map((town) => (
          <Option key={town} value={town}>
            {town}
          </Option>
        ))}
      </Select>

      <label className="form__label">Radius</label>
      <Input
        placeholder="15"
        name="radius"
        type="number"
        required
        value={form.radius}
        onChange={handleChange}
        endDecorator="km"
        sx={{p: "0.8rem", fontSize: "1.3rem"}}
      />

        <Button type="submit" sx={{ p: 1, mt: 2,  fontSize: {
      xs: '1.1rem',  
      sm: '1.3rem', 
    }, fontFamily: 'Roboto, sans-serif' }}>
        Submit
      </Button> </form>
  );
}
