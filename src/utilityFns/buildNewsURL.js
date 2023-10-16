import { NEWSAPIKEY } from "../settings"

export const buildNewsURL = (APIkey = NEWSAPIKEY) => {
    return `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=uk&max=10&apikey=${APIkey}`  
}