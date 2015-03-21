// include the lib

var game = require('../main.js')



describe("战斗吧少年！",function(){
    var logger = {
        log:function(info){
            console.log('!!', this)
            this.logs.push(info)
        }
    }
    beforeEach(function(){
        logger.logs = []
    })

    it("返回赢家并打印",function(){
        var A = {life: 10, name:"A"};
        var B = {life: 0, name:"B"};
        var fight = new game.Fight(A, B, logger);
        var winner = fight.Winner();

        expect(winner.name).toBe(A.name)
        fight.logWinner()
        expect(logger.logs.slice(-1)[0]).toBe("A胜利")
    })

    it("当两人属性一致时，先手胜", function(){
        var A = {life: 10, name: "A"};
        A.attack = function(b){
            b.life -= 10;
        }
        var B = {life: 10, name: "B"};
        B.attack = function(a){
            a.life -= 10;
        }
        var fight = new game.Fight(A, B, logger);
        fight.start();
        var winner = fight.Winner();

        expect(winner.name).toBe(A.name)
    })

    it('不同属性的两个人，按照攻击力来判断', function(){
        var A = {life: 10, name: 'A', aggressivity: 5};
        var B = {life: 15, name: "B", aggressivity: 10};
        B.attack = function(o){
            // 简单的减攻击力
            o.life -= this.aggressivity
        }
        A.attack = function(o){
            o.life -= this.aggressivity
        }
        var fight = new game.Fight(A, B, logger);
        fight.start()
        var winner = fight.Winner();

        expect(winner.name).toBe(B.name)

    })

    it('攻击时输出Log', function(){
        var A = {life: 10, name: "A"};
        var B = {life: 10, name: "B"};
        function Attack (obj) {
            obj.life -= 10;
            return this.name +" Attack";
        }
        B.attack = Attack.bind(B)
        A.attack = Attack.bind(A)
        var fight = new game.Fight(A, B, logger);
        fight.start()
        var winner = fight.Winner();

        expect(logger.logs.join('|')).toBe("A Attack|A胜利");
    })

    it("测试Log_两个正常人", function(){
        console.log(game)
        var A = new game.model.Player('张三', 10, 20);
        var B = new game.model.Player('李四', 10, 20);
        var fight = new game.Fight(A, B, logger);
        fight.start()
        expect(logger.logs.join('|')).toBe("普通人张三攻击了普通人李四,李四受到了20点伤害, 李四的剩余生命值-10|张三胜利")
    })

    it("测试Log_有武器战士攻击正常人", function(){
        var A = new game.model.Hero('张三', 40, 20, {name:'木剑', value:20}, {});
        var B = new game.model.Player('李四', 100, 20);
        var fight = new game.Fight(A, B, logger);
        fight.start()
        expect(logger.logs.join('|')).toBe("战士张三用木剑攻击了普通人李四,李四受到了40点伤害, 李四的剩余生命值60|普通人李四攻击了战士张三,张三受到了20点伤害, 张三的剩余生命值20|战士张三用木剑攻击了普通人李四,李四受到了40点伤害, 李四的剩余生命值20|普通人李四攻击了战士张三,张三受到了20点伤害, 张三的剩余生命值0|李四胜利")
    })
    it("测试Log_有盾战士攻击正常人", function(){
        var A = new game.model.Hero('张三', 40, 20, {}, {name: "盾", value: 10});
        var B = new game.model.Player('李四', 100, 20 );
        var fight = new game.Fight(A, B, logger);
        fight.start()
        expect(logger.logs.join('|')).toBe("战士张三攻击了普通人李四,李四受到了20点伤害, 李四的剩余生命值80|普通人李四攻击了战士张三,张三受到了10点伤害, 张三的剩余生命值30|战士张三攻击了普通人李四,李四受到了20点伤害, 李四的剩余生命值60|普通人李四攻击了战士张三,张三受到了10点伤害, 张三的剩余生命值20|战士张三攻击了普通人李四,李四受到了20点伤害, 李四的剩余生命值40|普通人李四攻击了战士张三,张三受到了10点伤害, 张三的剩余生命值10|战士张三攻击了普通人李四,李四受到了20点伤害, 李四的剩余生命值20|普通人李四攻击了战士张三,张三受到了10点伤害, 张三的剩余生命值0|李四胜利");
    })
    it("测试Log_普通人攻击有盾战士", function(){
        var A = new game.model.Hero('张三', 40, 20, {name:'木剑', value:20}, {});
        var B = new game.model.Player('李四', 100, 20, {}, {name:"XXX", value:10});
        var fight = new game.Fight(A, B, logger);
        fight.start()
        expect(logger.logs.join('|')).toBe("战士张三用木剑攻击了普通人李四,李四受到了40点伤害, 李四的剩余生命值60|普通人李四攻击了战士张三,张三受到了20点伤害, 张三的剩余生命值20|战士张三用木剑攻击了普通人李四,李四受到了40点伤害, 李四的剩余生命值20|普通人李四攻击了战士张三,张三受到了20点伤害, 张三的剩余生命值0|李四胜利")
    })
    it("测试Log_使用装备", function(){
        var A = new game.model.Hero('张三', 40, 20, {name:'木剑', value:20}, {});
        var B = new game.model.Player('李四', 100, 20, {}, {name:"XXX", value:10});
        var fight = new game.Fight(A, B, logger);
        fight.start()
        expect(logger.logs.join('|')).toBe("战士张三用木剑攻击了普通人李四,李四受到了40点伤害, 李四的剩余生命值60|普通人李四攻击了战士张三,张三受到了20点伤害, 张三的剩余生命值20|战士张三用木剑攻击了普通人李四,李四受到了40点伤害, 李四的剩余生命值20|普通人李四攻击了战士张三,张三受到了20点伤害, 张三的剩余生命值0|李四胜利")
    })
    it("测试Log_使用装备", function(){
        var A = new game.model.Hero('张三', 40, 20, {name:'木剑', value:20}, {});
        var B = new game.model.Player('李四', 100, 20, {}, {name:"XXX", value:10});
        var fight = new game.Fight(A, B, logger);
        fight.start()
        expect(logger.logs.join('|')).toBe("战士张三用木剑攻击了普通人李四,李四受到了40点伤害, 李四的剩余生命值60|普通人李四攻击了战士张三,张三受到了20点伤害, 张三的剩余生命值20|战士张三用木剑攻击了普通人李四,李四受到了40点伤害, 李四的剩余生命值20|普通人李四攻击了战士张三,张三受到了20点伤害, 张三的剩余生命值0|李四胜利")
    })
})
