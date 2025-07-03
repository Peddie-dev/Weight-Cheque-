import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const articlesPerPage = 9;

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

  if (loading) return <p className="p-6 dark:text-gray-200">Loading articles...</p>;
  if (!articles.length) return <p className="p-6 dark:text-gray-200">No articles found.</p>;

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsAnimating(false);
    }, 300);
  };

  const generatePagination = () => {
    const pages = [];
    let addedEllipsis = false;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || i === 2 || i === 3 ||
        i === totalPages ||
        Math.abs(i - currentPage) <= 1
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-10 h-10 font-bold rounded-full flex items-center justify-center transition ${
              currentPage === i
                ? "bg-gradient-to-r from-primary to-secondary text-black"
                : "text-black dark:text-white hover:underline"
            }`}
          >
            {i}
          </button>
        );
        addedEllipsis = false;
      } else if (!addedEllipsis) {
        pages.push(
          <span
            key={`ellipsis-${i}`}
            className="px-2 py-1 font-bold text-black dark:text-white"
          >
            ...
          </span>
        );
        addedEllipsis = true;
      }
    }

    return pages;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center dark:text-white">
        Latest Articles
      </h1>

      <div
        className={`grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        {currentArticles.map((article) => {
          const {
            id,
            title,
            description,
            slug,
            cover,
          } = article;

          const imageUrl = cover?.url
            ? `http://localhost:1337${cover.url}`
            : "https://via.placeholder.com/400x200?text=No+Image";

          return (
            <div
              key={id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
                  {description}
                </p>
                <Link
                  to={`/articles/${slug}`}
                  className="mt-4 inline-block font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                >
                  Read More →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination UI */}
      <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative font-bold flex items-center transition ${
            currentPage === 1
              ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "text-black dark:text-white hover:underline"
          }`}
        >
          <span className="mr-1 text-lg">«</span>
          <span className="relative z-10">Previous</span>
          {currentPage !== 1 && (
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-sm"></span>
          )}
        </button>

        {generatePagination()}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative font-bold flex items-center transition ${
            currentPage === totalPages
              ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "text-black dark:text-white hover:underline"
          }`}
        >
          <span className="relative z-10">Next</span>
          <span className="ml-1 text-lg">»</span>
          {currentPage !== totalPages && (
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-sm"></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Articles;