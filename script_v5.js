document.addEventListener("DOMContentLoaded", function () {
    /***************************************** POKEMON_V2 *****************************************/
    const pokemonsPerPage = 25;
    let currentPage = 1;

    //fonction qui trie les pokemons selon la colonne sélectionnée
    function sortPokemon(selectedPokemon) {
        sortElement = null;
        if (screen.width>1200) {
            var selectElements = document.querySelectorAll("#tablePokemon > thead > tr > th");
        }
        else{
            var selectElements = document.querySelectorAll("#sortButtonLittleScreen > h5");
        }
        selectElements.forEach(function (selectElement) {
            if (selectElement.getAttribute("sort") != "" && selectElement.textContent != "Image") {
                sortElement = selectElement;
            }
        });
        if (sortElement == null) {
            return selectedPokemon;
        }
        else {
            //On trie selon la colonne
            switch (sortElement.textContent) {
                case "Nom":
                    if (sortElement.getAttribute("sort") == "ascending") {
                        selectedPokemon.sort((a, b) => {
                            const nameA = a.pokemon_name.toUpperCase(); // Convertit les noms en majuscules pour ignorer la casse
                            const nameB = b.pokemon_name.toUpperCase();
            
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0; // Les noms sont égaux
                        });
                        return selectedPokemon;
                    }
                    else {
                        selectedPokemon.sort((a, b) => {
                            const nameA = a.pokemon_name.toUpperCase(); // Convertit les noms en majuscules pour ignorer la casse
                            const nameB = b.pokemon_name.toUpperCase();

                            if (nameA > nameB) {
                                return -1;
                            }
                            if (nameA < nameB) {
                                return 1;
                            }
                            return 0; // Les noms sont égaux
                        });
                        return selectedPokemon;
                    }
                case "Type":
                    // fonction pour traduire les noms de types en français
                    function getTypeTranslation(type) {
                        switch (type.type_name) {
                            case 'Steel':
                                return 'Acier';
                            case 'Fighting':
                                return 'Combat';
                            case 'Dragon':
                                return 'Dragon';
                            case 'Water':
                                return 'Eau';
                            case 'Electric':
                                return 'Electrique';
                            case 'Fairy':
                                return 'Fée';
                            case 'Fire':
                                return 'Feu';
                            case 'Ice':
                                return 'Glace';
                            case 'Bug':
                                return 'Insecte';
                            case 'Normal':
                                return 'Normal';
                            case 'Grass':
                                return 'Plante';
                            case 'Poison':
                                return 'Poison';
                            case 'Psychic':
                                return 'Psy';
                            case 'Rock':
                                return 'Roche';
                            case 'Ground':
                                return 'Sol';
                            case 'Ghost':
                                return 'Spectre';
                            case 'Dark':
                                return 'Ténèbres';
                            case 'Flying':
                                return 'Vol';
                            default:
                                return type.type_name;
                        }
                    }

                    if (sortElement.getAttribute("sort") == "ascending") {
                        selectedPokemon.sort((a, b) => {
                            // Récupérer concaténer le nom des types ou recupérer le premier si il n'y en à qu'un
                            const typeA = a.types.length === 1 ? getTypeTranslation(a.types[0]) : `${getTypeTranslation(a.types[0])}-${getTypeTranslation(a.types[1])}`;
                            const typeB = b.types.length === 1 ? getTypeTranslation(b.types[0]) : `${getTypeTranslation(b.types[0])}-${getTypeTranslation(b.types[1])}`;

                            // Comparaison des noms des types
                            const typeComparison = typeA.localeCompare(typeB);

                            // Si les types sont égaux, comparer les noms des Pokémon
                            if (typeComparison === 0) {
                                return a.pokemon_name.localeCompare(b.pokemon_name);
                            }

                            return typeComparison;
                        });
                        return selectedPokemon;
                    }
                    else {
                        selectedPokemon.sort((a, b) => {
                            // Récupérer concaténer le nom des types ou recupérer le premier si il n'y en à qu'un
                            const typeA = a.types.length === 1 ? getTypeTranslation(a.types[0]) : `${getTypeTranslation(a.types[0])}-${getTypeTranslation(a.types[1])}`;
                            const typeB = b.types.length === 1 ? getTypeTranslation(b.types[0]) : `${getTypeTranslation(b.types[0])}-${getTypeTranslation(b.types[1])}`;

                            // Comparaison des noms des types
                            const typeComparison = typeB.localeCompare(typeA);

                            // Si les types sont égaux, comparer les noms des Pokémon
                            if (typeComparison === 0) {
                                return b.pokemon_name.localeCompare(a.pokemon_name);
                            }

                            return typeComparison;
                        });
                        return selectedPokemon;
                    }

                case "ID":
                    if (sortElement.getAttribute("sort") == "ascending") {
                        selectedPokemon.sort((a, b) => {
                            return sortNumericValue(a.pokemon_id - b.pokemon_id,a,b);
                        });
                        return selectedPokemon;
                    }
                    else {
                        selectedPokemon.sort((a, b) => {
                            return sortNumericValue(b.pokemon_id - a.pokemon_id,b,a);
                        });
                        return selectedPokemon;
                    }

                case "Generation":
                    if (sortElement.getAttribute("sort") == "ascending") {
                        selectedPokemon.sort((a, b) => {
                            return sortNumericValue(a.generation - b.generation,a,b);
                        });
                        return selectedPokemon;
                    }
                    else {
                        selectedPokemon.sort((a, b) => {
                            return sortNumericValue(b.generation - a.generation,b,a);
                        });
                        return selectedPokemon;
                    }

                case "Endurance":
                    if (sortElement.getAttribute("sort") == "ascending") {
                        selectedPokemon.sort((a, b) => {
                            return sortNumericValue(a.base_stamina - b.base_stamina,a,b);
                        });
                        return selectedPokemon;
                    }
                    else {
                        selectedPokemon.sort((a, b) => {
                            return sortNumericValue(b.base_stamina - a.base_stamina,b,a);
                        });
                        return selectedPokemon;
                    }

                case "Attaque":
                    if (sortElement.getAttribute("sort") == "ascending") {
                        selectedPokemon.sort((a, b) => {
                            return sortNumericValue(a.base_attack - b.base_attack,a,b);
                        });
                        return selectedPokemon;
                    }
                    else {
                        selectedPokemon.sort((a, b) => {
                            return sortNumericValue(b.base_attack - a.base_attack,b,a);
                        });
                        return selectedPokemon;
                    }

                case "Defense":
                    if (sortElement.getAttribute("sort") == "ascending") {
                        selectedPokemon.sort((a, b) => {
                            return sortNumericValue(a.base_defense - b.base_defense,a,b);
                        });
                        return selectedPokemon;
                    }
                    else {
                        selectedPokemon.sort((a, b) => {
                            return sortNumericValue(b.base_defense - a.base_defense,b,a);
                        });
                        return selectedPokemon;
                    }

                default:
                    return selectedPokemon;
            }
        }


        function sortNumericValue(comparison,a,b) {

            if (comparison < 0) {
                return -1;
            }
            if (comparison > 0) {
                return 1;
            }

            // Les valeurs sont égale, on trie sur les noms
            return a.pokemon_name.localeCompare(b.pokemon_name);
        }


    }



    //fonction qui séléctionne les pokémon à partir des filtres
    function determinate_filter(all_pokemons) {
        //console.log(all_pokemons);
        var generationFilter = document.querySelector("#filter-generation").value;
        var typeFilter = document.querySelector("#filter-type").value;
        var nameFilter = document.querySelector("#filter-name").value;

        selectedPokemon = []
        all_pokemons.forEach(pokemon => {
            var valid = true;

            //console.log(parseInt(pokemon.generation));
            if (pokemon.generation === null) {
                valid = false
            }
            else {
                if (generationFilter !== "*" && pokemon.generation != generationFilter) {
                    valid = false;
                }
                if (typeFilter !== "*") {
                    validType = false
                    pokemon.types.forEach(pokemonType => {
                        if (pokemonType.type_name == typeFilter) {
                            validType = true;
                        }
                    })
                    if (validType == false) {
                        valid = false;
                    }
                }
                if (nameFilter !== "" && !pokemon.pokemon_name.toLowerCase().includes(nameFilter.toLowerCase())) {
                    valid = false;
                }
            }

            //console.log(valid);
            //si le pokémon correspond aux filtres on l'ajoute
            if (valid) {
                selectedPokemon.push(pokemon);
            }

        });

        selectedPokemon = sortPokemon(selectedPokemon);
        return selectedPokemon;
    }




    // Fonction pour afficher les Pokémon de la page spécifiée
    function displayPokemons(page) {


        const start = (page - 1) * pokemonsPerPage;
        const end = start + pokemonsPerPage;
        const allPokemons = Object.values(Pokemon.all_pokemons);

        const pokemonsToShow = determinate_filter(allPokemons).slice(start, end);

        // Efface le contenu actuel de la table
        tableBody.innerHTML = '';

        // Affiche les Pokémon de la page actuelle
        pokemonsToShow.forEach(pokemon => {


            // Créez les éléments de ligne et de cellule, puis ajoutez les détails du Pokémon à afficher
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-pokemon-id', pokemon.pokemon_id);

            // Ajout de la cellule pour l'image du Pokémon
            const imageCell = document.createElement('td');
            imageCell.setAttribute('data-label', 'Image');
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            const modalContainer = document.createElement('div');
            modalContainer.classList.add('modal-image-container');
            const pokemonModalImage = document.createElement('img');
            pokemonModalImage.src = pokemon.ImageNormal;
            pokemonModalImage.alt = pokemon.pokemon_name;
            modalContainer.appendChild(pokemonModalImage);
            imageContainer.appendChild(modalContainer);
            let primaryColor = null;
            let secondaryColor = null;
            for (let type of pokemon.types) {
                if (primaryColor == null) {
                    primaryColor = getColorType(type._type_name);
                } else if (pokemon.types.length > 1 && secondaryColor == null) {
                    secondaryColor = getColorType(type._type_name);
                }
            }
            // Appliquez la couleur de la bordure au conteneur de l'image modal du pokemon
            if (pokemon.types.length > 1) {
                modalContainer.style.borderTopColor = primaryColor;
                modalContainer.style.borderLeftColor = primaryColor;
                modalContainer.style.borderRightColor = secondaryColor;
                modalContainer.style.borderBottomColor = secondaryColor;
            } else {
                modalContainer.style.borderColor = primaryColor;
            }

            // Sélectionner tous les conteneurs d'images
            const pokemonImage = document.createElement('img');
            pokemonImage.src = pokemon.ImageSprites;
            pokemonImage.alt = pokemon.pokemon_name;
            imageContainer.appendChild(pokemonImage);
            imageCell.appendChild(imageContainer);
            newRow.appendChild(imageCell);

            // Ajout des autres cellules pour chaque propriété du Pokémon
            const properties = ['pokemon_name', 'types', 'pokemon_id', 'generation', 'base_stamina', 'base_attack', 'base_defense'];
            properties.forEach(property => {
                const cell = document.createElement('td');
                switch (property) {
                    case 'pokemon_name':
                        cell.setAttribute('data-label', 'Nom');
                        break;
                    case 'types':
                        cell.setAttribute('data-label', 'Type');
                        break;
                    case 'pokemon_id':
                        cell.setAttribute('data-label', 'ID');
                        break;
                    case 'generation':
                        cell.setAttribute('data-label', 'Generation');
                        break;
                    case 'base_stamina':
                        cell.setAttribute('data-label', 'Endurance');
                        break;
                    case 'base_attack':
                        cell.setAttribute('data-label', 'Attaque');
                        break;
                    case 'base_defense':
                        cell.setAttribute('data-label', 'Defense');
                        break;
                    default:
                }

                const logoImagePath = "../webp/logo/";

                // Utilisation des propriétés correctes du Pokémon pour remplir les cellules
                if (property === 'types') {
                    let imgTags = '';

                    for (let type of pokemon.types) {
                        imgTags += getTypeImageTag(type._type_name);
                    }

                    // Créez une balise <div> et ajoutez le contenu des balises <img>
                    const divElement = document.createElement('div');
                    // Ajoutez des classes à la balise <div>
                    divElement.classList.add('types-container');
                    divElement.innerHTML = imgTags;

                    // Ajoutez la balise <div> avec les balises <img> à l'intérieur à la cellule <td>
                    cell.appendChild(divElement);
                } else if (property === 'pokemon_id') {
                    // Formater l'identifiant du Pokémon
                    const formattedId = formatId(pokemon.pokemon_id);
                    // Ajouter le texte formatté à la cellule
                    cell.textContent = formattedId;

                } else if (property === 'generation') {
                    // Formater l'identifiant du Pokémon
                    const formattedGeneration = formatPokemonGeneration(pokemon.generation);
                    // Ajouter le texte formatté à la cellule
                    cell.textContent = formattedGeneration;

                } else if (property === 'base_stamina' || property === 'base_attack' || property === 'base_defense') {
                    // Créez une balise <div> et ajoutez-y le contenu des balises <img>
                    const divElement = document.createElement('div');
                    // Ajoutez des classes à la balise <div>
                    divElement.classList.add('stats-container');

                    // Créez un élément pour le texte pokemon[property]
                    const textElement = document.createElement('span');
                    textElement.textContent = pokemon[property];

                    // Créez un élément pour l'image
                    const imgElement = document.createElement('img');
                    switch (property) {
                        case 'base_stamina':
                            imgElement.src = logoImagePath + 'endurance.svg';
                            break;
                        case 'base_attack':
                            imgElement.src = logoImagePath + 'attack.svg';
                            break;
                        case 'base_defense':
                            imgElement.src = logoImagePath + 'defense.svg';
                            break;
                    }

                    // Ajoutez une classe à l'image pour le style
                    imgElement.classList.add('stats-icon');

                    // Ajoutez le texte et l'image à la balise <div>
                    divElement.appendChild(textElement);
                    divElement.appendChild(imgElement);

                    // Ajoutez la balise <div> avec les balises <img> à l'intérieur à la cellule <td>
                    cell.appendChild(divElement);
                } else {
                    // Pour toutes les autres propriétés
                    cell.textContent = pokemon[property];
                }

                newRow.appendChild(cell);
            });

            tableBody.appendChild(newRow);
        });
    }

    // Fonction pour mettre à jour l'état des boutons de navigation en fonction de la page actuelle
    function updateNavigationButtons() {
        const totalPokemons = determinate_filter(Object.values(Pokemon.all_pokemons)).length;
        const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

        // Met à jour le texte affichant le numéro de page actuelle et le nombre total de pages
        const pageInfo = document.getElementById('pageInfo');
        pageInfo.textContent = `Page ${currentPage} sur ${totalPages}`;

        // Met à jour l'état des boutons de navigation
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');

        if (currentPage === 1 && currentPage !== totalPages) {
            prevButton.disabled = true;
            prevButton.style.display = 'none';
            nextButton.disabled = false;
            nextButton.style.display = 'inline-block';
        } else if (currentPage === totalPages) {
            prevButton.disabled = false;
            prevButton.style.display = 'inline-block';
            nextButton.disabled = true;
            nextButton.style.display = 'none';
        } else {
            prevButton.disabled = false;
            prevButton.style.display = 'inline-block';
            nextButton.disabled = false;
            nextButton.style.display = 'inline-block';
        }
    }

    // Gérez le clic sur le bouton "PRÉC"
    document.getElementById('prevButton').addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            displayPokemons(currentPage);
            updateNavigationButtons();
        }
    });

    // Gérez le clic sur le bouton "SUIV"
    document.getElementById('nextButton').addEventListener('click', function () {
        const totalPokemons = Object.values(Pokemon.all_pokemons).length;
        const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayPokemons(currentPage);
            updateNavigationButtons();
        }
    });

    /***************************************** POKEMON_V3 *****************************************/

    // Fonction pour gérer l'événement de clic sur une ligne de Pokémon
    function handlePokemonClick(event) {
        const clickedRow = event.target.closest('tr[data-pokemon-id]');
        if (clickedRow) {
            const pokemonId = clickedRow.getAttribute('data-pokemon-id');
            const pokemon = Pokemon.all_pokemons[pokemonId];
            displayPokemonDetails(pokemon);
        }
    }

    // Fonction pour afficher les détails d'un Pokémon dans la zone de détails
    function displayPokemonDetails(pokemon) {
        /*==================== RECUPERATION DES DIFFERENTS DIV DE LA MODAL ====================*/
        const pokemonName = document.getElementById('modalPokemonName');
        const pokemonImageContainer = document.getElementById('modalPokemonImage');
        const pokemonIDContainer = document.getElementById('modalPokemonID');
        const pokemonTypesContainer = document.getElementById('modalPokemonTypes');
        const pokemonStatsContainer = document.getElementById('modalPokemonStats');
        const chargedAttacks = document.getElementById('chargedAttacks');
        const fastAttacks = document.getElementById('fastAttacks');
        const chargedAttackStatsDiv = document.querySelector('.modal-charged-attack-stats');
        const fastAttackStatsDiv = document.querySelector('.modal-fast-attack-stats');

        /*==================== GESTION DU NOM ====================*/
        pokemonName.textContent = pokemon.pokemon_name;

        /*==================== GESTION DE L'IMAGE ====================*/
        // Créez un élément <img> pour afficher l'image du Pokémon
        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.ImageThumbnails; // Utilisez l'URL de l'image sprites du Pokémon
        pokemonImage.alt = pokemon.pokemon_name; // Utilisez le nom du Pokémon comme texte alternatif
        pokemonImage.classList.add('pokemon-image'); // Ajoutez une classe pour le style CSS si nécessaire
        pokemonImageContainer.innerHTML = ''; // Efface tout contenu précédent dans le conteneur de l'image du Pokémon
        pokemonImageContainer.appendChild(pokemonImage); // Ajoutez l'élément <img> au conteneur de l'image du Pokémon

        /*==================== GESTION DE L'ID ====================*/
        // Efface tout contenu précédent dans le conteneur de l'ID du Pokémon
        pokemonIDContainer.innerHTML = '';
        const IDContainer = document.createElement('div');
        IDContainer.textContent = formatId(pokemon.pokemon_id);
        pokemonIDContainer.appendChild(IDContainer);

        /*==================== GESTION DES TYPES ====================*/
        // Efface tout contenu précédent dans le conteneur des détails du Pokémon
        pokemonTypesContainer.innerHTML = '';
        // Ajoutez les types du Pokémon aux détails
        const typesContainer = document.createElement('div');
        typesContainer.classList.add('modal-types-container');
        let imgTags = '';
        let primaryColor = null;
        let secondaryColor = null;
        for (let type of pokemon.types) {
            imgTags += getTypeImageTag(type._type_name);
            if (primaryColor == null) {
                primaryColor = getColorType(type._type_name);
            } else if (pokemon.types.length > 1 && secondaryColor == null) {
                secondaryColor = getColorType(type._type_name);
            }
        }
        typesContainer.innerHTML = imgTags;
        pokemonTypesContainer.appendChild(typesContainer);
        // Appliquez la couleur de la bordure au conteneur des détails du Pokémon
        if (pokemon.types.length > 1) {
            pokemonImageContainer.style.borderTopColor = primaryColor;
            pokemonImageContainer.style.borderLeftColor = primaryColor;
            pokemonImageContainer.style.borderRightColor = secondaryColor;
            pokemonImageContainer.style.borderBottomColor = secondaryColor;
        } else {
            pokemonImageContainer.style.borderColor = primaryColor;
        }

        /*==================== GESTION DES STATS ====================*/
        // Efface tout contenu précédent dans le conteneur des détails du Pokémon
        pokemonStatsContainer.innerHTML = '';
        // Création du conteneur des statistiques
        const statsContainer = document.createElement('div');
        statsContainer.classList.add('modal-stats-container');
        // Recherche des stats maximales pour chaque caractéristiques
        const maxStamina = getMAX_STAMINA();
        const maxAttack = getMAX_ATTACK();
        const maxDefense = getMAX_DEFENSE();
        // Création de la fonction pour obtenir le pourcentage
        function getPercentage(baseValue, maxValue) {
            return (baseValue / maxValue) * 100;
        }

        // Création des gauges pour chaque statistique
        // STAMINA
        const statsStaminaContainer = document.createElement('div');
        statsStaminaContainer.classList.add('modal-stats-element-container');

        const staminaFullGauge = document.createElement('div');
        staminaFullGauge.classList.add('stat-full-gauge');
        const staminaData = document.createElement('div');
        staminaData.classList.add('stat-data-gauge');
        staminaData.textContent = pokemon.base_stamina
        // Ajouter l'image de l'endurance
        const imgStamina = document.createElement('img');
        imgStamina.src = '../webp/logo/endurance.svg';
        imgStamina.classList.add('stats-icon');
        staminaData.appendChild(imgStamina);

        const staminaGauge = document.createElement('div');
        staminaGauge.classList.add('stat-gauge');
        staminaGauge.style.backgroundColor = getStatsColor(getPercentage(pokemon.base_stamina, maxStamina))
        staminaFullGauge.style.borderColor = getStatsColor(getPercentage(pokemon.base_stamina, maxStamina))
        staminaGauge.style.width = getPercentage(pokemon.base_stamina, maxStamina) + '%';

        // ATTACK
        const statsAttackContainer = document.createElement('div');
        statsAttackContainer.classList.add('modal-stats-element-container');

        const attackFullGauge = document.createElement('div');
        attackFullGauge.classList.add('stat-full-gauge');

        const attackData = document.createElement('div');
        attackData.classList.add('stat-data-gauge');
        attackData.textContent = pokemon.base_attack
        // Ajouter l'image de l'endurance
        const imgAttack = document.createElement('img');
        imgAttack.src = '../webp/logo/attack.svg';
        imgAttack.classList.add('stats-icon');
        attackData.appendChild(imgAttack);

        const attackGauge = document.createElement('div');
        attackGauge.classList.add('stat-gauge');
        attackGauge.style.backgroundColor = getStatsColor(getPercentage(pokemon.base_attack, maxAttack))
        attackFullGauge.style.borderColor = getStatsColor(getPercentage(pokemon.base_attack, maxAttack))
        attackGauge.style.width = getPercentage(pokemon.base_attack, maxAttack) + '%';

        // DEFENSE
        const statsDefenseContainer = document.createElement('div');
        statsDefenseContainer.classList.add('modal-stats-element-container');

        const defenseFullGauge = document.createElement('div');
        defenseFullGauge.classList.add('stat-full-gauge');
        const defenseData = document.createElement('div');
        defenseData.classList.add('stat-data-gauge');
        defenseData.textContent = pokemon.base_defense
        // Ajouter l'image de l'endurance
        const imgDefense = document.createElement('img');
        imgDefense.src = '../webp/logo/defense.svg';
        imgDefense.classList.add('stats-icon');
        defenseData.appendChild(imgDefense);

        const defenseGauge = document.createElement('div');
        defenseGauge.classList.add('stat-gauge');
        defenseGauge.style.backgroundColor = getStatsColor(getPercentage(pokemon.base_defense, maxDefense))
        defenseFullGauge.style.borderColor = getStatsColor(getPercentage(pokemon.base_defense, maxDefense))
        defenseGauge.style.width = getPercentage(pokemon.base_defense, maxDefense) + '%';

        // Ajout des jauges au conteneur de chaque stats
        staminaFullGauge.appendChild(staminaGauge);
        staminaFullGauge.appendChild(staminaData);
        statsStaminaContainer.appendChild(staminaFullGauge);
        attackFullGauge.appendChild(attackGauge);
        attackFullGauge.appendChild(attackData);
        statsAttackContainer.appendChild(attackFullGauge);
        defenseFullGauge.appendChild(defenseGauge);
        defenseFullGauge.appendChild(defenseData);
        statsDefenseContainer.appendChild(defenseFullGauge);


        // Ajout des jauges au conteneur des statistiques
        statsContainer.appendChild(statsStaminaContainer);
        statsContainer.appendChild(statsAttackContainer);
        statsContainer.appendChild(statsDefenseContainer);

        // Ajout du conteneur des statistiques au conteneur principal
        pokemonStatsContainer.appendChild(statsContainer);



        /*==================== GESTION DES ATTAQUES ====================*/
        // Effacer tout contenu précédent des attaques chargées et rapides
        chargedAttacks.innerHTML = '';
        fastAttacks.innerHTML = '';

        // Sélection des éléments de menu déroulant
        const chargedAttacksSelect = document.getElementById('chargedAttacks');
        const fastAttacksSelect = document.getElementById('fastAttacks');

        // Créer une fonction pour ajouter les propriétés de l'attaque dans des divs
        function addAttackPropertiesToDiv(attackDiv, attack, attackProperties) {
            // Effacer le contenu précédent du div
            attackDiv.innerHTML = '';

            // Map des noms de propriétés en français
            const frenchPropertyNames = {
                _move_name: 'Nom',
                _type: 'Type',
                _move_id: 'ID',
                _power: 'Puissance',
                _energy_delta: 'Énergie',
                _duration: 'Durée',
                _stamina_loss_scaler: 'Perte de Stamina',
                _critical_chance: 'Chance Critique'
            };

            // Pour chaque propriété de l'attaque
            attackProperties.forEach(property => {
                // Vérifier si la propriété existe dans l'objet frenchPropertyNames
                if (property in frenchPropertyNames && attack[property] !== undefined) {
                    // Créer un div pour la propriété
                    const propertyDiv = document.createElement('div');
                    // Ajouter les classes CSS pour la mise en forme
                    propertyDiv.classList.add('attack-property');
                    // Ajouter un attribut data-label avec le nom de la propriété en français
                    propertyDiv.dataset.label = frenchPropertyNames[property];
                    if (property === '_type') {
                        let imgTags = '';

                        imgTags += getTypeImageTag(attack._type);

                        // Créez une balise <div> et ajoutez le contenu des balises <img>
                        const divElement = document.createElement('div');
                        // Ajoutez des classes à la balise <div>
                        divElement.classList.add('attack-types-container');
                        divElement.innerHTML = imgTags;
                        propertyDiv.appendChild(divElement);
                    } else if (property === '_move_id') {
                        // Formater l'identifiant du Pokémon
                        const formattedId = formatId(attack._move_id);
                        // Ajouter le texte formatté à la cellule
                        propertyDiv.textContent = formattedId;
                    } else {
                        // Afficher le nom de la propriété en français
                        propertyDiv.textContent = attack[property];
                    }

                    // Ajouter le div de propriété au div de l'attaque
                    attackDiv.appendChild(propertyDiv);
                }
            });
        }


        // Liste des propriétés de l'attaque
        const properties_attack = ['_move_name', '_type', '_move_id', '_power', '_energy_delta', '_duration', '_stamina_loss_scaler', '_critical_chance'];

        // Ajout des cellules pour chaque attaque chargée
        pokemon.attacks.forEach(attack => {
            if (attack instanceof Charged_moves) {
                const option = document.createElement('option');
                option.textContent = attack._move_name;
                chargedAttacksSelect.appendChild(option);

                // Ajouter les propriétés de l'attaque à chargedAttackStatsDiv
                addAttackPropertiesToDiv(chargedAttackStatsDiv, attack, properties_attack);

                // Ajouter le div des stats de l'attaque chargée au conteneur approprié
                document.getElementById('modalChargedAttackDetails').appendChild(chargedAttackStatsDiv);
            } else if (attack instanceof Fast_moves) {
                const option = document.createElement('option');
                option.textContent = attack._move_name;
                fastAttacksSelect.appendChild(option);

                // Ajouter les propriétés de l'attaque à fastAttackStatsDiv
                addAttackPropertiesToDiv(fastAttackStatsDiv, attack, properties_attack);

                // Ajouter le div des stats de l'attaque rapide au conteneur approprié
                document.getElementById('modalFastAttackDetails').appendChild(fastAttackStatsDiv);
            }
        });

        // Fonction pour effacer le contenu des divs des statistiques des attaques
        function clearAttackStats() {
            chargedAttackStatsDiv.innerHTML = '';
            fastAttackStatsDiv.innerHTML = '';
        }

        // Appeler la fonction pour effacer les statistiques des attaques au chargement de la page
        clearAttackStats();

        // Définir l'indice de sélection initial sur -1 pour les deux menus déroulants
        chargedAttacksSelect.selectedIndex = -1;
        fastAttacksSelect.selectedIndex = -1;

        // Ajouter un gestionnaire d'événements pour le menu déroulant des attaques chargées
        chargedAttacksSelect.addEventListener('change', function () {
            // Effacer le contenu précédent du div des statistiques des attaques chargées
            chargedAttackStatsDiv.innerHTML = '';

            // Récupérer l'index de l'attaque sélectionnée dans le menu déroulant
            const selectedIndex = chargedAttacksSelect.selectedIndex;

            // Vérifier si une attaque est sélectionnée
            if (selectedIndex !== -1) {
                // Récupérer l'attaque sélectionnée à partir de l'index
                const selectedAttack = pokemon.attacks.filter(attack => attack instanceof Charged_moves)[selectedIndex];

                // Afficher les statistiques de l'attaque sélectionnée
                addAttackPropertiesToDiv(chargedAttackStatsDiv, selectedAttack, properties_attack);
            }
        });

        // Ajouter un gestionnaire d'événements pour le menu déroulant des attaques rapides
        fastAttacksSelect.addEventListener('change', function () {
            // Effacer le contenu précédent du div des statistiques des attaques rapides
            fastAttackStatsDiv.innerHTML = '';

            // Récupérer l'index de l'attaque sélectionnée dans le menu déroulant
            const selectedIndex = fastAttacksSelect.selectedIndex;

            // Vérifier si une attaque est sélectionnée
            if (selectedIndex !== -1) {
                // Récupérer l'attaque sélectionnée à partir de l'index
                const selectedAttack = pokemon.attacks.filter(attack => attack instanceof Fast_moves)[selectedIndex];

                // Afficher les statistiques de l'attaque sélectionnée
                addAttackPropertiesToDiv(fastAttackStatsDiv, selectedAttack, properties_attack);
            }
        });

        // Affiche la zone de détails
        const modal = document.getElementById('modal');
        modal.style.display = 'flex';
        const modalOverlay = document.getElementById('modal-overlay');
        modalOverlay.style.display = 'flex';
    }

    // Gestionnaire d'événement pour le clic sur le bouton "FERMER" dans la zone de détails
    document.getElementById('modalClose').addEventListener('click', function () {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    });

    // Gestionnaire d'événement pour le clic sur le bouton "FERMER" dans la zone de détails
    document.getElementById('modal-overlay').addEventListener('click', function () {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    });

    // Récupération de l'élément tbody
    const tableBody = document.getElementById('tableBody');

    // Ajout de l'événement de clic sur chaque ligne de Pokémon
    tableBody.addEventListener('click', handlePokemonClick);

    // Appelez la fonction pour afficher les Pokémon de la première page
    displayPokemons(currentPage);
    // Met à jour l'état initial des boutons de navigation
    updateNavigationButtons();





