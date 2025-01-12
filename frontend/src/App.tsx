import { useEffect, useState } from "react";
import { fetchExercises, fetchImageUrls } from './utils/firebaseConfig';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faArrowLeft,
  faArrowRight,
  faDumbbell,
  faMoon,
  faSun
} from '@fortawesome/free-solid-svg-icons';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

interface Exercise {
  id: string;
  Nome: string;
  imagem: string;
  youtube: string;
}

const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

function App() {
  const [seconds, setSeconds] = useState(24);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const loadExercisesAndImages = async () => {
      try {
        const exerciseData = await fetchExercises();
        setExercises(exerciseData);
        if (exerciseData.length > 0) {
          const urls = await fetchImageUrls(exerciseData);
          setImageUrls(urls);
        }
      } catch (error) {
        console.error("Erro ao carregar exercícios e imagens:", error);
      }
    };
    loadExercisesAndImages();
  }, []);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => setSeconds(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setSeconds(24);
      setCurrentExerciseIndex(prevIndex => (prevIndex + 1) % exercises.length);
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
    }
  }, [seconds, exercises.length, imageUrls.length]);

  const handleReset = () => {
    setSeconds(24);
    setCurrentExerciseIndex(0);
    setCurrentImageIndex(0);
  };

  const handleNext = () => {
    setSeconds(24);
    setCurrentExerciseIndex(prevIndex => (prevIndex + 1) % exercises.length);
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
  };

  const handleBack = () => {
    setSeconds(24);
    setCurrentExerciseIndex(prevIndex =>
      prevIndex === 0 ? exercises.length - 1 : prevIndex - 1
    );
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const currentExercise = exercises[currentExerciseIndex] || { Nome: "", youtube: "" };
  const youtubeVideoId = getYouTubeVideoId(currentExercise?.youtube || '');
  const thumbnailUrl = youtubeVideoId
    ? `https://img.youtube.com/vi/${youtubeVideoId}/0.jpg`
    : null;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-purple-50 to-indigo-100'} transition-colors duration-300`}>
      <div className="max-h-screen overflow-hidden flex flex-col">
        <header className={`w-full flex justify-between items-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faDumbbell} className="text-purple-600" />
            <span className={`text-xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>FitApp</span>
          </div>
          <div className="flex space-x-4 items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-purple-100 text-purple-600'}`}
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
            <button
              onClick={handleReset}
              className="text-red-600 hover:text-purple-600 transition-colors"
            >
              Reset
            </button>
            <a
              href="https://elph-limatainer.vercel.app"
              target="_blank"
              rel="noreferrer"
              className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-purple-600 transition-colors`}
            >
              About
            </a>
          </div>
        </header>

        <main className={`flex-1 p-4 ${darkMode ? 'bg-gray-900' : 'bg-white'} overflow-y-auto`}>
          <div className={`max-w-4xl mx-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-2xl p-6 space-y-4`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-800'}`}>
                {currentExercise?.Nome || "Loading..."}
              </h2>

              <div className="flex justify-end">
                <a
                  href={currentExercise?.youtube || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="group"
                >
                  <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden relative">
                    {thumbnailUrl && (
                      <img
                        src={thumbnailUrl}
                        alt={`YouTube thumbnail for ${currentExercise?.Nome}`}
                        className="object-cover w-full h-full"
                      />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <FontAwesomeIcon icon={faPlay} className="text-white text-3xl" />
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-8">
              <button
                onClick={handleBack}
                className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors flex items-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
              </button>

              <div className="w-24 h-24">
                <CircularProgressbar
                  value={(seconds / 24) * 100}
                  text={seconds.toString().padStart(2, "0")}
                  styles={buildStyles({
                    textSize: "36px",
                    pathColor: darkMode ? '#9F7AEA' : '#6B46C1',
                    textColor: darkMode ? '#E2E8F0' : '#4A5568',
                    trailColor: darkMode ? '#4A5568' : '#E2E8F0',
                  })}
                />
              </div>

              <button
                onClick={handleNext}
                className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors flex items-center"
              >
                Next <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </button>
            </div>

            <div className="relative aspect-video">
              {imageUrls.length > 0 && (
                <img
                  src={imageUrls[currentImageIndex]}
                  alt={`exercise-${currentImageIndex}`}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              )}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {imageUrls.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                      ? 'bg-purple-600 scale-125'
                      : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-700' : 'bg-purple-100'} rounded-lg p-4 flex items-center`}>
              <FontAwesomeIcon icon={faDumbbell} className="text-purple-600 text-xl mr-3" />
              <p className={`${darkMode ? 'text-gray-200' : 'text-purple-800'} font-medium`}>
                Exercise Benefit: Improves cervical spine stability and posture
              </p>
            </div>
          </div>
        </main>

        <footer className={`w-full p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} mt-auto`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center space-x-4 text-sm">
              <a href="#" className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-purple-600 transition-colors`}>
                Privacy Policy
              </a>
              <a href="#" className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-purple-600 transition-colors`}>
                Terms of Service
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Copyright © 2024 FitApp Co.
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              {[faFacebook, faTwitter, faInstagram].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-purple-600 transition-colors`}
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
      <SpeedInsights />
    </div>
  );
}

export default App;