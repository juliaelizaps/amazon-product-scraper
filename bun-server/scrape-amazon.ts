import axios from "axios";

//Fetch the HTML from Amazon web page using a keyword
export async function scrapeAmazon(keyword: string) {
    const AMAZON_SEARCH_URL = `https://www.amazon.com.br/s?k=${keyword}`;
    try {
        const response = await axios.get(AMAZON_SEARCH_URL);
        const html = response.data;
        //console.log(AMAZON_SEARCH_URL);
        console.log(html);
    } catch (error) {
        console.error('Error fetching HTML from Amazon:', error);
    }
  }
  