var game = require('../main.js')
var Hero = require('../hero.js');
describe("测试 Log 与 攻击", function(){
     it("测试Log_两个正常人", function(){
        var A = new game.model.Player('张三', 10, 20);
        var B = new game.model.Player('李四', 10, 20);
        var text = A.attack(B);
        expect(text).toBe("普通人张三攻击了普通人李四,李四受到了20点伤害, 李四的剩余生命值-10")
    })

    it("测试Log_有武器战士攻击正常人", function(){
        var A = new Hero('张三', 40, 20, {name:'木剑', value:20}, {});
        var B = new game.model.Player('李四', 100, 20);
        var text = A.attack(B);
        expect(text).toBe("战士张三用木剑攻击了普通人李四,李四受到了40点伤害, 李四的剩余生命值60");
    })
    it("测试Log_有盾战士攻击正常人", function(){
        var A = new Hero('张三', 40, 20, {}, {name: "盾", value: 10});
        var B = new game.model.Player('李四', 100, 20 );
        var text = A.attack(B)
        expect(text).toBe("战士张三攻击了普通人李四,李四受到了20点伤害, 李四的剩余生命值80");
    })
    it("测试Log_普通人攻击有盾战士", function(){
        var A = new game.model.Player('张三', 100, 20);
        var B = new Hero('李四', 40, 20, {},{name: "盾", value: 10}) ;
        var text = A.attack(B)
        expect(text).toBe("普通人张三攻击了战士李四,李四受到了10点伤害, 李四的剩余生命值30")
    })
    it("测试Log_普通人攻击有剑战士", function(){
        var A = new game.model.Player('张三', 100, 20);
        var B = new Hero('李四', 40, 20, {name:"木剑", value: 10}) ;
        var text = A.attack(B)
        expect(text).toBe("普通人张三攻击了战士李四,李四受到了20点伤害, 李四的剩余生命值20");
    })
    it("测试Log_普通人攻击有剑有盾的战士", function(){
        var A = new game.model.Player('张三', 100, 20);
        var B = new Hero('李四', 40, 20, {name:"木剑", value: 10}) ;
        var text = A.attack(B);
        expect(text).toBe("普通人张三攻击了战士李四,李四受到了20点伤害, 李四的剩余生命值20")
    })
})