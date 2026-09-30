export class Transportation {
    constructor(baseDistance, baseFare, targetDistance, additionalFarePerKm, vehicle) {
        this.baseDistance = baseDistance;
        this.baseFare = baseFare;
        this.targetDistance = targetDistance;
        this.additionalFarePerKm = additionalFarePerKm;
        this.vehicle = vehicle;
    }

    calculateTotalFare(){
        if (this.targetDistance <= this.baseDistance) {
        return this.baseFare;
    }
        let totalFare = this.baseFare;
        for(let i = 0; i < this.targetDistance - this.baseDistance; i++){
            totalFare +=this.additionalFarePerKm
        }
        return totalFare
    }

    get baseDistance() {
        return this._baseDistance;
    }

    set baseDistance(value) {
        this._baseDistance = value;
    }

    get baseFare() {
        return this._baseFare;
    }

    set baseFare(value) {
        this._baseFare = value;
    }

    get targetDistance() {
        return this._targetDistance;
    }

    set targetDistance(value) {
        this._targetDistance = value;
    }

    get additionalFarePerKm() {
        return this._additionalFarePerKm;
    }

    set additionalFarePerKm(value) {
        this._additionalFarePerKm = value;
    }

    get vehicle() {
        return this._vehicle;
    }

    set vehicle(value) {
        this._vehicle = value;
    }
}