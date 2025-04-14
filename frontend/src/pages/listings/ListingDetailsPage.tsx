import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

interface ListingImage {
  id: number;
  url: string;
  is_main: boolean;
}

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  owner_id: number;
  owner_name: string;
  status: string;
  images: ListingImage[];
  created_at: string;
  updated_at: string;
}

const ListingDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/api/v1/listings/${id}`);
        setListing(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load listing details');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleContactOwner = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/listings/${id}` } });
      return;
    }

    // Navigate to conversation with the owner
    navigate(`/messages?listing=${id}`);
  };

  const handlePreviousImage = () => {
    if (listing?.images.length) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    if (listing?.images.length) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading listing details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md">
        <p className="text-yellow-700">Listing not found</p>
      </div>
    );
  }

  // Find main image or use first image
  const mainImage = listing.images.find(img => img.is_main) || listing.images[0];
  const displayedImage = listing.images[currentImageIndex] || mainImage;

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col">
            <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden relative">
              {displayedImage ? (
                <img
                  src={displayedImage.url}
                  alt={listing.title}
                  className="w-full h-full object-center object-cover"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
              
              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    className="absolute left-4 top-1/2 -mt-4 h-8 w-8 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center"
                  >
                    &#10094;
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -mt-4 h-8 w-8 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center"
                  >
                    &#10095;
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail grid */}
            {listing.images.length > 1 && (
              <div className="mt-4 grid grid-cols-6 gap-2">
                {listing.images.map((image, idx) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative h-16 bg-gray-100 rounded-md overflow-hidden ${
                      currentImageIndex === idx ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-center object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Listing details */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{listing.title}</h1>
            
            <div className="mt-3">
              <p className="text-3xl text-gray-900">${listing.price.toLocaleString()}</p>
              <p className="mt-1 text-sm text-gray-500">per month</p>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-2 text-sm text-gray-700">
                    {listing.address}, {listing.city}, {listing.state} {listing.zip_code}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-b border-gray-200 py-4">
              <div>
                <p className="text-sm text-gray-500">Bedrooms</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{listing.bedrooms}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bathrooms</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{listing.bathrooms}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Area</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{listing.area} m²</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <div className="mt-2 prose prose-sm text-gray-500">
                <p>{listing.description}</p>
              </div>
            </div>

            <div className="mt-6 flex">
              <button
                onClick={handleContactOwner}
                className="flex-1 bg-primary-600 py-3 px-8 border border-transparent rounded-md font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Contact Owner
              </button>
              
              {/* Show edit button for owner */}
              {isAuthenticated && user && user.id === listing.owner_id && (
                <Link
                  to={`/owner/listings/edit/${listing.id}`}
                  className="ml-3 flex-1 bg-white py-3 px-8 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Edit Listing
                </Link>
              )}
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Listed by <span className="font-medium text-gray-900">{listing.owner_name}</span>
              </p>
              <p className="text-sm text-gray-500">
                Posted on {new Date(listing.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage; 