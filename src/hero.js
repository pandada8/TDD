var _ = require('../node_modules/lodash');
var Player = require('./player.js')
function Hero(name, life, aggressivity, weapon, protection){
    Player.call(this, name, life, aggressivity);
    this.role = "战士";
    this.weapon = weapon;
    this.protection = !_.isEmpty(protection) ? protection : {
        name: null,
        value: 0
    };
}
Hero.prototype = Object.create(Player.prototype);
Hero.constructor = Hero;
Hero.prototype.beAttack = function(ap){
    return ap >= this.protection.value ? ap - this.protection.value : 0;
}

Hero.prototype.calcDamage = function(victim){
    var total_ap = 0;
    total_ap += this.aggressivity;
    if (!_.isEmpty(this.weapon)){
        total_ap += this.weapon.value
    }
    var total_damage = victim.beAttack(total_ap)
    return total_damage;
}

module.exports = Hero

