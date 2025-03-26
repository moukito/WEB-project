import React, { useState } from 'react';

export default function PriceButton() {
  const [showInput, setShowInput] = useState(false); // Toggle input visibility
  const [minPrice, setMinPrice] = useState(""); // Minimum price
  const [maxPrice, setMaxPrice] = useState(""); // Maximum price
  const [error, setError] = useState(""); // Error message

  // Toggle the visibility of input fields
  const handleClick = () => {
    setShowInput(!showInput);
    setError(""); // Clear the error message every time the button is clicked
  };

  // Check if the prices are valid when the "Check Prices" button is clicked
  const handleCheckPrices = () => {
    if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
      setError("La borne minimum doit être inférieure à la borne maximum"); // Display error message
    } else {
      setError(""); // Clear error message if the prices are valid
    }
  };

  return (
    <div>
      <button 
        className="px-4 py-2 bg-blue-500 text-black rounded" 
        onClick={handleClick}
      >
        Prix
      </button>

      {showInput && (
        <div className="mt-4">
          <div>
            <label>prix borne minimum:</label>
            <input 
              type="number" 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)} 
              className="px-2 py-1 border rounded"
            />
          </div>
          <div className="mt-2">
            <label>prix borne maximum:</label>
            <input 
              type="number" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)} 
              className="px-2 py-1 border rounded"
            />
          </div>
          <button 
            className="mt-4 px-4 py-2 bg-green-500 text-black rounded"
            onClick={handleCheckPrices}
          >
            Check Prices
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
        </div>
      )}
    </div>
  );
}