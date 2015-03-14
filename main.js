var _ = require('./node_modules/lodash');
function Fight(master_a, master_b){
    this.a = master_a;
    this.b = master_b;
    
}
exports.Fight = Fight;
Fight.prototype.record = function(attacker, victim){
};
Fight.prototype.round = function(){
    // First a should attack b
    
}
Fight.prototype.finished = function(){
    return !this.a.life || !this.b.life;
}
Fight.prototype.showWinner = function(){
    var winner = this.a.life > this.b.life ? this.a : this.b;
    var result = _.template('<%= winner.name %> win the game!')({winner:winner});
    console.log(result)
}
Fight.prototype.start = function(){
    while(!this.finished()){
        var round = this.round();
        log(round)
    }
    this.showWinner();
}

function Monster(name, life, aggressivity){
    this.name = name;
    this.life = life;
    this.aggressivity = aggressivity;
    this.role = "Normal Guy"
}
function Hero(name, life, aggressivity){
    Monster.call(this, name, life, aggresivity);
    this.role = "Hero"
}
function log(words){
    console.log(words);
    return words;
}
exports.Monster = Monster;
exports.Hero = Hero;
Monster.prototype.attck = function(monster){
    var attck_number = this.aggressivity > monster.life ? monster.life : this.aggressivity;
    monster.life -= attck_number;
    // show the log
    console.log(this.name+"攻击"+monster.name+"，"+monster.name+"受到" +attck_number+ "的伤害，"+monster.name+"剩余生命值"+monster.life)
}
