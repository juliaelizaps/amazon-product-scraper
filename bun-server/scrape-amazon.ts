import axios from "axios";
import {JSDOM} from "jsdom";

const PROTOCOL = 'https://'
const DOMAIN = 'www.amazon.com'

/**
 * This function fetches the HTML from the Amazon Web Page.
 * 
 * @param keyword
 */
export async function scrapeAmazon(keyword: string) {
    const AMAZON_SEARCH_URL = `${PROTOCOL}${DOMAIN}/s?k=${keyword}`;
    try {
        const response = await axios.get(AMAZON_SEARCH_URL, {
            //Setting realistic browser headers to mimic a real user request
            headers: {
                Host: DOMAIN,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Referer': 'https://www.google.com/',
            }
        });
        const html = response.data;
        if (!html.includes("data-component-type=\"s-search-result\"")) {
            throw new Error("Blocked by Amazon or invalid response");
          }          
        const dom = new JSDOM(html);

        const products = dom.window.document.querySelectorAll("span[data-component-type='s-search-results'] > div > div[id]");

        const outputData = Array.from(products).map((product) => {
            const title = product?.querySelector('a > h2 > span')?.textContent;
            const rating = product?.querySelector('div[data-cy="reviews-block"] > div > span')?.textContent?.split(' ')[0];
            const reviews = product?.querySelector('span[data-component-type="s-client-side-analytics"] > div > a')?.textContent?.trim().replace(',', ' ');
            const imageUrl = product?.querySelector('div > img.s-image')?.getAttribute('src');
            return { title, rating: Number(rating), reviews: Number(reviews), imageUrl };
        })

        return outputData;
    } catch (error) {
        console.error('Error fetching HTML from Amazon:', error);
    }
}
