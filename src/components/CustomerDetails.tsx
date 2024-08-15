import React, { useEffect, useState } from 'react';
import { Customer } from '../types';

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const randomPage = Math.floor(Math.random() * 100) + 1; // Generate a random page number
        const response = await fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=9`); // fetch images
        const data = await response.json();
        const urls = data.map((photo: any) => photo.download_url);
        console.log('Fetched URLs:', urls);
        setPhotos(urls);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
 // changing images in 10 seconds
    const interval = setInterval(() => {
      fetchPhotos();
    }, 10000);

    return () => clearInterval(interval);
  }, [customer]);

  return (
    <div className="w-2/3 p-8">
      <h2 className="text-2xl font-bold mb-4">{customer.name}</h2>
      <p className="text-lg mb-2">{customer.title}</p>
      <p className="mb-4">{customer.address}</p>
      <div className="grid grid-cols-3 gap-4">
        {photos.map((url, index) => (
          <img key={index} src={url} alt={`Customer ${customer.id} Photo ${index + 1}`} className="w-full h-32 object-cover rounded" />
        ))}
      </div>
    </div>
  );
}

export default CustomerDetails;
