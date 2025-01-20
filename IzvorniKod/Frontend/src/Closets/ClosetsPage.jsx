import React, { useState, useEffect } from "react";
import ClosetsHeader from "../ClosetsHeader/ClosetsHeader.jsx";
import ClosetList from "./ClosetList";
import LocationList from "./LocationList";
import AddArticleModal from "./AddArticleModal";
import DeleteClosetModal from "./DeleteClosetModal.jsx";
import DeleteLocationModal from "./DeleteLocationModal.jsx";
import ArticleModal from "./ArticleModal";
import ArticleList from "./ArticleList";
import "./ClosetsPage.css";
import { useLocation } from "react-router-dom";

export default function ClosetsPage() {
  const [closets, setClosets] = useState([]);
  const [selectedCloset, setSelectedCloset] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [articles, setArticles] = useState([]);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [newArticle, setNewArticle] = useState({
    sharing: false,
    title: "",
    img: null,
    category: "",
    season: "",
    openness: "",
    howCasual: "",
    mainColor: "",
    sideColor: "",
    descript: "",
  });
  const [error, setError] = useState(null);
  const [showDeleteClosetModal, setShowDeleteClosetModal] = useState(false);
  const [showDeleteLocationModal, setShowDeleteLocationModal] = useState(false);
  const [closetToDelete, setClosetToDelete] = useState(null);
  const [locationToDelete, setLocationToDelete] = useState(null);

  const categories = [
    "MAJICA",
    "KOŠULJA",
    "TRENIRKA_GORNJI_DIO",
    "TRENIRKA_DONJI_DIO",
    "TRAPERICE",
    "CIPELE",
    "TENISICE",
    "ČIZME",
    "ŠTIKLE",
    "HALJINA",
    "SUKNJA",
    "JAKNA",
    "KAPUT",
  ];
  const seasons = ["PROLJEĆE", "LJETO", "JESEN", "ZIMA"];
  const opennessOptions = ["OTVORENO", "ZATVORENO", "KIŠA_SNIJEG", null];
  const casualnessOptions = [
    "ZA_DOMA",
    "SPORTSKO",
    "LEŽERNO",
    "RADNO",
    "SVEČANO",
  ];
  const colors = [
    "BIJELA",
    "SIVA",
    "CRNA",
    "CRVENA",
    "PLAVA",
    "ŽUTA",
    "ZELENA",
    "LJUBIČASTA",
    "NARANČASTA",
    "SMEĐA",
    "ROZA",
    "BEŽ",
  ];
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const location = useLocation();
  const { closetIndex, locationIndex, articleId } = location.state || {};
  const [highlightedArticle, setHighlightedArticle] = useState(null);

  // Handle closetIndex from location.state
  useEffect(() => {
    if (closetIndex != null && closets.length > 0) {
      const targetCloset = closets[closetIndex];
      if (targetCloset) {
        handleSelectCloset(targetCloset);
      }
    }
  }, [closetIndex, closets]);

  // Handle locationIndex from location.state
  useEffect(() => {
    if (locationIndex != null && locations.length > 0) {
      const targetLocation = locations[locationIndex];
      if (targetLocation) {
        handleSelectLocation(targetLocation);
      }
    }
  }, [locationIndex, locations]);

  useEffect(() => {
    if (articleId && articles.length > 0) {
      setHighlightedArticle(articleId);
    }
  }, [articleId, articles]);

  useEffect(() => {
    return () => {
      setHighlightedArticle(null);
    };
  }, [selectedCloset, selectedLocation]);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
  };

  const handleCloseArticleModal = () => {
    setIsArticleModalOpen(false);
    setSelectedArticle(null);
  };
  const fetchClosets = async () => {
    try {
      const response = await fetch("/api/user/profile/allClosets", {
        method: "GET",
        credentials: "include", // Include cookies for authentication
      });
      if (!response.ok) throw new Error("Failed to fetch closets");
      const data = await response.json();
      setClosets(data);
    } catch (err) {
      console.error("Error fetching closets:", err);
      setError("Failed to load closets.");
    }
  };

  const fetchLocations = async (closetId) => {
    try {
      const response = await fetch(
        `/api/user/profile/closet${closetId}/allLocations`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch locations");
      const data = await response.json();
      setLocations(data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching locations:", err);
      setError("Failed to load locations.");
    }
  };

  const fetchArticles = async (locationId) => {
    try {
      const response = await fetch(
        `/api/user/profile/location${locationId}/allArticles`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch articles");
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to load articles.");
    }
  };
  const handleAddLocation = async (type) => {
    if (!selectedCloset) {
      setError("No closet selected!");
      return;
    }
    try {
      const response = await fetch(
        `/api/user/profile/closet${selectedCloset.closetId}/addLocation`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tipLokacije: type }),
        }
      );
      console.log("Selected Closet:", selectedCloset);
      if (!response.ok) throw new Error("Failed to create a new location");
      await fetchLocations(selectedCloset.closetId);
    } catch (err) {
      console.error("Error adding location:", err);
      setError("Failed to create a new location.");
    }
  };

  const handleAddArticle = async () => {
    try {
      const response = await fetch(
        `/api/user/profile/location${selectedLocation.locationId}/addArticle`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newArticle),
        }
      );
      if (!response.ok) throw new Error("Failed to add article");
      setShowArticleModal(false);
      fetchArticles(selectedLocation.locationId);
    } catch (err) {
      console.error("Error adding article:", err);
      setError("Failed to add article.");
    }
  };

  const handleAddCloset = async () => {
    try {
      const response = await fetch("/api/user/profile/addCloset", {
        method: "POST",
        credentials: "include", // Include cookies for authentication
      });
      if (!response.ok) throw new Error("Failed to create a new closet");

      // Fetch updated closet list after successful addition
      await fetchClosets();
    } catch (err) {
      console.error("Error creating closet:", err);
      setError("Failed to create a new closet.");
    }
  };

  const handleSelectCloset = (closet) => {
    console.log("Selected Closet:", closet);
    setSelectedCloset(closet);
    setSelectedLocation(null);
    setArticles([]);
    fetchLocations(closet.closetId);
  };

  const handleSelectLocation = (location) => {
    console.log("Selected location:", location);
    console.log("Selected Location ID:", selectedLocation?.locationId);
    setSelectedLocation(location);
    fetchArticles(location.locationId).then(() => {
      if (articleId) {
        setHighlightedArticle(articleId); // Ensure article is highlighted after articles load
      }
    });
  };

  // Delete a closet
  const handleDeleteCloset = async (closetId) => {
    try {
      const response = await fetch(
        `/api/user/profile/deleteCloset${closetId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to delete closet");

      if (selectedCloset && selectedCloset.closetId === closetId) {
        setSelectedCloset(null);
        setLocations([]);
        setArticles([]);
        setSelectedLocation(null);
      }
      // Update the closets list after deletion
      await fetchClosets();
    } catch (err) {
      console.error("Error deleting closet:", err);
      setError("Failed to delete closet.");
    }
  };

  // Delete a location
  const handleDeleteLocation = async (locationId) => {
    try {
      const response = await fetch(
        `/api/user/profile/deleteLocation${locationId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to delete location");
      if (selectedLocation && selectedLocation.locationId === locationId) {
        setSelectedLocation(null);
        setArticles([]);
      }
      // Update the locations list after deletion
      if (selectedCloset) await fetchLocations(selectedCloset.closetId);
    } catch (err) {
      console.error("Error deleting location:", err);
      setError("Failed to delete location.");
    }
  };
  const handleDeleteArticle = async (articleId) => {
    try {
      const response = await fetch(
        `/api/user/profile/deleteArticle${articleId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to delete article");

      // Close the modal and refresh the articles list
      setIsArticleModalOpen(false);
      fetchArticles(selectedLocation.locationId);
    } catch (err) {
      console.error("Error deleting article:", err);
      setError("Failed to delete article.");
    }
  };

  // Fetch closets on mount
  useEffect(() => {
    fetchClosets();
  }, []);

  return (
    <div className="closets-page">
      <ClosetsHeader />
      <div className="closets-container">
        <ClosetList
          closets={closets}
          selectedCloset={selectedCloset}
          handleSelectCloset={handleSelectCloset}
          handleDeleteCloset={handleDeleteCloset}
          setClosetToDelete={setClosetToDelete}
          setShowDeleteClosetModal={setShowDeleteClosetModal}
          handleAddCloset={handleAddCloset}
        />
        {selectedCloset && (
          <LocationList
            locations={locations}
            selectedLocation={selectedLocation}
            handleAddLocation={handleAddLocation}
            handleSelectLocation={handleSelectLocation}
            handleDeleteLocation={handleDeleteLocation}
            setLocationToDelete={setLocationToDelete}
            setShowDeleteLocationModal={setShowDeleteLocationModal}
          />
        )}
        {selectedLocation && (
          <ArticleList
            articles={articles}
            setShowArticleModal={setShowArticleModal}
            onArticleClick={handleArticleClick}
            highlightedArticle={highlightedArticle}
          />
        )}
        {isArticleModalOpen && selectedArticle && (
          <ArticleModal
            article={selectedArticle}
            onClose={handleCloseArticleModal}
          />
        )}
      </div>
      {showArticleModal && (
        <AddArticleModal
          newArticle={newArticle}
          setNewArticle={setNewArticle}
          handleAddArticle={handleAddArticle}
          setShowArticleModal={setShowArticleModal}
          categories={categories}
          seasons={seasons}
          opennessOptions={opennessOptions}
          casualnessOptions={casualnessOptions}
          colors={colors}
        />
      )}
      {showDeleteClosetModal && (
        <DeleteClosetModal
          closetToDelete={closetToDelete}
          closets={closets}
          handleDeleteCloset={handleDeleteCloset}
          setShowDeleteClosetModal={setShowDeleteClosetModal}
        />
      )}
      {showDeleteLocationModal && (
        <DeleteLocationModal
          locationToDelete={locationToDelete}
          locations={locations}
          handleDeleteLocation={handleDeleteLocation}
          setShowDeleteLocationModal={setShowDeleteLocationModal}
        />
      )}
      {isArticleModalOpen && selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={handleCloseArticleModal}
          onDelete={handleDeleteArticle}
        />
      )}
    </div>
  );
}
