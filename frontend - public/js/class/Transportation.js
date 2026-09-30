import { Piecewise , Piece} from "./PieceWise.js";

export class Transportation {
    #vehicle;
    #baseFare;
    #baseDistance;
    #additionalFare;
    #targetDistance;
    #piecewise;

    constructor(vehicle, baseFare, baseDistance, additionalFare, targetDistance) {
        this.#vehicle = vehicle;
        this.#baseFare = baseFare;
        this.#baseDistance = baseDistance;
        this.#additionalFare = additionalFare;
        this.#targetDistance = targetDistance;

        this.#piecewise = new Piecewise();

        this.#createFareRules();
    }

    #createFareRules() {
        this.#piecewise.addPiece(
            new Piece(
                distance => distance <= this.#baseDistance,
                distance => this.#baseFare
            )
        );

        this.#piecewise.addPiece(
            new Piece(
                distance => distance > this.#baseDistance,
                distance =>
                    this.#baseFare +
                    (distance - this.#baseDistance) *
                    this.#additionalFare
            )
        );
    }
    templateQuestion(){
        return  `A ${this.#vehicle} has a base fare of ₱${this.#baseFare} for the first ${this.#baseDistance} kilometers. For every additional kilometer traveled, an additional fare of ₱${this.#additionalFare} is charged. If a passenger travels a total distance of ${this.#targetDistance} kilometers, what is the total fare?
`
    }
    getQuestionAndAnswer(){
        return {
            question : this.templateQuestion(),
            answer: this.calculateFare()

        }
    }
    calculateFare() {
        return this.#piecewise.calculate(this.#targetDistance);
    }

    getBaseFare() {
        return this.#baseFare;
    }

    getBaseDistance() {
        return this.#baseDistance;
    }

    getAdditionalFare() {
        return this.#additionalFare;
    }

    getTargetDistance() {
        return this.#targetDistance;
    }

    getVehicle(){
        return this.#vehicle
    }
    setVehicle(v){
        this.#vehicle= v
    }
    setBaseFare(value) {
        this.#baseFare = value;
        this.#createFareRules();
    }

    setBaseDistance(value) {
        this.#baseDistance = value;
        this.#createFareRules();
    }

    setAdditionalFare(value) {
        this.#additionalFare = value;
        this.#createFareRules();
    }

    setTargetDistance(value) {
        this.#targetDistance = value;
    }
}
