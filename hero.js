var _ = require('./node_modules/lodash');
var Player = require('./player.js')
function Hero(name, life, aggressivity, weapon, protection){
    Player.call(this, name, life, aggressivity);
    this.role = "战士";
    this.weapon = weapon;
    this.protection = protection;
}
Hero.prototype = Object.create(Player.prototype);
Hero.constructor = Hero;

Hero.prototype.calcDamage = function(victim){
    return this.aggressivity + (!_.isEmpty(this.weapon) ? this.weapon.value : 0) - (!_.isEmpty(victim.protection) ? victim.protection.value : 0)
}

module.exports = Hero

