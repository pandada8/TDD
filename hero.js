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
    var ret = 0;
    ret += this.aggressivity;
    if (!_.isEmpty(this.weapon)){
        ret += this.weapon.value
    }
    if (!_.isEmpty(victim.protection)){
        ret -= victim.protection.value
    }
    return ret;
}

module.exports = Hero

