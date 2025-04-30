import express from "express";
import type { Request, Response } from "express";
import { scrapeAmazon } from "./scrape-amazon";
import cors from "cors";

const app = express();
const port = 8080;
app.use(cors());

app.get("/api/scrape", async (req: Request, res: Response) => {
    const keyword = req.query.keyword;
    //Returns an Error if not a string
    if (typeof keyword !== 'string') {
        console.log("Keyword is not a String");
        return res.status(400).json({ erro: 'Keyword must be a string' });
    }
    try {
        const response = await scrapeAmazon(keyword);

        //Returns an Error if no data from amazon
        if (!response || response?.length === 0) {
            throw new Error(`Error getting data from Amazon`);
        }
        return res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to scrape Amazon.com' });
    }

});

// Starting the server
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});





