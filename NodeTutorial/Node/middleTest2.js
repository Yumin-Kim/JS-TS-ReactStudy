var addNumber = function(number,callback){
    var sum = 0;
    
    for(var i= 0; i<10; i++){
       if(i%2 == 0){
        sum += i;
        //홀수만더하는거 연습 ㄱㄱ
        console.log(sum);
        //break(연습)
       }
    }
    callback(sum);
}

addNumber(10,function(result){
    
    console.log(result);
})