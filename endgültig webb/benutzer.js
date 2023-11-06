function versteckeuberuns(pageId) {
    let pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.id === pageId) {
            page.style.display = 'block';
            if (pageId === 'ueberuns') {
                // Verstecke die Suchleiste, wenn "Über uns" ausgewählt ist
                document.getElementById('search-bar').classList.add('hide');
                document.getElementById('content-container').classList.add('hide');
                document.getElementById('results').classList.add('hide');
                document.getElementById('product-details').classList.add('hide');
                
            } 
        } else {
            page.style.display = 'none';
        }
    });
}

function versteckebenutzer(pageId) {
    let pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.id === pageId) {
            page.style.display = 'block';
            if (pageId === 'benutzer') {
                // Verstecke die Suchleiste, wenn "Über uns" ausgewählt ist
                document.getElementById('search-bar').classList.add('hide');
                document.getElementById('content-container').classList.add('hide');
                document.getElementById('results').classList.add('hide');
                document.getElementById('product-details').classList.add('hide');
                
            } 
        } else {
            page.style.display = 'none';
        }
    });
}
//Funktion zum Laden von Benutzerdaten
function benutzerladen() {
    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            let userList = document.getElementById('user-list');
            userList.innerHTML = ''; // Leert die Benutzerliste

            data.users.forEach(user => {
                // Überprüfe, ob der Benutzer einen Warenkorb hat
                benutzerhatcart(user.id).then(hasCart => {
                    if (hasCart) {
                        let userItem = document.createElement('li');
                        userItem.className = 'user-item';
                        userItem.innerHTML = ` Benutzer: ${user.id},Geschlecht: ${user.gender}, Alter: ${user.age}`;

                        // Füge einen Button für den Warenkorb hinzu
                        let cartButton = document.createElement('button');
                        cartButton.className = 'cart-button';
                        cartButton.textContent = 'Warenkorb anzeigen';

                        // Erstelle eine Liste für die Warenkorb-Produkte
                        let cartList = document.createElement('ul');
                        cartList.className = 'cart-list';

                        cartButton.addEventListener('click', () => {
                            toggleCart(cartList);
                            warenkorbladen(user.id, cartList);
                        });

                        userItem.appendChild(cartButton);
                        userItem.appendChild(cartList);
                        userList.appendChild(userItem);
                    }
                });
            });
        })
        .catch(error => {
            console.error('Fehler beim Laden der Benutzerdaten:', error);
        });
}

// Funktion zum Laden des Warenkorbs eines Benutzers
function warenkorbladen(userId, cartList) {
    fetch('https://dummyjson.com/carts')
        .then(response => response.json())
        .then(data => {
            let cartItems = data.carts.filter(cart => cart.userId === userId);

            if (cartItems.length === 0) {
                alert('Kein Warenkorb für diesen Benutzer gefunden.');
                return;
            }
            //Erstellt eine Liste von Produktnamen im Warenkorb 
            let productNames = cartItems[0].products.map(product => product.title).join(', ');
            cartList.innerHTML = `<li>Produkte im Warenkorb: ${productNames}</li>`;
        })
        .catch(error => {
            console.error('Fehler beim Laden der Warenkorbdaten:', error);
        });
}

// Funktion zum Überprüfen, ob ein Benutzer einen Warenkorb hat
function benutzerhatcart(userId) {
    return fetch('https://dummyjson.com/carts')
        .then(response => response.json())
        .then(data => {
            return data.carts.some(cart => cart.userId === userId);
        })
        .catch(error => {
            console.error('Fehler beim Laden der Warenkorbdaten:', error);
            return false;
        });
}

// Funktion zum Ein-/Ausblenden des Warenkorbs
function toggleCart(cartList) {
    if (cartList.style.display === 'none') {
        cartList.style.display = 'block';
    } else {
        cartList.style.display = 'none';
    }
}

// Lade Benutzer mit Warenkörben beim Laden der Seite
benutzerladen();




