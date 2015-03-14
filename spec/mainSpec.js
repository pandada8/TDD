// Add this to your vimrc to add keymap to run the test
// 
//

// include the lib

var game = require('../main.js')
describe("Let's fight, just a test suit for fighting game",function(){
    it("should print a result",function(){
        spyOn(console, 'log');
        var A = {life: 10, name:"A"};
        var B = {life: 0, name:"B"};
        var fight = new game.Fight(A, B);
        fight.showWinner();

        expect(console.log).toHaveBeenCalledWith('A win the game!')

    })
})
