var addNumber = function(number,callback){
    callback(number);
}

addNumber(10,function(result){
    var sum = 0;
    for(var i = 1 ; i <=result ; i++){
        sum+=i;
    }
});

function add (a,b){
    process.emit("kk",23);
}

function add2(ab){
    console.log(ab);
}

process.on("kk",add2);
setTimeout(add,2000);