/***************************************** POKEMON_V4 *****************************************/



    var selectElements = document.querySelectorAll("#filter-container select");

    // Parcours de chaque élément select dans la NodeList
    selectElements.forEach(function (selectElement) {
        // Ajout d'un ecouteur "change" à chaque élément <select>
        selectElement.addEventListener("change", function () {
            currentPage = 1;
            displayPokemons(currentPage);
            updateNavigationButtons();
        });
    });


    var inputElement = document.getElementById("filter-name");
    // Ajout d'un ecouteur "input" à l'input text
    inputElement.addEventListener("input", function (event) {
        currentPage = 1;
        displayPokemons(currentPage);
        updateNavigationButtons();
    });



    /***************************************** POKEMON_V5 *****************************************/




    //On vérifie quel element écouter selon le format de l'écrant
    if (screen.width>1200) {
        var selectElements = document.querySelectorAll("#tablePokemon > thead > tr > th");
    }
    else{
        var selectElements = document.querySelectorAll("#sortButtonLittleScreen > h5");
    }

    // Parcours de chaque élément select dans la NodeList
    selectElements.forEach(function (selectElement) {
        // Ajout d'un ecouteur "click" à chaque élément <select>
        selectElement.addEventListener("click", function (event) {

            //On met à jour le filtre à appliquer
            if (event.target.textContent != "Image") {
                switch (event.target.getAttribute("sort")) {
                    case "":
                        event.target.setAttribute("sort", "ascending");
                        event.target.style.fontSize = "24px";
                        break;
                    case "ascending":
                        event.target.setAttribute("sort", "descending");
                        event.target.style.fontSize = "24px";
                        break;
                    case "descending":
                        event.target.setAttribute("sort", "");
                        event.target.style.fontSize = "";
                        break;
                    default:
                        event.target.setAttribute("sort", "");
                        event.target.style.fontSize = "";
                        break;
                }

                selectElements.forEach(columnHeader => {
                    if (columnHeader.textContent != event.target.textContent) {
                        //console.log(columnHeader.textContent)
                        columnHeader.setAttribute("sort", "");
                        columnHeader.style.fontSize = "";
                    }
                });

                displayPokemons(currentPage)
            }
        });
    });



});