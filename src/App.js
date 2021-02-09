import React, { useState, useEffect } from "react";

const url = "https://type.fit/api/quotes";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    const response = await fetch(url);
    const newQuotes = await response.json();
    setQuotes(newQuotes);
    setLoading(false);
  };

  const randomQuote = () => {
    console.log(quotes);
    let randomNumber = Math.floor(Math.random() * quotes.length);

    if (randomNumber === number) {
      randomNumber = number + 1;
    }
    setNumber(randomNumber);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      {quotes.length && <h2>{quotes[number].text}</h2>}
      {quotes.length && <h4>{quotes[number].author}</h4>}
      <button onClick={() => randomQuote()}>New quote</button>
    </div>
  );
}

export default App;
