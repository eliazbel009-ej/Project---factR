
const $debugDisplay = document.getElementById("debug")

const cases= {

  "transportation": [
    {
      "vehicle": "Traditional Jeepney",
      "baseDistance": 4,
      "baseFare": 13,
      "additionalFarePerKm": 2.00
    },
    {
      "vehicle": "Modern Jeepney",
      "baseDistance": 4,
      "baseFare": 15,
      "additionalFarePerKm": 2.50
    },
    {
      "vehicle": "Bus",
      "baseDistance": 5,
      "baseFare": 15,
      "additionalFarePerKm": 2.50
    },
    {
      "vehicle": "Air-conditioned Bus",
      "baseDistance": 5,
      "baseFare": 18,
      "additionalFarePerKm": 3.00
    },
    {
      "vehicle": "Taxi",
      "baseDistance": 1,
      "baseFare": 50,
      "additionalFarePerKm": 13.50
    },
    {
      "vehicle": "UV Express",
      "baseDistance": 4,
      "baseFare": 20,
      "additionalFarePerKm": 2.50
    },
    {
      "vehicle": "Tricycle",
      "baseDistance": 1,
      "baseFare": 20,
      "additionalFarePerKm": 5.00
    },
    {
      "vehicle": "Motorcycle Taxi",
      "baseDistance": 2,
      "baseFare": 50,
      "additionalFarePerKm": 10.00
    }
  ]
}
class Session{
    constructor(){
        
        this._templateQuestion = new TemplateQuestion(); // create the template question to use
        this._expectedAnswer;
    }
}
function createTransportation(){
    let transportation = [];
    const _T = fetch("")
    console.log(_T)
    
}
$debugDisplay.innerHTML = "d"
createTransportation()
class TemplateQuestion{
    constructor(){}
    // set valuesOfQuestion(){

    // }
}
class PieceWise{
    constructor(){
        this.piece = []
    }
    
    
}
// sub function
class Piece{
    constructor(func){
        this.func = func
    }
}
/**
 * requirements
 *  display a practical context whre peacewise function is used
 * example: a bus has  a base fare of 15 Pesos, And a limit of 2km before adding an additional fare
 * Use the rule 2x + 1 when the input x is less than 0.Use the constant rule 3 when the input x is greater than or equal to 0.
 * randomised the target value 
 * and return the answer to the user
 * 
 * 
 * constant:
 *      name: of a vehicle or a bill, 
 *      baseFare: the base fare of a service 
 *      baseUnit/baseLimit/baseDistance: this are the bounderies if this boundiry is crossed then use aother method or calculation
 * 
 *      
 */