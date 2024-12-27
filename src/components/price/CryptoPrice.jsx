import { useEffect, useState } from "react";
import "./CryptoPrice.css";
import CoinCard from './CoinCard';

export default function CryptoPrice() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetch_coins() {
    const apiKey = "coinranking25512b12ba8ad166bd6874292d46375360dba7438c7a2e3b";

    try {
      const response = await fetch("https://api.coinranking.com/v2/coins", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const res = await response.json();
      setCoins(res.data.coins);
      setFilteredCoins(res.data.coins);
      setDataIsLoaded(true);
    } catch (error) {
      setError(error.message);
      setDataIsLoaded(true);
    }
  }

  useEffect(() => {
    fetch_coins();
  }, []);

  useEffect(() => {
    const filtered = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoins(filtered);
  }, [searchTerm, coins]);

  if (!dataIsLoaded) {
    return <div className="loading">Loading cryptocurrencies...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className={'heading'}>Live price of top Cryptocurrencies</h1>
      <input
        type="text"
        placeholder="Search for a coin..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <CoinCard coins={filteredCoins} dataIsLoaded={dataIsLoaded} />
      </div>
    </div>
  );
}
