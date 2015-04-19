var _ = require('../node_modules/lodash');



Fight = function Fight(master_a, master_b, logger){
    this.a = master_a;
    this.b = master_b;
    this.logger = logger;
}

Fight.prototype.finished = function(){
    return this.a.life <= 0 || this.b.life <= 0;
}

Fight.prototype.Winner = function(){
    var winner = this.a.life > this.b.life ? this.a : this.b;
    return winner;
}

Fight.prototype.logWinner = function(){
    var winner = this.Winner();
    this.logger.log(_.template("<%= name %>胜利")(winner))
}

Fight.prototype.start = function(){
    var flag = true;
    // the flag is a good idea :/
    while(!this.finished()){
        if (flag){
            this.logger.log(this.a.attack(this.b));
        }else{
            this.logger.log(this.b.attack(this.a))
        }
        flag = !flag
    }
    this.logWinner();
}

exports.Fight = Fight;
