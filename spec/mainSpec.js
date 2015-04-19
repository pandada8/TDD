// include the lib

var game = require('../src/main.js')

describe("战斗吧少年！",function(){
    var logger = {
        log:function(info){
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

})
