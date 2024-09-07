import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

// Configurações do Firebase, substitua pelos valores do seu projeto
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

// Função para buscar URLs de imagens do Firebase Storage
export const fetchImageUrls = async () => {
  const imagesRef = ref(storage, 'images');
  console.log("Correu1") // Diretório onde as imagens estão armazenadas
  try {
    const result = await listAll(imagesRef); // Lista todas as imagens na pasta 'images'
    console.log(result)
    // Gera URLs de download para todas as imagens
    const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef));
    const urls = await Promise.all(urlPromises);
    console.log(urls)
    return urls;
  } catch (error) {
    console.error("Erro ao acessar o Storage:", error);
    return [];
  }
};
console.log("Correu out")

export { storage };
