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
            headers: {
                Host: DOMAIN,
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
            }
        });
        const html = response.data;
        const dom = new JSDOM(html);

        const products = dom.window.document.querySelectorAll("span[data-component-type='s-search-results'] > div > div[id]");

        const outputData = products.values().toArray().map((product) => {
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
