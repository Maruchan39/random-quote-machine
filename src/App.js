import React, { useState, useEffect } from "react";
import "./index.css";
import { FaTwitterSquare } from "react-icons/fa";

const url = "https://type.fit/api/quotes";

// Work more on landscape view
// Inspect tweeting

function App() {
  const [quotes, setQuotes] = useState([]);
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [visibility, setVisibility] = useState(true);

  const fadeout = () => {
    setVisibility(false);
  };

  const fetchQuotes = async () => {
    const response = await fetch(url);
    const newQuotes = await response.json();
    setQuotes(newQuotes);
    setNumber(Math.floor(Math.random() * newQuotes.length));
    setLoading(false);
  };

  const randomQuote = () => {
    let randomNumber = Math.floor(Math.random() * quotes.length);

    if (randomNumber === number && randomNumber !== quotes.length) {
      randomNumber = number + 1;
    }
    setNumber(randomNumber);
    setVisibility(true);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  if (loading) {
    return <h2 className="text-center">Loading...</h2>;
  }

  return (
    <div className="mx-auto" id="quote-box">
      {quotes.length && (
        <h2 className={`${!visibility && "fade-out"}`} id="text">
          {quotes[number].text}
        </h2>
      )}
      {quotes.length && (
        <h4 className={`${!visibility && "fade-out"}`} id="author">
          {quotes[number].author}
        </h4>
      )}
      <div className="btn-group" role="group">
        <a
          href="https://twitter.com/share?ref_src=twsrc%5Etfw"
          id="twitter-share-button"
          className="btn"
          data-show-count="false"
          target="_blank"
        >
          <FaTwitterSquare size="3rem" color="black" />
        </a>
        <button
          className="btn btn-light"
          id="new-quote"
          onClick={() => {
            fadeout();
            setTimeout(randomQuote, 1000);
          }}
        >
          New quote
        </button>
      </div>
    </div>
  );
}

export default App;
