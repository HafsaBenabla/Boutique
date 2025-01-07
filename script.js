// Liste des produits
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

// Tableaux pour stocker les produits du panier et des favoris
let produitsAuPanier = [];
let produitsFavoris = [];

// Fonction pour afficher tous les produits sur la page
function afficherProduits() {
    let conteneur = document.querySelector('.product-container');
    conteneur.innerHTML = '';

    for (let i = 0; i < produits.length; i++) {
        let produit = produits[i];
        let estFavori = false;
        for (let j = 0; j < produitsFavoris.length; j++) {
            if (produitsFavoris[j].nom === produit.nom) {
                estFavori = true;
                break;
            }
        }

        let carte = document.createElement('div');
        carte.className = 'product-card';
        let classeBouton = "favori";
        if (estFavori) {
            classeBouton = "favori active";
        }

        carte.innerHTML = `
            <div class="product-header">
                <img src="${produit.image}" alt="${produit.nom}">
                <button class="${classeBouton}" onclick="gererFavoris('${produit.nom}', ${produit.prix}, '${produit.image}')">
                    <span class="coeur-icon">❤️</span>
                </button>
            </div>
            <h3>${produit.nom}</h3>
            <p>${produit.description}</p>
            <span class="price">${produit.prix} DH</span>
            <button class="add-to-cart" onclick="ajouterAuPanier('${produit.nom}', ${produit.prix}, '${produit.image}')">
                Ajouter au panier
            </button>
        `;

        conteneur.appendChild(carte);
    }
}

// Fonction pour gérer les favoris (ajouter/retirer)
function gererFavoris(nom, prix, image) {
    let dejaFavori = false;
    let position = -1;

    for (let i = 0; i < produitsFavoris.length; i++) {
        if (produitsFavoris[i].nom === nom) {
            dejaFavori = true;
            position = i;
            break;
        }
    }

    if (!dejaFavori) {
        let nouveauFavori = {
            nom: nom,
            prix: prix,
            image: image
        };
        produitsFavoris.push(nouveauFavori);
    }

    else {
        produitsFavoris.splice(position, 1);
    }

    afficherProduits();
    mettreAJourCompteurFavoris();
    afficherFavoris();
}

// Fonction pour afficher la liste des favoris
function afficherFavoris() {
    let liste = document.getElementById('favoris-liste');
    liste.innerHTML = '';

    if (produitsFavoris.length === 0) {
        liste.innerHTML = '<p>Aucun article dans vos favoris</p>';
        return;
    }

    for (let i = 0; i < produitsFavoris.length; i++) {
        let produit = produitsFavoris[i];
        let element = document.createElement('div');
        element.className = 'favori-item';
        element.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}">
            <div class="favori-info">
                <h3>${produit.nom}</h3>
                <p>${produit.prix} DH</p>
            </div>
            <button class="supprimer-favori" onclick="supprimerFavori(${i})">Supprimer</button>
        `;
        liste.appendChild(element);
    }
}

// Fonction pour supprimer un favori
function supprimerFavori(position) {
    produitsFavoris.splice(position, 1);
    afficherProduits();
    mettreAJourCompteurFavoris();
    afficherFavoris();
}

// Fonction pour mettre à jour le nombre de favoris
function mettreAJourCompteurFavoris() {
    let compteur = document.getElementById('favoris-count');
    compteur.textContent = produitsFavoris.length;
}

// Fonction pour ajouter au panier
function ajouterAuPanier(nom, prix, image) {
    
    let dejaAuPanier = false;

    for (let i = 0; i < produitsAuPanier.length; i++) {
        if (produitsAuPanier[i].nom === nom) {
            produitsAuPanier[i].quantite += 1;
            dejaAuPanier = true;
            break;
        }
    }

    if (!dejaAuPanier) {
        produitsAuPanier.push({
            nom: nom,
            prix: prix,
            image: image,
            quantite: 1
        });
    }

    // On met à jour l'affichage
    mettreAJourCompteurPanier();
    afficherPanier();
}

// Fonction pour mettre à jour le nombre d'articles dans le panier
function mettreAJourCompteurPanier() {
    let total = 0;
    for (let i = 0; i < produitsAuPanier.length; i++) {
        total += produitsAuPanier[i].quantite;
    }
    document.getElementById('panier-count').textContent = total;
}

// Fonction pour afficher le panier
function afficherPanier() {
    let liste = document.getElementById('panier-liste');
    liste.innerHTML = '';

    // Si panier vide, on affiche un message
    if (produitsAuPanier.length === 0) {
        liste.innerHTML = '<p>Votre panier est vide</p>';
        return;
    }

    // Pour chaque produit dans le panier
    let total = 0;
    for (let i = 0; i < produitsAuPanier.length; i++) {
        let produit = produitsAuPanier[i];
        total += produit.prix * produit.quantite;

        let element = document.createElement('div');
        element.className = 'panier-item';
        element.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}">
            <div class="panier-info">
                <h3>${produit.nom}</h3>
                <p>${produit.prix} DH x ${produit.quantite}</p>
            </div>
            <div class="quantite-controls">
                <button onclick="modifierQuantite(${i}, -1)">-</button>
                <span>${produit.quantite}</span>
                <button onclick="modifierQuantite(${i}, 1)">+</button>
            </div>
        `;
        liste.appendChild(element);
    }

    // Afficher le total
    document.getElementById('panier-total').textContent = `Total: ${total} DH`;
}

// Fonction pour modifier la quantité d'un produit dans le panier
function modifierQuantite(position, changement) {
    produitsAuPanier[position].quantite += changement;

    // Si quantité arrive à 0, on retire le produit
    if (produitsAuPanier[position].quantite <= 0) {
        produitsAuPanier.splice(position, 1);
    }

   
    mettreAJourCompteurPanier();
    afficherPanier();
}

// Événements pour les modals
document.getElementById('favoris-icon').onclick = function () {
    document.getElementById('favoris-modal').style.display = 'block';
    afficherFavoris();
};

document.getElementById('panier-icon').onclick = function () {
    document.getElementById('panier-modal').style.display = 'block';
    afficherPanier();
};

// Fermer les modals quand on clique sur X
let boutonsFermer = document.querySelectorAll('.close');
for (let i = 0; i < boutonsFermer.length; i++) {
    boutonsFermer[i].onclick = function () {
        this.parentElement.parentElement.style.display = 'none';
    };
}

// Fermer les modals si on clique en dehors
window.onclick = function (event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
};

// Initialiser l'affichage au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    afficherProduits();
    mettreAJourCompteurPanier();
    mettreAJourCompteurFavoris();
});
