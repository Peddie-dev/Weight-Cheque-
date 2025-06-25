import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:1337/api/articles?populate=*")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data?.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch articles:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading articles...</p>;
  if (!articles.length) return <p className="p-6">No articles found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest Articles</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const {
            id,
            title,
            description,
            slug,
            cover
          } = article;

          const imageUrl = cover?.url
            ? `http://localhost:1337${cover.url}`
            : "https://via.placeholder.com/400x200?text=No+Image";

          return (
            <div
              key={id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {description}
                </p>
                <a
                  href={`/articles/${slug}`}
                  className="text-indigo-600 font-semibold mt-4 inline-block"
                >
               <Link
               to={`/articles/${slug}`}
               className="text-indigo-600 font-semibold mt-4 inline-block">
                Read More →
                </Link>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Articles;