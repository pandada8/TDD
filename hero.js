var _ = require('./node_modules/lodash');
var Player = require('./Model.js').Model.Player;
function Hero(name, life, aggressivity, weapon, protection){
    Player.call(this, name, life, aggressivity);
    this.role = "战士";
    this.weapon = weapon;
    this.protection = protection;
}
Hero.constructor = Hero;
Hero.prototype.attack = function attack_by_hero(victim){
    var attack = this.aggressivity + (!_.isEmpty(this.weapon) ? this.weapon.value : 0) - (!_.isEmpty(victim.protection) ? victim.protection.value : 0);
    victim.life -= attack;
    var str = _.template('<%= a.role %><%= a.name %><% print(a.weapon.value ? "用" + a.weapon.name : "") %>攻击了<%= b.role %><%= b.name %>,' +
    '<%= b.name %>受到了<%= attack %>点伤害, <%= b.name %>的剩余生命值<%= b.life %>')({
        a:this,
        b:victim,
        attack:attack
    })
    return str;
}
module.exports = Hero

