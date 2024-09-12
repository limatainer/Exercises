// Estrutura do Firebase
// Firestore:
// Coleção: exercicio
// Documentos: Cada documento tem as chaves Nome (string) e imagem (string que representa o caminho da imagem no Storage).
// Storage:
// Pasta: images
// O valor da chave imagem em cada documento deve ser um caminho relativo à pasta images.

import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Definindo a interface para o exercício
interface Exercise {
  id: string;
  Nome: string;
  imagem: string; // Este é o caminho relativo à pasta 'images'
  youtube: string;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firebase Storage
const storage = getStorage(app);

// Inicializa o Firestore
const db = getFirestore(app);

// Função para buscar dados dos exercícios do Firestore
export const fetchExercises = async (): Promise<Exercise[]> => {
  try {
    const exercisesCollection = collection(db, 'exercicio');
    const exerciseSnapshot = await getDocs(exercisesCollection);
    const exerciseList = exerciseSnapshot.docs.map(doc => {
      const data = doc.data() as Omit<Exercise, 'id'>;
      return {
        id: doc.id,
        ...data
      };
    });
    return exerciseList;
  } catch (error) {
    console.error("Erro ao buscar exercícios:", error);
    return [];
  }
};

// Função para buscar URLs de imagens do Firebase Storage
export const fetchImageUrls = async (exercises: Exercise[]): Promise<string[]> => {
  try {
    const urls = await Promise.all(
      exercises.map(async (exercise) => {
        // Verifique se o campo 'imagem' é uma string válida
        if (typeof exercise.imagem === 'string' && exercise.imagem.trim() !== '') {
          // O caminho deve ser o correto, como 'images/bex.jpg'
          const imageRef = ref(storage, exercise.imagem); // Usando o caminho armazenado
          return getDownloadURL(imageRef);
        } else {
          console.error(`Caminho da imagem inválido para o exercício ${exercise.id}:`, exercise.imagem);
          return ''; // Retorna uma string vazia para imagens inválidas
        }
      })
    );
    return urls.filter(url => url !== ''); // Filtra URLs vazias
  } catch (error) {
    console.error("Erro ao acessar o Storage:", error);
    return [];
  }
};

export { storage, db };