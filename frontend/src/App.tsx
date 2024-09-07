/**
 * The main React component for the FitApp application.
 * This component handles the main UI and functionality of the app, including:
 * - Fetching and displaying exercise images from Firebase
 * - Implementing a countdown timer and image carousel
 * - Providing buttons to reset, go to the next, and go to the previous exercise
 * - Rendering the header, main content, and footer of the app
 */

import { useEffect, useState } from "react";
import { fetchImageUrls } from './utils/firebaseConfig';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faArrowLeft, faArrowRight, faDumbbell } from '@fortawesome/free-solid-svg-icons';
//import { faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SpeedInsights } from "@vercel/speed-insights/react"
import {
  faFacebook, faTwitter, faInstagram
} from '@fortawesome/free-brands-svg-icons';

function App() {
  const [seconds, setSeconds] = useState(24);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  //const [showDropdown, setShowDropdown] = useState(false);
  // Carregar imagens do Firebase no início
  useEffect(() => {
    const loadImages = async () => {
      const urls = await fetchImageUrls(); // Busca as URLs das imagens do Firebase
      setImageUrls(urls); // Atualiza o estado com as URLs carregadas
    };
    loadImages(); // Carrega as imagens ao montar o componente
  }, []);

  // Timer para contagem regressiva e troca de imagem
  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      // Reinicia o timer e atualiza o índice da imagem
      setSeconds(24);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length); // Passa para a próxima imagem no array
    }
  }, [seconds, imageUrls.length]);

  // Funcao para o botão "Reset"
  const handleReset = () => {
    setSeconds(24); // Reinicia o timer
    setCurrentImageIndex(0); // Volta para a primeira imagem
  };

  // Função para o botão "Next"
  const handleNext = () => {
    setSeconds(24); // Reinicia o timer
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length); // Vai para a próxima imagem
  };

  // Função para o botão "Back"
  const handleBack = () => {
    setSeconds(24); // Reinicia o timer
    setCurrentImageIndex((prevIndex) => {
      // Se estiver na primeira imagem, volta para a última, senão vai para a anterior
      return prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center justify-between">
      <header className="w-full flex justify-between items-center p-4 mb-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faDumbbell} className="text-purple-600" />
          <span className="text-xl font-bold text-purple-800">FitApp</span>
        </div>
        <div className="flex space-x-4 items-center">
          <button onClick={handleReset} className="text-red-600 hover:text-purple-600 transition-colors">
            Reset
          </button>
          <a href="https://elph-limatainer.vercel.app" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors">
            About
          </a>
          {/* <div className="relative">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
                  <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
                  <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100">
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
                </a>
              </div>
            )}
          </div> */}
        </div>
      </header>

      <main className="flex flex-col items-center w-full max-w-4xl px-4">
        <div className="w-full bg-white shadow-lg rounded-lg p-6 mb-2">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-3xl font-bold text-purple-800 mb-2">Exercise name</h2>
              <p className="text-purple-600 flex items-center mb-2">
                <FontAwesomeIcon icon={faDumbbell} className="mr-2" />
                Exercise Benefit
              </p>
              <a href="#" className="text-green-500 underline hover:text-purple-700 transition-colors">
                Watch a video example
              </a>
            </div>
            <div className="w-32 h-32 bg-gray-200 rounded-lg relative overflow-hidden group">
              <img
                src="https://via.placeholder.com/128"
                alt="Video Example"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FontAwesomeIcon icon={faPlay} className="text-white text-4xl" />
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-8 mb-2">
            {['Hours', 'Minutes', 'Seconds'].map((unit, index) => (
              <div key={unit} className="text-center">
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbar
                    value={index === 2 ? (seconds / 24) * 100 : 0}
                    text={index === 2 ? seconds.toString().padStart(2, '0') : '00'}
                    styles={buildStyles({
                      textSize: '24px',
                      pathColor: `rgba(129, 140, 248, ${index === 2 ? 1 : 0.2})`,
                      textColor: '#4A5568',
                      trailColor: '#d6d6d6',
                    })}
                  />
                </div>
                <p className="text-gray-500 mt-2">{unit}</p>
              </div>
            ))}
          </div>

          <div className="w-full mb-3 relative">
            {imageUrls.length > 0 && (
              <img
                src={imageUrls[currentImageIndex]}
                alt={`exercise-${currentImageIndex}`}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            )}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {imageUrls.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-purple-600' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
            </button>
            <button
              onClick={handleNext}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
            >
              Next <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-4xl text-center p-4">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Privacy Policy</a>
          <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Terms of Service</a>
        </div>
        <p className="text-gray-400">
          Copyright &copy; 2024 FitApp Co.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </footer>
      <SpeedInsights />
    </div>
  );
}

export default App
