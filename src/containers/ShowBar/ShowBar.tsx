import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar.tsx";

interface ShowDetails {
  name: string;
  image?: {
    original?: string;
  };
  summary?: string;
  status: string;
}

const ShowBar = () => {
  const { id } = useParams<{ id: string }>();
  const [showDetails, setShowDetails] = useState<ShowDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      if (!id) {
        return;
      }

      try {
        const response = await axios.get(`http://api.tvmaze.com/shows/${id}`);
        setShowDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch show details");
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <p>{error}</p>;

  const imageUrl =
    showDetails?.image?.original ||
    "https://via.placeholder.com/200x300.png?text=No+Image+Available";

  const stripHtml = (html: string | undefined) => {
    return html ? html.replace(/<[^>]*>/g, "") : "";
  };

  return (
    <div>
      <SearchBar />
      <div className="show-bar-container">
        {showDetails && (
          <div className="show-card">
            <img src={imageUrl} alt={showDetails.name} className="show-image" />
            <div className="show-info">
              <h3>{showDetails.name}</h3>
              <p>{stripHtml(showDetails.summary)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBar;
