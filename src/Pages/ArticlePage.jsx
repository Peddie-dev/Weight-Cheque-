import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:1337/api/articles?filters[slug][$eq]=${slug}&populate=*`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length > 0) {
          setArticle(data.data[0]);
        }
      });
  }, [slug]);

  if (!article) return <p>Loading...</p>;

  const { title, description, cover, blocks } = article.attributes;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>

      {cover && (
        <img
          src={`http://localhost:1337${cover.data.attributes.url}`}
          alt={title}
          className="mb-4 w-full rounded"
        />
      )}

      {blocks?.map((block, index) => {
        if (block.__component === "shared.rich-text") {
          return (
            <div
              key={index}
              className="prose"
              dangerouslySetInnerHTML={{ __html: block.body }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

export default ArticlePage;