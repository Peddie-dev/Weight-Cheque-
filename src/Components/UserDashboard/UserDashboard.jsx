import React, { useEffect, useState } from "react";
import axios from "axios";
import ketoImg from "../../assets/books/keto.png";
import detoxImg from "../../assets/books/detox.png";
import noCarbImg from "../../assets/books/no-carb.png";

const UserDashboard = () => {
  const recommendedBooks = [
    { title: "Keto Kickstart", tag: "Low-Carb", image: ketoImg },
    { title: "Vegetable Detox", tag: "Detox", image: detoxImg },
    { title: "No-Carb Reset", tag: "Weight Loss", image: noCarbImg },
  ];

  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1337/api/articles?populate=*"
        );
        const data = res.data.data;
        setBlogPosts(
          data.map((post) => ({
            id: post.id,
            title: post.attributes.title,
            date: new Date(post.attributes.publishedAt).toLocaleDateString(),
          }))
        );
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen px-6 py-8 text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-semibold mb-4">👋 Welcome back, Henry!</h1>

      {/* Progress Tracker */}
      <div className="bg-orange-50 dark:bg-gray-800 p-4 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Weekly Progress</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Week 2 of 4 – You’re doing great!</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div className="h-2.5 rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: "50%" }}></div>
        </div>
      </div>

      {/* Recommended eBooks */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">📚 Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendedBooks.map((book, idx) => (
            <div key={idx} className="border dark:border-gray-700 rounded-xl p-4 shadow hover:shadow-lg transition bg-white dark:bg-gray-800">
              <img src={book.image} alt={book.title} className="w-full h-40 object-cover rounded-xl mb-3" />
              <h3 className="text-lg font-medium mb-1">{book.title}</h3>
              <span className="text-sm text-orange-600 dark:text-orange-300 bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded-full">
                {book.tag}
              </span>
              <button className="mt-4 w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold py-2 rounded-xl">
                View Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Blog Posts in Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">📝 Latest Blog Posts</h2>
        {blogPosts.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No blog posts available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="border dark:border-gray-700 p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-md transition"
              >
                <h4 className="text-lg font-medium mb-2">{post.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{post.date}</p>
                <button className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl hover:opacity-90">
                  Read
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;