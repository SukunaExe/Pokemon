


class Type{
    /* 
    "form": 'Normal'
    "pokemon_id":
    "pokemon_name":
    "type": 
    */
    static all_type={}

    constructor (type_name, coeff) {
        this._type_name=type_name;
        this._coeff=coeff;
        Type.all_type[this._type_name]=this;
    }
    
    get type_name(){
        return this._type_name;
    }
    get coeff(){
        return this._type_name;
    }




    get_coeffdegat(type_adv){
        coeff=Type.type_effectiveness[this.type[0]][type_adv];  
        if (this.type[1]) {
            coeff=coeff*Type.type_effectiveness[this.type[1]][type_adv];
        }      
    }   

    
    toString() {
        return `Pokemon type: ${this.type_name}\n`;
    }
}
    

