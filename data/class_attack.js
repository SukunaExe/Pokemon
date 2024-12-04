class Attack {
    /* 
    Fast move :
    "duration"
    "energy_delta"
    "move_id"
    "name"
    "power"
    "stamina_loss_scaler"
    "type"

    Charged move :
    "critical_chance"
    "duration"
    "energy_delta"
    "move_id"
    "name"
    "power"
    "stamina_loss_scaler"
    "type"
    */


    static all_attacks={}

    constructor(move_id, move_name, type, duration, energy_delta, power, stamina_loss_scaler) {
        this._move_id = move_id;
        this._move_name = move_name;
        this._type = type;
        this._duration = duration;
        this._energy_delta = energy_delta;
        this._power = power;
        this._stamina_loss_scaler = stamina_loss_scaler;
    }

    get move_id() {
        return this._move_id;
    }
    get move_name() {
        return this._move_name;
    }
    get type() {
        return this._type;
    }
    get duration() {
        return this._duration;
    }
    get energy_delta() {
        return this._energy_delta;
    }
    get power() {
        return this._power;
    }
    get stamina_loss_scaler() {
        return this._stamina_loss_scaler;
    }


    toString() {
        return `Move ID: ${this.move_id}\n` +
            `Name: ${this.move_name}\n` +
            `Type: ${this.type}\n` +
            `Duration: ${this.duration}\n` +
            `Energy delta: ${this.energy_delta}\n` +
            `Power: ${this.power}\n` +
            `Stamina loss scaler: ${this.stamina_loss_scaler}`;
    }
}






class Fast_moves extends Attack{
    constructor(move_id, move_name, type, duration, energy_delta, power, stamina_loss_scaler){
        super(move_id, move_name, type, duration, energy_delta, power, stamina_loss_scaler);
        Attack.all_attacks[this._move_id]=this;
    }
}

class Charged_moves extends Attack{
    constructor(move_id, move_name, type, duration, energy_delta, power, stamina_loss_scaler, critical_chance){
        super(move_id, move_name, type, duration, energy_delta, power, stamina_loss_scaler);
        this._critical_chance= critical_chance;
        Attack.all_attacks[this._move_id]=this;
    }

    get critical_chance(){
        return this._critical_chance;
    }

    toString() {
        return `Move ID: ${this.move_id}\n` +
            `Name: ${this.move_name}\n` +
            `Type: ${this.type}\n` +
            `Duration: ${this.duration}\n` +
            `Energy delta: ${this.energy_delta}\n` +
            `Power: ${this.power}\n` +
            `Stamina loss scaler: ${this.stamina_loss_scaler}\n` +
            `Critical chance: ${this.critical_chance}`;
    }

}