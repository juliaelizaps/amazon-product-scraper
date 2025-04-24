import axios from "axios";
const { JSDOM } = require("jsdom");

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
                Accept: '*/*',
                Host: DOMAIN,
                'User-Agent': 'Mozilla/5.0',
            }
        });
        const html = response.data;
        const dom = new JSDOM(html);

        const products = dom.window.document.querySelectorAll("span[data-component-type='s-search-results'] > div > div[id]");

        const outputData = products.values().toArray().map((product: any) => {
            const title = product.querySelector('a > h2 > span').textContent;
            const rating = product.querySelector('div[data-cy="reviews-block"] > div > span').textContent.split(' ')[0];
            const reviews = product.querySelector('span[data-component-type="s-client-side-analytics"] > div > a').textContent.trim().replace(',', '');
            const imageUrl = product.querySelector('img.s-image').src;
            return { title, rating: Number(rating), reviews: Number(reviews), imageUrl };
        })

        return outputData;
    } catch (error) {
        console.error('Error fetching HTML from Amazon:', error);
    }
}
