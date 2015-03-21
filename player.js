var _ = require('./node_modules/lodash');
function Player(name, life, aggressivity){
    this.name = name;
    this.life = life;
    this.aggressivity = aggressivity;
    this.role = '普通人';
    this.weapon = {};
    this.protection = {};
}

Player.prototype.calcDamage = function CalcuteDamage(victim){
    var ret = this.aggressivity;
    if (!_.isEmpty(victim.protection) && victim.protection.value <= this.aggressivity){
        ret -= victim.protection.value;
    }
    return ret;
}

Player.prototype.attack = function attack_by_monster(victim){
    // should we justwrite this in one line or split it into multi if ?
    var attack = this.calcDamage(victim);
    victim.life -= attack;
    var str = _.template('<%= a.role %><%= a.name %><% print(a.weapon.value ? "用" + a.weapon.name : "") %>攻击了<%= b.role %><%= b.name %>,' +
    '<%= b.name %>受到了<%= attack %>点伤害, <%= b.name %>的剩余生命值<%= b.life %>')({
        a:this,
        b:victim,
        attack:attack
    })
    return str;
}


module.exports = Player;
