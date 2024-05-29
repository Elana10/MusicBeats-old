import React from "react";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
      <div className="the-container">
        <div className="loading-spinner">
          This may take a minute...           
        </div>
        <iframe
        src="https://giphy.com/embed/xTk9ZvMnbIiIew7IpW"
        width="300"
        height="300"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
        title="Giphy Embed"
      ></iframe>
      </div>
  );
}

export default LoadingSpinner;