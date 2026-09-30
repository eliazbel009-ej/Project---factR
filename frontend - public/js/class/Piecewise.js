export class Piecewise{
    constructor(pieces = []){
        this.pieces = pieces
    }
    addPiece(piece){
        this.pieces.push(piece)
        return this
    }
    calculate(input){
        const piece = this.pieces.find(piece => piece.evaluate(input))
        if(!piece) throw new Error("no piece")
        return piece.calculate(input)
    }
}

export class Piece{
    constructor(condition,  calculation){
        this.condition = condition;
        this.calculation = calculation;

    }
    evaluate(e){
        return this.condition(e)
    }
    calculate(c){
        return this.calculation(c)
    }
}