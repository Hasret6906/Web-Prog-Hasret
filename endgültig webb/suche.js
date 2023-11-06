function sucheprodukt() {
    //Abrufen des Suchbegriffs aus dem Eingabefeld 
    let searchTerm = document.getElementById('search-input').value.toLowerCase();
    //Eine Anfrage an eine API senden, die Produktdaten zurückgibt
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            //Filtern der Produkte
            const results = data.products.filter(product => {
                return product.title.toLowerCase().includes(searchTerm) &&
                    (product.category === 'fragrances' || product.category === 'skincare');
            });
            //Anzeige der Suchergebnisse
            ergebnisse(results);
        })
        .catch(error => {
            console.error('Fehler beim Abrufen der Daten:', error);
        });
}
//Funktion zur Anzeige der Suchergebnisse
function ergebnisse(products) {
    let resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (products.length === 0) {
        resultsContainer.innerHTML = 'Keine Produkte gefunden.';
    } else {
        products.forEach(product => {
            const productElement = produkte(product);
            resultsContainer.appendChild(productElement);
        });
    }
}
//Funktion zur Erzeugung einer Produktkachel
function produkte(product) {
    let productElement = document.createElement('div');
    productElement.classList.add('product-item');

    productElement.innerHTML = `
        <img class="product-thumbnail" src="${product.thumbnail}" alt="${product.title}">
        <p class="product-title">${product.title}</p>
        <p class="product-price">${product.price}</p>
    `;

    //Eventlistener, um auf Klicks auf Produktkacheln zu reagieren
    productElement.addEventListener('click', () => produktdetails(product));

    return productElement;
}
//Funktion zur Anzeige von Produktdetails
function produktdetails(product) {
    let resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    let productContainer = document.getElementById('product-details');
    productContainer.innerHTML = '';

    let productDetails = document.createElement('div');
    productDetails.innerHTML = `
        <h2 class="product-title">${product.title}</h2>
        <img class="product-thumbnail" src="${product.thumbnail}" alt="${product.title}">
        
        <p class="product-price">Preis: ${product.price}</p>
        <p class="product-description">Beschreibung: ${product.description}</p>
        <p class="product-category">Kategorie: ${product.category}</p>
        <p class="product-rate">Bewertung: ${product.rate}</p>
    `;

    productContainer.appendChild(productDetails);// Produktdetails zur Anzeige hinzufügen
}

