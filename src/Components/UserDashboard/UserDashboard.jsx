import React from "react";
import ketoImg from "../../assets/books/keto.png";
import detoxImg from "../../assets/books/detox.png";
import noCarbImg from "../../assets/books/no-carb.png";

const UserDashboard = () => {
  const recommendedBooks = [
    { title: "Keto Kickstart", tag: "Low-Carb", image: ketoImg },
    { title: "Vegetable Detox", tag: "Detox", image: detoxImg },
    { title: "No-Carb Reset", tag: "Weight Loss", image: noCarbImg },
  ];

  const blogPosts = [
    { title: "Why Keto Works", date: "June 10, 2025" },
    { title: "Meal Prep in 30 Minutes", date: "June 5, 2025" },
  ];

  return (
    <div className="bg-white min-h-screen px-6 py-8 text-gray-800">
      <h1 className="text-2xl font-semibold mb-4">👋 Welcome back, Henry!</h1>

      {/* Progress Tracker */}
      <div className="bg-orange-50 p-4 rounded-2xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Weekly Progress</h2>
        <p className="text-sm text-gray-600 mb-2">Week 2 of 4 – You’re doing great!</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="h-2.5 rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: "50%" }}></div>
        </div>
      </div>

      {/* Recommended eBooks */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">📚 Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recommendedBooks.map((book, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-40 object-cover rounded-xl mb-3"
                loading="lazy"
              />
              <h3 className="text-lg font-medium mb-1">{book.title}</h3>
              <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                {book.tag}
              </span>
              <button className="mt-4 w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold py-2 rounded-xl">
                View Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Blog Posts */}
      <div>
        <h2 className="text-xl font-semibold mb-3">📝 Latest Blog Posts</h2>
        <div className="space-y-4">
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-4 border rounded-xl hover:bg-orange-50 transition"
            >
              <div>
                <h4 className="text-lg font-medium">{post.title}</h4>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-4 py-2 rounded-xl">
                Read
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

