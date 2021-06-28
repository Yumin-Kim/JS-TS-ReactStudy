import { createContext, useContext } from 'react';

const PreloadContext = createContext(null);

export const Preloader = ({ resolve }) => {
    const preloadContext = useContext(PreloadContext);
    console.log("preloadContext",preloadContext);
    console.log("resolve Data",resolve);
    if (!preloadContext) return null;
    if (preloadContext.done) return null;

    preloadContext.promises.push(Promise.resolve(resolve()));
    return null;

}

export default PreloadContext;