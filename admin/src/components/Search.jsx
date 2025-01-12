// hooks
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import { useQuery } from '../hooks/useQuery';

// components
import { Link } from 'react-router-dom';
import SearchDetail from '../pages/SearchDetail';

export default function Search() {
  const query = useQuery();
  const search = query.get('q');

  const { documents: posts } = useFetchDocuments('posts', search);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Search Results: {search}
      </h1>
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {posts && posts.length === 0 && (
          <div className="text-center">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              Could not find any match for this search
            </p>
            <Link
              to="/submissions"
              className="inline-block py-2 px-4 bg-blue-600 hover:bg-blue-700
               text-white rounded-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Back
            </Link>
          </div>
        )}
        {posts && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post) => (
              <SearchDetail key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
