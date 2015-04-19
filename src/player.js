var _ = require('../node_modules/lodash');
var template = require('../node_modules/es6-template-strings');

function Player(name, life, aggressivity){
    this.name = name;
    this.life = life;
    this.aggressivity = aggressivity;
    this.role = '普通人';
}

Player.prototype.calcDamage = function CalcuteDamage(victim){
    var ret = this.aggressivity;
    ret = victim.beAttack(ret)
    return ret;
}
Player.prototype.beAttack = function(ap){
    return ap;
}
Player.prototype.attack = function attack_by_monster(victim){
    // should we just write this in one line or split it into multi if ?
    var attack = this.calcDamage(victim);
    victim.life -= attack;
    var str = template('${ a.role }${ a.name }攻击了${ b.role }${ b.name },' +
    '${ b.name }受到了${ attack }点伤害, ${ b.name }的剩余生命值${ b.life }',{
        a:this,
        b:victim,
        attack:attack
    });
    return str;
}


module.exports = Player;
