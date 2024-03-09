import React, { useState, useEffect } from 'react';
import './beer.css';

function BeerCard({ beer }) {
  return (
    <div className="beer-card">
      <img src={beer.image_url} alt={beer.name} />
      <h2>{beer.name}</h2>
      <p>{beer.tagline}</p>
      <p>ABV: {beer.abv}%</p>
      <p>IBU: {beer.ibu}</p>
      <p>Description: {beer.description}</p>
    </div>
  );
}

const Beer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [beers, setBeers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);

  useEffect(() => {
    async function fetchBeers() {
      try {
        const response = await fetch('https://api.punkapi.com/v2/beers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBeers(data);
      } catch (error) {
        console.error('Error fetching beer data:', error);
      }
    }

    fetchBeers();
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = beers.filter((beer) =>
      beer.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBeers(filtered);
  };

  const beersToDisplay = searchTerm ? filteredBeers : beers;

  return (
    <div className="App">
      <h1>Beer Search</h1>
      <input
        type="text"
        placeholder="Search for a beer"
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="beer-container">
        {beersToDisplay.map((beer) => (
          <BeerCard key={beer.id} beer={beer} />
        ))}
      </div>
    </div>
  );
}

export default Beer;
