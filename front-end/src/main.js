
const searchButton = document.getElementById('search-button')
searchButton.onclick = getData
const resultsContainer = document.getElementById('results')

async function getData() {
    console.log(resultsContainer.innerHTML);
    resultsContainer.innerHTML = '';
    searchButton.disabled = true;
    
    try {
        const productName = document.getElementById('keyword-search').value.toLowerCase();
        const url = `http://localhost:8080/api/scrape?keyword=${productName}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const products = await response.json();

        function createElements(elementArray){
            elementArray.forEach(item => {

                const imageElement = document.createElement('img');  
                imageElement.src = item.imageUrl;
                const titleElement = document.createElement('h2');
                titleElement.textContent= item.title;
                const ratingElement = document.createElement('p');
                ratingElement.textContent = 'Rating: ' + item.rating;
                const reviewsElement = document.createElement('p');
                reviewsElement.textContent = 'Reviews: ' + item.reviews;

                const card = document.createElement('div');
                card.appendChild(imageElement);
                card.appendChild(titleElement);
                card.appendChild(ratingElement);
                card.appendChild(reviewsElement);

                resultsContainer.appendChild(card);

                card.classList.add('product-container')
            });
        }

        createElements(products);

    } catch (error) {

        console.error(error.message);

    } finally {
        searchButton.disabled = false;
    }
}