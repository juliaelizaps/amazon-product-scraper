
const searchButton = document.getElementById('search-button')
searchButton.onclick = getData

async function getData() {
    searchButton.disabled = true;

    try {
        const productName = document.getElementById('keyword-search').value.toLowerCase();
        const url = `http://localhost:8080/api/scrape?keyword=${productName}`;
        const response = await fetch(url);

        if (!response.ok) {

            throw new Error(`Response status: ${response.status}`);

        }

        const json = await response.json();

        console.log(json);

    } catch (error) {

        console.error(error.message);

    } finally {
        searchButton.disabled = false;
    }
}