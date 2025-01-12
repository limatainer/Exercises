/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

export default function SearchDetail({ post }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-4">
        <img
          src={post.image}
          alt={post.title}
          className="w-24 h-24 object-cover rounded-lg mr-4"
        />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {post.title}
        </h2>
      </div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-700 dark:text-gray-300">
          por: {post.createdBy}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <p
              key={tag}
              className="inline-block bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
            >
              <span>#</span>
              {tag}
            </p>
          ))}
        </div>
      </div>
      <Link
        to={`/posts/${post.id}`}
        className="inline-block py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        Ver mais
      </Link>
    </div>
  );
}
