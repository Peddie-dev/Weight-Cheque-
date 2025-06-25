import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length > 0) {
          const articleData = data.data[0];
          const parsedToc = generateToc(articleData.blocks);
          setArticle(articleData);
          setToc(parsedToc);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading article:", error);
        setLoading(false);
      });
  }, [slug]);

  // Generate TOC from blocks with <h2>/<h3> tags
  const generateToc = (blocks) => {
    const tocItems = [];
    blocks?.forEach((block, index) => {
      if (block.__component === "shared.rich-text") {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = block.body;

        Array.from(tempDiv.querySelectorAll("h2, h3")).forEach((heading) => {
          const level = heading.tagName.toLowerCase();
          const text = heading.textContent;
          const id = `${level}-${text.toLowerCase().replace(/\s+/g, "-")}-${index}`;
          heading.id = id; // Update DOM
          tocItems.push({ id, text, level });
        });

        // Replace original block body with updated HTML with IDs
        block.body = tempDiv.innerHTML;
      }
    });
    return tocItems;
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) return <p className="p-6 text-center">Loading article...</p>;
  if (!article) return <p className="p-6 text-center">Article not found.</p>;

  const { title, description, cover, blocks } = article;
  const shareUrl = window.location.href;

  return (
    <div className="px-4 py-8 max-w-3xl mx-auto text-gray-900 dark:text-white">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>

      {/* Cover Image */}
      {cover && (
        <img
          src={`http://localhost:1337${cover.url}`}
          alt={title}
          className="mb-6 w-full h-auto rounded-xl object-cover shadow"
        />
      )}

      {/* Dynamic TOC */}
      {toc.length > 0 && (
        <div className="mb-10 border-l-4 border-primary pl-4">
          <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {toc.map(({ id, text, level }) => (
              <li
                key={id}
                className={`cursor-pointer hover:text-primary ${
                  level === "h3" ? "ml-4 text-sm" : ""
                }`}
                onClick={() => scrollToId(id)}
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Article Body */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {blocks?.map((block, index) => {
          if (block.__component === "shared.rich-text") {
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{
                  __html: block.body.replace(/\n/g, "<br/>"),
                }}
              />
            );
          }
          return null;
        })}
      </div>

      {/* Social Media Share Icons */}
      <div className="mt-10 pt-6 border-t border-gray-300 dark:border-gray-600">
        <h3 className="text-base font-semibold mb-3">Share this article</h3>
        <div className="flex items-center gap-4 text-xl">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:scale-110 transition-transform"
          >
            <FaFacebookF />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:scale-110 transition-transform"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:scale-110 transition-transform"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;