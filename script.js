// Données des produits
const produits = [
    {
        nom: 'Collection Lavande',
        image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80',
        description: 'Une fragrance apaisante pour vos soirées détente',
        prix: 24
    },
    {
        nom: 'Collection Vanille',
        image: 'https://joiebylise.com/cdn/shop/files/Photoroom_20241008_072209.jpg?v=1728399058&width=1946',
        description: 'Des notes douces et chaleureuses',
        prix: 22
    },
    {
        nom: 'Collection Bois de Santal',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMefJL8e44_7qcOeyCderrowgNtCboAn3Asw&s',
        description: 'Une ambiance boisée et élégante',
        prix: 26
    }
];

// Fonction pour générer les produits
function AfficherProduits() {
    const produitsContainer = document.querySelector('.product-container');

    for (let i = 0; i < produits.length; i++) {
        const produit = produits[i];
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}">
            <h3>${produit.nom}</h3>
            <p>${produit.description}</p>
            <span class="price">${produit.prix} DH</span>
            <button class="add-to-cart" onclick="ajouterAuPanier('${produit.nom}', ${produit.prix}, '${produit.image}')">
                Ajouter au panier
            </button>
        `;

        produitsContainer.appendChild(productCard);
    }
}

// Liste des produits dans le panier
let produitsAuPanier = [];

const iconePanier = document.getElementById('panier-icon');
const modalPanier = document.getElementById('panier-modal');
const boutonFermer = document.getElementsByClassName('close')[0];
const compteurPanier = document.getElementById('panier-count');

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(nom, prix, image) {
    // Chercher si le produit existe déjà dans le panier
    let produitTrouve = false;

    for (let i = 0; i < produitsAuPanier.length; i++) {
        if (produitsAuPanier[i].nom === nom) {
            produitsAuPanier[i].quantite += 1;
            produitTrouve = true;
            break;
        }
    }

    // Si le produit n'existe pas, on l'ajoute
    if (!produitTrouve) {
        produitsAuPanier.push({
            nom: nom,
            prix: prix,
            image: image,
            quantite: 1
        });
    }

    // Mettre à jour l'affichage
    mettreAJourCompteur();
    afficherPanier();
    modalPanier.style.display = "block";
}

// Fonction pour mettre à jour le nombre d'articles
function mettreAJourCompteur() {
    let nombreTotal = 0;
    for (let i = 0; i < produitsAuPanier.length; i++) {
        nombreTotal += produitsAuPanier[i].quantite;
    }
    compteurPanier.textContent = nombreTotal;
}

// Fonction pour changer la quantité d'un produit
function modifierQuantite(index, changement) {
    produitsAuPanier[index].quantite += changement;

    // Supprimer le produit si la quantité est 0
    if (produitsAuPanier[index].quantite <= 0) {
        produitsAuPanier.splice(index, 1);
    }

    mettreAJourCompteur();
    afficherPanier();
}

// Fonction pour afficher le contenu du panier
function afficherPanier() {
    const conteneurPanier = document.getElementById('panier-items');
    conteneurPanier.innerHTML = '';
    let totalPanier = 0;

    // Afficher chaque produit
    for (let i = 0; i < produitsAuPanier.length; i++) {
        const produit = produitsAuPanier[i];
        const elementProduit = document.createElement('div');
        elementProduit.className = 'panier-item';

        elementProduit.innerHTML = `
                    <img src="${produit.image}" alt="${produit.nom}" width="50">
                    <div class="item-details">
                        <h3>${produit.nom}</h3>
                        <div class="quantite-controls">
                            <button onclick="modifierQuantite(${i}, -1)">-</button>
                            <span>${produit.quantite}</span>
                            <button onclick="modifierQuantite(${i}, 1)">+</button>
                        </div>
                        <p>${produit.prix * produit.quantite} DH</p>
                    </div>
                `;

        conteneurPanier.appendChild(elementProduit);
        totalPanier += produit.prix * produit.quantite;
    }

    // Afficher le total
    document.getElementById('panier-total').textContent = `Total: ${totalPanier} DH`;
}

// Événements pour ouvrir/fermer le panier
iconePanier.onclick = function () {
    modalPanier.style.display = "block";
    afficherPanier();
}

boutonFermer.onclick = function () {
    modalPanier.style.display = "none";
}

// Fermer le panier si on clique en dehors
window.onclick = function (event) {
    if (event.target == modalPanier) {
        modalPanier.style.display = "none";
    }
}

// Appeler la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    AfficherProduits();
    mettreAJourCompteur();
});
