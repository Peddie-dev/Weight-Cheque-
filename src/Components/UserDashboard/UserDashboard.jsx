import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import ketoImg from "../../assets/books/keto.png";
import detoxImg from "../../assets/books/detox.png";
import noCarbImg from "../../assets/books/no-carb.png";

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  const recommendedBooks = [
    { title: "Keto Kickstart", tag: "Low-Carb", image: ketoImg },
    { title: "Vegetable Detox", tag: "Detox", image: detoxImg },
    { title: "No-Carb Reset", tag: "Weight Loss", image: noCarbImg },
  ];

  const continueReadingBooks = [
    {
      title: "Keto Kickstart",
      tag: "Low-Carb",
      image: ketoImg,
      progress: 40,
    },
    {
      title: "No-Carb Reset",
      tag: "Weight Loss",
      image: noCarbImg,
      progress: 75,
    },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const userName = user?.displayName || user?.email?.split("@")[0] || "there";

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen px-4 sm:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        Welcome back, {userName}
      </h1>

      {/* Recommended Books */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2">
          {recommendedBooks.map((book, index) => (
            <div
              key={index}
              className="relative min-w-[160px] sm:min-w-[200px] rounded-lg overflow-hidden shadow-md transform transition hover:scale-105"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/60 dark:bg-black/70 opacity-0 hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center p-4">
                <h3 className="text-sm font-semibold text-white mb-1">
                  {book.title}
                </h3>
                <p className="text-xs text-orange-400 mb-2">{book.tag}</p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm">
                  Read Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Reading */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Continue Reading</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2">
          {continueReadingBooks.map((book, index) => (
            <div
              key={index}
              className="relative min-w-[160px] sm:min-w-[200px] rounded-lg overflow-hidden shadow-md transform transition hover:scale-105"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/60 dark:bg-black/70 opacity-0 hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center p-4">
                <h3 className="text-sm font-semibold text-white mb-1">
                  {book.title}
                </h3>
                <p className="text-xs text-orange-400 mb-2">{book.tag}</p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-md text-sm">
                  Resume
                </button>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 w-full">
                <div
                  className="h-2 bg-orange-500"
                  style={{ width: `${book.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;