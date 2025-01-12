import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDocument } from '../hooks/useFetchDocument';
import { useUpdateDocument } from '../hooks/useUpdateDocument';

export default function Edit() {
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      const textTags = post.tags.join(', ');
      setTags(textTags);
    }
  }, [post]);

  const navigate = useNavigate();
  const { updateDocument, response } = useUpdateDocument('posts');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.');
      return;
    }

    const tagsArray = tags.split(',').map((tag) => tag.trim());

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
    };

    updateDocument(id, data);

    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      {post && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-3xl w-full">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            User Name: {post.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Edit the information bellow
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Name:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="new name..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">URL:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="new image url"
                onChange={(e) => setImage(e.target.value)}
                value={image}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </label>
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-2">Preview:</p>
              <img
                className="w-full h-auto max-w-xs rounded-lg"
                src={post.image}
                alt={post.title}
              />
            </div>
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Detail:</span>
              <textarea
                name="body"
                required
                placeholder="User detail"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              ></textarea>
            </label>
            <label className="block">
              <span className="text-gray-700 dark:text-gray-300">Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="tags"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </label>
            {!response.loading && (
              <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                Edit
              </button>
            )}
            {response.loading && (
              <button
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                disabled
              >
                Loading...
              </button>
            )}
            {(response.error || formError) && (
              <p className="text-red-600 dark:text-red-400">
                {response.error || formError}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
