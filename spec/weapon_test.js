var game = require('../main.js')
var Hero = require('../hero.js');
var Player = require('../player.js');
describe("测试武器属性", function(){
    it("测试_武器延时效果", function(){
        var A = new Hero('张三', 40, 20, {name:"优质毒剑", value:20, effect:{
            name:"中毒",
            type:'毒性',
            affect: function(){
                return -2;
            },

        }},   {});
        var B = new Player('李四', 100, 20);
        var text = A.attack(B)
        expect(text).toBe("战士张三用优质毒箭攻击了普通人李四,李四受到了20点伤害,李四的剩余生命值80");
    })
})