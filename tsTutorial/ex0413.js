let obj = { 
    toString1() { 
        console.log('toString called'); 
        return 'Hello' 
    } 
} 
let foo = {}; 
foo[obj] = 'World'; 
console.log(foo[obj]);
console.log(foo['Hello']); // World
