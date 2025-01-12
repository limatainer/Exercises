import { useFetchDocument } from '../hooks/useFetchDocument';
import { useParams } from 'react-router-dom';

export default function Details() {
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      {post ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-3xl w-full">
          <div className="flex items-center justify-center mb-6">
            <img
              src={post.image}
              alt={post.title}
              className="w-24 h-24 rounded-lg object-cover mr-4"
            />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {post.title}
            </h1>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            User details:
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {post.body}
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
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
      ) : (
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading...</p>
      )}
    </div>
  );
}
