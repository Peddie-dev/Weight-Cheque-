import React, { useEffect, useState } from "react";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/blogs?pagination[limit]=9&populate=featuredImage")
      .then((response) => response.json())
      .then((data) => {
        // Strapi v4 returns posts under data.data
        setArticles(data.data);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(({ id, attributes }) => {
          const { title, excerpt, featuredImage } = attributes;

          // Build full image URL or fallback placeholder
          const imageUrl = featuredImage?.data
            ? `http://localhost:1337${featuredImage.data.attributes.url}`
            : "https://via.placeholder.com/600x400?text=No+Image";

          return (
            <div key={id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-4">{title}</h2>
              <p className="text-gray-600 text-sm mt-2">{excerpt}</p>
              <a
                href={`/articles/${id}`}
                className="text-primary font-bold mt-4 inline-block"
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

export default ArticlesPage;