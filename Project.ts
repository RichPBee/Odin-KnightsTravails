type Position = [number, number];

class Square
{
    protected _start: number[];
    protected _moves: number[][];
    public get moves() { return this._moves };
    public get x() { return this._start[0] };
    public get y() { return this._start[ 1 ] };
    public get pos() { return this._start };
    constructor(start: number[])
    {
        this._start = start;
        this._moves = this.generateMoves();
    }

    protected generateMoves(): number[][]
    {
        const moves: number[][] = [];
        for (let i = 0; i < 8; i++)
        {
            const move = this.createMove(i, this._start);
            if (this.isValid(move))
            {
                moves.push(move);
            }
        }
        return moves;
    }

    protected createMove(index: number, start: number[]): number[]
    {
        let move: number[];
        switch (index)
        {
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

    protected isValid(move: number[]): boolean
    {
        if (move[0] > 7 || move[0] < 0) { return false };
        if (move[1] > 7 || move[1] < 0) { return false };
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

const knightMoves = (startPos: number[], endPos: number[]) => {
    const start = new Square(startPos);
    const queue = [start.pos];
    while (queue[0][0] != endPos[0] && queue[0][1] != endPos[1])
    {
        const move = start.moves[0];
        return [start.pos].concat(knightMoves(move, endPos));
    }
}

console.log(knightMoves([0,0], [2,1]));

