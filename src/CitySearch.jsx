import { useState, useEffect } from 'react';
import "./CitySearch.css";

const CitySearch = () => {

  const [cities, setCities] = useState([]);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  
  useEffect(() => {
    fetch('/cities.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCities(data);
      })
      .catch((error) => console.error('Error fetching cities:', error));
  }, []);

 
  useEffect(() => {
    if (query === '' || query[0] === query[0].toLowerCase()) {
      setSuggestions([]);
      return;
    }
    
    const filteredCities = cities.filter((city) => {
     
      return city[0] === city[0].toUpperCase() && 
             city.toLowerCase().startsWith(query.toLowerCase());
    });

    setSuggestions(filteredCities);
  }, [query, cities]);

 
  const handleChange = (event) => {
    setQuery(event.target.value);
  };


  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion); 
    setSuggestions([]);  
  };


  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a city"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
