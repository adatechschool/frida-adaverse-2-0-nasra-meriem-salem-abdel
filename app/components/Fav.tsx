"use client";

import React from "react";

type FavProps = {
  id: number;
  isLiked: boolean;
  onToggleLike: () => void;
};

const Fav: React.FC<FavProps> = ({ id, isLiked, onToggleLike }) => {
  const uniqueId = `like-toggle-${id}`;

  return (
    <div className="flex items-center justify-center bg-gray-900 rounded-md p-2 cursor-pointer">
      <input
        type="checkbox"
        id={uniqueId}
        checked={isLiked}
        onChange={onToggleLike}
        className="hidden"
      />

      <label htmlFor={uniqueId} className="flex items-center cursor-pointer">
        {/* Coeur vide */}
        <svg
          viewBox="0 0 512 512"
          className={`w-6 h-6 ml-2 fill-white transition-opacity duration-300 ${
            isLiked ? "hidden" : "block"
          }`}
        >
          <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9z" />
        </svg>

        {/* Coeur rempli */}
        <svg
          viewBox="0 0 512 512"
          className={`w-6 h-6 ml-2 fill-red-600 transition-transform duration-300 ${
            isLiked ? "block animate-wiggle" : "hidden"
          }`}
        >
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>

        <span className="ml-2 font-bold text-white">Like</span>
      </label>

      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Fav;
