"use client";

import { useEffect, useState } from "react";

export default function Quotes() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Fetches quote from API and randomly selects one
  const fetchQuote = async () => {
    try {
      const response = await fetch("/api/quotes");
      const fresponse = await response.json();

      if (fresponse.finalresponse && fresponse.finalresponse.length > 0) {
        // Randomly pick a quote from the response
        const randomIndex = Math.floor(Math.random() * fresponse.finalresponse.length);
        setQuote(fresponse.finalresponse[randomIndex].q);
        setAuthor(fresponse.finalresponse[randomIndex].a);
      }
    } catch (error) {
      console.error("Error fetching the quote:", error);
    }
  };

  // Set isMobile based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initialize on mount
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Load initial quote
    fetchQuote();

    // Reload quote every 30 seconds
    const interval = setInterval(fetchQuote, 30000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: isMobile ? "78vw" : "20vw",
        backgroundColor: "#e3d5ca",
        height: "50vh",
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        fontSize: "3vh",
        textAlign: "center",
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <div>
        {quote ? (
          <>
            <p>{quote}</p>
            <p style={{ marginTop: "10px", fontStyle: "italic" }}>~ {author}</p>
          </>
        ) : (
          <p>Loading quote...</p>
        )}
      </div>
    </div>
  );
}
