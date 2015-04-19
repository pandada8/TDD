var _ = require('../node_modules/lodash');
var template = require('../node_modules/es6-template-strings');
var dummyWeapon = require('./dummyWeapon.js');
var Player = require('./player.js');
function Hero(name, life, aggressivity, weapon, protection){
    Player.call(this, name, life, aggressivity);
    this.role = "战士";
    this.weapon = _.isEmpty(weapon) ? new dummyWeapon() : weapon;
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
    total_ap += this.weapon.damage();
    var total_damage = victim.beAttack(total_ap)
    return total_damage;
}

Hero.prototype.attack = function attack_by_Hero (victim){
    var attack = this.calcDamage(victim);
    victim.life -= attack;
    var str = template('${ a.role }${ a.name }${ a.weapon.use() }攻击了${ b.role }${ b.name },' +
    '${ b.name }受到了${ attack }点伤害, ${ b.name }的剩余生命值${ b.life }', {
        a:this,
        b:victim,
        attack:attack
    });
    return str;
}

module.exports = Hero

