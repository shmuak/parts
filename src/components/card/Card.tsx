import React, { useState } from 'react';
import { fetchManufacturerDetails } from '../../data/dataDetails';
import { CardProps, ManufacturerDetails } from '../../types/types';
import up from '../../assets/img/up.png';
import down from '../../assets/img/down.png';

import './Card.scss'

export const Card: React.FC<CardProps> = ({
  ManufacturerId,
  Name,
  ManufacturerName,
  URL,
}) => {
  const [details, setDetails] = useState<ManufacturerDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleManufacturerClick = async () => {
    if (!isExpanded) {
      if (!ManufacturerId) {
        setError('Manufacturer ID is missing');
        return;
      }
    
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchManufacturerDetails(ManufacturerId);
        
        if (data.length > 0) {
          setDetails(data[0]);
        } else {
          setError('No details found for this manufacturer');
        }
      } catch (error) {
        setError('Failed to load manufacturer details');
        console.error('Error details:', error);
      } finally {
        setLoading(false);
      }
    }
    
    setIsExpanded(!isExpanded);
  };
  
  return (
    <li>
      <div className='card-wrapper'>
        <h3>{Name}</h3>
        <div 
          onClick={handleManufacturerClick}
          className='card-mnf'
          >
          <span 
            className='card-name'
          >
            {ManufacturerName}
          </span>
          <button
            className='expand-button'
            
          >
            <img 
              src={isExpanded ? up : down} 
              alt={isExpanded ? "Collapse" : "Expand"}
            />
          </button>
        </div>
        {URL && (
          <div>
            <a href={URL} target="_blank" rel="noopener noreferrer">
              Product URL
            </a>
          </div>
        )}

        {loading && <div>Loading details...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {isExpanded && details && (
          <div>
            <h4>Manufacturer Details:</h4>
            <p><strong>Name:</strong> {details.Mfr_Name}</p>
            
            <p><strong>Address:</strong> {[
              details.Address,
              details.City,
              details.StateProvince,
              details.PostalCode
            ].filter(Boolean).join(', ')}</p>
            <p><strong>Country:</strong> {details.Country}</p>
            <p><strong>Contacts:</strong> {[
              details.ContactPhone && `Phone: ${details.ContactPhone}`,
              details.ContactEmail && `Email: ${details.ContactEmail}`
            ].filter(Boolean).join(' | ')}</p>
            <p></p>
            {details.WebURL && (
              <p>
                <strong>Website:</strong>{' '}
                <a href={details.WebURL} target="_blank" rel="noopener noreferrer">
                  {details.WebURL}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </li>
  );
};