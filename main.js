var _ = require('./node_modules/lodash');

exports.Fight = function Fight(master_a, master_b){
    this.a = master_a;
    this.b = master_b;
}

exports.Fight.prototype.finished = function(){
    return this.a.life <= 0 || this.b.life <= 0;
}

exports.Fight.prototype.Winner = function(){
    var winner = this.a.life > this.b.life ? this.a : this.b;
    return winner;
}

exports.Fight.prototype.logWinner = function(){
    var winner = this.Winner();
    exports.log(_.template("<%= name %>胜利")(winner))
}

exports.Fight.prototype.start = function(){
    var flag = true;
    // the flag is a good idea :/
    while(!this.finished()){
        if (flag){
            this.a.attack(this.b)
        }else{
            this.b.attack(this.a)
        }
        flag = !flag
    }
    this.logWinner();
}

exports.Monster = function Monster(name, life, aggressivity){
    this.name = name;
    this.life = life;
    this.aggressivity = aggressivity;
    this.role = "普通人";
}
exports.Hero = function Hero(name, life, aggressivity){
    exports.Monster.call(this, name, life, aggressivity);
    this.role = "战士";
    this.weapon = arguments.length == 5 ? arguments[3] : null;
    this.protection = arguments.length == 5 ? arguments[4] : null;
}
exports.Hero.constructor = exports.Hero;

exports.Monster.prototype.attack = function attack_by_monster(victim){
    // should we just write this in one line or split it into multi if ?
    var attack = !_.isEmpty(victim.protection) ? (this.aggressivity < victim.protection.value ? 0 : this.aggressivity - victim.protection.value) : this.aggressivity
    victim.life -= attack;
    var str = _.template('<%= a.role %><%= a.name %><% print(a.weapon ? "用" + a.weapon.name : "") %>攻击了<%= b.role %><%= b.name %>,' +
    '<%= b.name %>受到了<%= attack %>点伤害, <%= b.name %>的剩余生命值<%= b.life %>')({
        a:this,
        b:victim,
        attack:attack
    })
    exports.log(str)
}


exports.Hero.prototype.attack = function attack_by_hero(victim){
    var attack = this.aggressivity + (!_.isEmpty(this.weapon) ? this.weapon.value : 0) - (!_.isEmpty(victim.protection) ? victim.protection.value : 0);
    victim.life -= attack;
    var str = _.template('<%= a.role %><%= a.name %><% print(a.weapon ? "用" + a.weapon.name : "") %>攻击了<%= b.role %><%= b.name %>,' +
    '<%= b.name %>受到了<%= attack %>点伤害, <%= b.name %>的剩余生命值<%= b.life %>')({
        a:this,
        b:victim,
        attack:attack
    })
    exports.log(str)
}

exports.log = function log(words){
    console.log(words);
}
