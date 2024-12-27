import { useState, useEffect } from 'react';
import './News.css';

export default function News() {
  const [news, setNews] = useState([]);
  const [likedNews, setLikedNews] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewLiked, setViewLiked] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      const newsapikey = "pub_6340641ef318eb1765148a1b82046d9630593";
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${newsapikey}&qInTitle=crypto&language=en`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        setNews(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const toggleLike = (link) => {
    setLikedNews((prev) => {
      const updated = { ...prev };
      if (updated[link]) {
        delete updated[link];
      } else {
        const likedArticle = news.find((article) => article.link === link);
        updated[link] = likedArticle;
      }
      return updated;
    });
  };

  const displayedNews = viewLiked ? Object.values(likedNews) : news;

  if (loading) {
    return <div className='loading'>Loading news...</div>;
  }

  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  return (
    <div className="news-container">
      <h3 className="heading">{viewLiked ? 'Liked News' : 'News articles related to crypto'}</h3>
      <button className="toggle-button" onClick={() => setViewLiked(!viewLiked)}>
        {viewLiked ? 'View All News' : 'View Liked News'}
      </button>
      {displayedNews.length === 0 ? (
        <p className='no-articles'>No articles to display</p>
      ) : (
        displayedNews.map((value) => (
          <div className="card" key={value.link}>
            {value.image_url ? (
              <img className="news-image" src={value.image_url} alt="news" />
            ) : (
              <div className="news-image">No image available</div>
            )}
            <div className="text-container">
              <h2 className="title">{value.title}</h2>
              <p className="author">
                <strong>News</strong> by {value.creator} / {new Date(value.pubDate).toDateString()}
              </p>
              <p className="description">{value.description}</p>
              <div className='buttons'>
                <a href={value.link} target="_blank" rel="noreferrer" className="link-button">
                  Read more
                </a>
                <button
                  className={`link-button ${likedNews[value.link] ? 'liked' : ''}`}
                  onClick={() => toggleLike(value.link)}
                >
                  {likedNews[value.link] ? 'Unlike' : '👍 Like'}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
