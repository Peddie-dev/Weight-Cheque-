import React, { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch latest articles from CMS
    fetch("https://your-cms-api.com/articles?limit=3") // Fetch latest 3 articles
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-32 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-4">{article.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{article.excerpt}</p>
            <a
              href={`/articles/${article.id}`}
              className="text-primary font-bold mt-4 inline-block"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
