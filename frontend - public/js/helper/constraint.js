export function constraint(c1, c2){
            // check if c1 and c2 have valid value
            if((c1.length === 0 || c1 === null) ||  (c2.length === 0 || c2 === null)){
                return 0;
            }
            if(c1 > c2){
                return 0;
            }
 
            return Math.floor(Math.random() * (Math.floor(c2)-Math.ceil(c1)+1) )+ Math.ceil(c1)
        }