import { UNSPLASHAPIKEY } from "../settings";

export const buildUnsplashApiUrl = (searchText) => {
    return `https://api.unsplash.com/search/photos/?client_id=${UNSPLASHAPIKEY}&query=${encodeURIComponent(searchText)}`
}