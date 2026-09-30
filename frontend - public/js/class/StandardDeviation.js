export class StandardDeviation{
    constructor(dataset){
        this.dataset = dataset;  
    }
    sumOfSquare(){
        const mean = this.dataset.mean()
        return this.dataset.getData().reduce((total, value) => total + (value - mean)**2, 0)
    }
    populationVariance(){
        return this.sumOfSquare()/this.dataset.getData().length
    }
    range(){
        return Math.max(...this.dataset.getData()) - Math.min(...this.dataset.getData())
    }
    population(){ 
          return Math.sqrt(this.populationVariance())
    }
    sampleVariance(){
        return this.sumOfSquare()/(this.dataset.getData().length-1)
    }
    sample(){
        return Math.sqrt(this.sampleVariance())
    }
}