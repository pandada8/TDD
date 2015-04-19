var game = require('../main.js')
var Hero = require('../hero.js');
var Player = require('../player.js');
describe("测试武器属性", function(){
    it("测试武器_延时效果", function(){
        var A = new Hero('张三', 40, 20, {name:"优质毒剑", value:20, effect:{
            name:"中毒",
            type:'毒性',
            affect: function(){
                return -2;
            },
        }},  {});
        var B = new Player('李四', 100, 20);
        A.attack(B);
        var text = B.attack(A);
        expect(text.split("\n")[0]).toBe("李四受到2点毒性伤害,李四剩余生命:78");
    });
    it("测试武器_冰冻效果", function(){
        var A = new Hero('张三', 40, 20, {name:"寒冰箭", value:20, effect:{
            name:"冻僵",
            type:'',
            affect: function(){
                return -2;
            },
        }},  {});
        var B = new Player('李四', 100, 20);
        A.attack(B);
        var text = B.attack(A);
        expect(text.split("\n")[0]).toBe("李四受到2点毒性伤害,李四剩余生命:78");

    })
})