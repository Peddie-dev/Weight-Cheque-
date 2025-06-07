import React, { useEffect, useState } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Replace with your Strapi API URL
    fetch("http://localhost:1337/api/blogs?pagination[limit]=3&populate=featuredImage")
      .then((response) => response.json())
      .then((data) => {
        // Strapi returns data in data array
        setArticles(data.data);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map(({ id, attributes }) => {
          const { title, excerpt, featuredImage } = attributes;

          // Build image URL, check if image exists
          const imageUrl = featuredImage?.data
            ? `http://localhost:1337${featuredImage.data.attributes.url}`
            : "https://via.placeholder.com/400x200?text=No+Image";

          return (
            <div key={id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-32 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-4">{title}</h2>
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

export default Articles;