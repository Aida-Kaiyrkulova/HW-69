import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface ShowDetails {
  name: string;
  image?: {
    original?: string;
  };
  summary: string;
  }

const ShowBar = () => {
  const { id } = useParams<{ id: string }>();
  const [showDetails, setShowDetails] = useState<ShowDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`http://api.tvmaze.com/shows/${id}`);
        setShowDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch show details');
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const imageUrl = showDetails?.image?.original || 'https://via.placeholder.com/200x300.png?text=No+Image+Available';

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  return (
    <div className="show-bar-container">
      {showDetails && (
        <div className="show-card">
          <img src={imageUrl} alt={showDetails.name} className="show-image"/>
          <div className="show-info">
            <h3>{showDetails.name}</h3>
          <p>{stripHtml(showDetails.summary)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBar;