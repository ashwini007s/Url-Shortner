import { useState } from 'react';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const response = await fetch('http://localhost:5000/api/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: longUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || 'Something went wrong');
      }

      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="app-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <main className="main-card glass-panel">
        <header className="header">
          <h1 className="title">
            <span className="gradient-text">Link</span> Shrinker
          </h1>
          <p className="subtitle">Transform your long, messy links into clean, shareable URLs.</p>
        </header>

        <form className="url-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="url"
              className="url-input"
              placeholder="Paste your long URL here..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Shortening...' : 'Shorten'}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>

        {shortUrl && (
          <div className="result-container fade-in">
            <p className="result-label">Your shortened URL:</p>
            <div className="result-box">
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="short-link">
                {shortUrl}
              </a>
              <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={copyToClipboard} aria-label="Copy to clipboard">
                {copied ? (
                  <span className="copied-text">Copied to clipboard</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
