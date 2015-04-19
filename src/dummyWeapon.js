var _ = require('../node_modules/lodash')

function DummyWeapon(name, value){
    this.name = name;
    this.value =value ? value : 0;
    this.effect = {};
}

DummyWeapon.prototype.use = function(){
    return this.name ? "用" + this.name : "";
};

DummyWeapon.prototype.damage = function(victim){
    return this.value;
};

module.exports = DummyWeapon;