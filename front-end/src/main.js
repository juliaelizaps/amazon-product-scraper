
//select search button and asigns getData function on its click
const searchButton = document.getElementById('search-button')
searchButton.onclick = getData
//selects the container where the product cards will be displayed
const resultsContainer = document.getElementById('results')

async function getData() {
    console.log(resultsContainer.innerHTML);
    //clears previous search results
    resultsContainer.innerHTML = '';
    //disables the search button to prevent multiple requests
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
                ratingElement.textContent = 'Rating: ' + (item.rating ?? 'N/A');
                const reviewsElement = document.createElement('p');
                reviewsElement.textContent = 'Reviews: ' + (item.reviews ?? 'N/A');

                const card = document.createElement('div');
                //Append elements to the product card
                card.appendChild(imageElement);
                card.appendChild(titleElement);
                card.appendChild(ratingElement);
                card.appendChild(reviewsElement);

                resultsContainer.appendChild(card);
                //applies a css class
                card.classList.add('product-container')
            });
        }

        createElements(products);

    } catch (error) {
        showMessage('Unfortunately, Amazon has blocked the automated query. Please try again later or change the search.');
        console.error(error.message);

    } finally {
        //re-enables button after request is finished
        searchButton.disabled = false;
    }
}