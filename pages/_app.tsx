import { createContext, useState, useContext } from 'react';
import { favoContextType } from '../type/Type';

const initFavImages = {
    favoImages: [
        { id: new Date().getTime() + 1, path: 'https://cdn2.thecatapi.com/images/b6b.jpg' }
    ]
}

export const favoriteContext = createContext<favoContextType | undefined>(initFavImages);
export const favoriteContextDispatch = createContext<any>(undefined);

export default function MyApp({ Component, pageProps }) {
    const [favoriteUrls, setFavoriteUrl] = useState(initFavImages);
    return (
        <favoriteContext.Provider value={favoriteUrls}>
            <favoriteContextDispatch.Provider value={setFavoriteUrl}>
                <Component {...pageProps} />
            </favoriteContextDispatch.Provider>
        </favoriteContext.Provider>
    )
}

export const useFavoriteUrls = () => useContext(favoriteContext);
export const useFavoriteUrlsDispatch = () => useContext(favoriteContextDispatch);