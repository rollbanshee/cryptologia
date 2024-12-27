import "./CoinCard.css";

export default function CoinCard(props) {
  return (
    <div className="cards-section">
      {!props.dataisloaded
        ? props.coins.map((coin) => {
          return (
            <div className="coin-card" key={coin.id}>
              <div className="top-card">
                <img className="coin-image" src={coin.iconUrl} alt="error-loading-image"></img>
              </div>
              <div className="bottom-card">
                <h1 className="card-heading">{coin.name}</h1>
                <h2 className="card-symbol">({coin.symbol})</h2>
                <p className="card-price">Price: {coin.price}</p>
                <p className="card-market-cap">Market Cap: {coin.marketCap}</p>
              </div>
            </div>
          );
        })
        : ""}
    </div>
  );
}