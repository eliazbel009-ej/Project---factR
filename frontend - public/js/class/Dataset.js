export class DataSet{

    constructor(set = []){
        this.dataset = set
    }
    addDAta(data){
        this.dataset.push(data)
        return this;
    }
    getData(){
        return this.dataset
    }

    /**
     * compute the mean of the dataset
     * sum of data set / number of items in dataset
     * @returns the mean of the dataset
     */
    mean(){
        return this.dataset.reduce((total, value) => total + value, 0) / this.dataset.length;
    }
    /**
     * 
     * @returns returns median
     */
    median(){
        const sorted = [...this.dataset].sort((a, b) => a - b);
        const n = sorted.length;

        if (n % 2 !== 0) {
            return sorted[(n - 1) / 2];
        }

        return (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    }
    /**
     * find the mode
     * @returns return the most frequent number
     */
// mode() {
//         const counts = {};
//         let maxFreq = 0;
//         let modes = [];

//         for (let d of this.dataset) {
//             counts[d] = (counts[d] || 0) + 1;
            
//             if (counts[d] > maxFreq) {
//                 maxFreq = counts[d];
//                 modes = [d]; // Reset modes if a higher frequency is found
//             } else if (counts[d] === maxFreq) {
//                 if (!modes.includes(d)) {
//                     modes.push(d); // Add to modes if it ties with the max frequency
//                 }
//             }
//         }
        
//         // Returns an array of modes to handle ties (e.g., [31, 39])
//         return modes; 
//     }
mode() {
    const counts = {};
    let maxFreq = 0;
    let modes = [];

    for (let d of this.dataset) {
        counts[d] = (counts[d] || 0) + 1;

        if (counts[d] > maxFreq) {
            maxFreq = counts[d];
            modes = [d];
        } 
        else if (counts[d] === maxFreq) {
            if (!modes.includes(d)) {
                modes.push(d);
            }
        }
    }

    // If every value occurs only once,
    // there is no mode.
    if (maxFreq === 1) {
        return [];
    }

    return modes;
}
    sum(){
        return this.dataset.reduce((total, value) => total + value, 0)
    }
    
}