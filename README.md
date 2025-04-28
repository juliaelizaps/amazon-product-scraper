# Amazon Product Scraper

A simple fullstack project that scrapes Amazon product listings from the first page of search results based on a keyword.

## 🛠️ Tech Stack

- Bun + Express + Axios + JSDOM (Backend)
- Vite + HTML + CSS + JavaScript (Frontend)

## 🚀 How to Run

### Backend

# Bun server
bun-server/

To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```

The backend will be available at:

http://localhost:8080


### Frontend  
front-end/

To install dependencies:

```bash
npm install
```
Vite will start a development server, usually available at:

 http://localhost:5173

🧪 How It Works:

The user enters a keyword into an input field on the frontend.

When clicking "Search," the frontend sends a request to the backend API at /api/scrape?keyword=yourKeyword.

The backend uses Axios to fetch the HTML of the Amazon search results page.

JSDOM parses the HTML to extract:

Product Title

Rating (stars out of five)

Number of reviews

Product image URL

The backend returns this data as JSON.

The frontend dynamically creates and displays product cards for each result.

📚 Features:

Fullstack architecture (frontend + backend working together)

Web scraping using Axios and JSDOM

Dynamic creation of elements in the frontend based on fetched API data

Basic layout and styling with HTML and CSS

CORS enabled for development

📦 Project Structure:
The structure is as follows:

```bash
/trainee_test
  /bun_server   --> Bun backend server
  /front_end    --> Vite frontend

```