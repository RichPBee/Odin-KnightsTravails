/**
 *Squares are representative of vertices in a node, and each contain information about which other nodes they can reach
 */
class Square {
    get moves() { return this._moves; }
    ;
    get x() { return this._start[0]; }
    ;
    get y() { return this._start[1]; }
    ;
    get pos() { return this._start; }
    ;
    get PreviousSquare() { return this._previousSquare; }
    ;
    constructor(start, previousSquare = null) {
        this._start = start;
        this._previousSquare = previousSquare;
    }
    generateMoves() {
        const moves = [];
        for (let i = 0; i < 8; i++) {
            const move = this.createMove(i, this._start);
            if (this.isValid(move)) {
                moves.push(new Square(move, this));
            }
        }
        this._moves = moves;
    }
    createMove(index, start) {
        let move;
        switch (index) {
            case 0:
                move = [start[0] + 1, start[1] + 2];
                break;
            case 1:
                move = [start[0] + 2, start[1] + 1];
                break;
            case 2:
                move = [start[0] + 2, start[1] - 1];
                break;
            case 3:
                move = [start[0] + 1, start[1] - 2];
                break;
            case 4:
                move = [start[0] - 1, start[1] - 2];
                break;
            case 5:
                move = [start[0] - 2, start[1] - 1];
                break;
            case 6:
                move = [start[0] - 2, start[1] + 1];
                break;
            case 7:
                move = [start[0] - 1, start[1] + 2];
                break;
            default:
                move = start;
                break;
        }
        return move;
    }
    isValid(move) {
        if (move[0] > 7 || move[0] < 0) {
            return false;
        }
        ;
        if (move[1] > 7 || move[1] < 0) {
            return false;
        }
        ;
        return true;
    }
}
//Depth-First by each possible position, ends up returning an infinite series and exceeding callstack
// const knightMoves = (startPos: number[], endPos: number[]) => {
//     const startSquare = new Square(startPos);
//     console.log(startSquare.moves);
//     if (startSquare.x == endPos[ 0 ] && startSquare.y === endPos[ 1 ])
//     {
//         return [endPos];
//     }
//     for (let i = 0, n = startSquare.moves.length; i < n; i++)
//     {
//         const move = startSquare.moves[i];
//         return [startSquare.pos].concat(knightMoves(move, endPos));
//     }
// }
const knightMoves = (startPos, endPos) => {
    const start = new Square(startPos);
    const queue = [start];
    start.generateMoves();
    let answer;
    let found = false;
    while (!found) {
        const move = queue[0];
        move.generateMoves();
        move.moves.forEach((move) => {
            if (isEndPos(move.pos, endPos)) {
                found = true;
                answer = new Square(move.pos, queue[0]);
                return;
            }
            else {
                queue.push(move);
            }
        });
        queue.shift();
    }
    const final = resolveAnswer(answer);
    return final.reverse();
};
const isEndPos = (pos, target) => {
    return pos[0] == target[0] && pos[1] == target[1];
};
/**Recursive function used to work back through the sequence from the final point. */
const resolveAnswer = (answer) => {
    if (!answer.PreviousSquare) {
        return [answer.pos];
    }
    return [answer.pos].concat(resolveAnswer(answer.PreviousSquare));
};
console.log(knightMoves([0, 0], [7, 7]));
//# sourceMappingURL=Project.js.map