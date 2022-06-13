var UltimateTicTacToe = require('./uttt.js')

module.exports = class Room {
    constructor(roomId, creator){
        this.roomId = roomId;
        this.users = [creator];
        this.players = [null, null];
        this.game = null;
        this.roomEmpty = false;
    }

    startGame(userId) {
        let players = this.players;
        if (players[0] !== null && players[1] !== null && (userId === players[0] || userId === players[1])) {
            this.game = new UltimateTicTacToe();
            return true;
        }
        return false;
    }

    makeMove(userId, bb, sb) {
        if (this.game !== null) {
            let players = this.players;
            let turn = this.game.turn;
            if (players[0] !== null && players[1] !== null) {
                if (userId === players[turn-1]) {
                    return this.game.makeMove(bb, sb);
                }
            }
        }
        return false;  
    }

    joinRoom(userId) {
        this.users.push(userId);
    }

    leaveRoom(userId) {
        if (this.players[0] == userId) {
            this.players[0] = null;
        } else if (this.players[1] == userId) {
            this.players[1] = null;
        }

        this.users = this.users.filter((id) => userId !== id);
        if (this.users.length == 0) {
            //0 means that everybody left the room and it should be removed
            return 0;
        }

        if (this.players[0] === null || this.players[1] === null) {
            //1 means that player left the room and new player should be picked
            return 1;
        }

        //2 means that normal observer left the room
        return 2;
    }

    pickSide(userId, side) {
        if (this.players[side-1] === null) {
            this.players[side-1] = userId;
            return true;
        } else if (this.players[side-1] === userId) {
            this.players[side-1] = null;
            return true;
        }
        return false;
    }
}