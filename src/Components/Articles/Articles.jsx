import React, { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:1337/api/articles?sort=createdAt:desc")
      .then((res) => res.json())
      .then((data) => {
        const validArticles = (data?.data || []).filter(
          (item) => item?.title && item?.slug
        );
        setArticles(validArticles.slice(0, 3));
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((article) => {
          const { id, title, slug, description, cover } = article;

          const imageUrl =
            cover?.formats?.medium?.url || cover?.url
              ? `http://localhost:1337${cover.formats?.medium?.url || cover.url}`
              : null;

          return (
            <div
              key={id}
              className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 bg-white"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
                <a
                  href={`/articles/${slug}`}
                  className="text-sm font-medium text-primary hover:text-secondary transition"
                >
                  Read More →
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <a
          href="/articles"
          className="inline-block px-8 py-3 text-white font-semibold rounded-full bg-gradient-to-r from-primary to-secondary shadow-md hover:opacity-90 transition"
        >
          View More Articles
        </a>
      </div>
    </div>
  );
};

export default Articles;