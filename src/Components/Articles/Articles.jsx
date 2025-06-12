import React, { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:1337/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Latest Articles</h1>
        <p className="text-gray-500">Loading articles...</p>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Latest Articles</h1>
        <p className="text-gray-500">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        Explore Our Latest Articles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => {
          const { id, title, slug, description } = article;

          return (
            <div
              key={id}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {description}
              </p>
              <a
                href={`/articles/${slug}`}
                className="text-indigo-600 hover:text-indigo-800 font-medium transition"
              >
                Read More →
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Articles;