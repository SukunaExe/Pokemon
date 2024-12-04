class Pokemon {
    /* 
    "base_attack":
    "base_defense":
    "base_stamina":
    "form": 'Normal'
    "pokemon_id":
    "pokemon_name": 
    */

    static all_pokemons = {};

    constructor(pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina, generation, type,attacks) {
        this._pokemon_id = pokemon_id;
        this._pokemon_name = pokemon_name;
        this._form = form;
        this._base_attack = base_attack;
        this._base_defense = base_defense;
        this._base_stamina = base_stamina;
        this._generation = generation;
        this._types = type;
        this._attacks=attacks;
        Pokemon.all_pokemons[pokemon_id] = this
    }

    // Getters pour chaque propriété
    get pokemon_id() {
        return this._pokemon_id;
    }
    get pokemon_name() {
        return this._pokemon_name;
    }
    get form() {
        return this._form;
    }
    get base_attack() {
        return this._base_attack;
    }
    get base_defense() {
        return this._base_defense;
    }
    get base_stamina() {
        return this._base_stamina;
    }
    get generation(){
        return this._generation;
    }
    get types() {
        return this._types;
    }
    get attacks(){
        return this._attacks;
    }

    toString() {
        return `Pokemon ID: ${this.pokemon_id}\n` +
            `Name: ${this.pokemon_name}\n` +
            `Form: ${this.form}\n` +
            `Base Attack: ${this.base_attack}\n` +
            `Base Defense: ${this.base_defense}\n` +
            `Base Stamina: ${this.base_stamina}` +
            `Base Stamina: ${this.generation}` +
            `Type: ${this.type}\n`;
    }


}