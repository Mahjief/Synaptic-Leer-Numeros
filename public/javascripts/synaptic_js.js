var array = [];
var paentrenar = [];
function red(){
    var inputlayer=new synaptic.Layer(60);
    var hiddenlayer=new synaptic.Layer(10);
    var outputlayer=new synaptic.Layer(1);

    inputlayer.project(hiddenlayer);
    hiddenlayer.project(outputlayer);
    this.set(
        {input:inputlayer,
        hidden:[hiddenlayer],
        output:outputlayer}
    );
}
red.prototype=new synaptic.Network();
red.prototype.constructor=red;
var rn=new red();

var entrenar=new synaptic.Trainer(rn);
function Entrenar(){
    console.log(paentrenar);
    entrenar.train(
        paentrenar,
    {
        iterations:10000,
        cost:synaptic.Trainer.cost.MSE,
        shuffle:true,
        log:false
    });
}

function marcar(y,x){
    var td = document.getElementById(y + x);
    if(td.style.backgroundColor != "black")td.style.backgroundColor = "black";
    else td.style.backgroundColor = "white";
}

function llenarArray(){
    array = [];
    for(var i = 0;i<10;i++){
        for(var j = 0;j<6;j++){
            var pos = "" + i + j;
            var td = document.getElementById(pos);
            if(td.style.backgroundColor == "black")array.push(1);
            else array.push(0);

        }
    }

    var arriba = 0;
    var bool = false;;

    for(var i = 0;i<10;i++){
        for(var j = 0;j<6;j++){
            var pos = "" + i + j;
            var td = document.getElementById(pos);
            if(td.style.backgroundColor == "black")bool = true;
        }
        if(bool == true)break;
        else arriba++;
    }
    if(arriba > 0){
        for(var i = 0;i<10;i++){
            for(var j = 0;j<6;j++){
                var pos = "" + i + j;
                var td = document.getElementById(pos);
                if(td.style.backgroundColor == "black"){
                    var i2 = i - arriba;
                    array[(i*6) + j] = 0;
                    array[((i2)*6) + j] = 1;
                    td.style.backgroundColor = "white";
                    var pos2 = "" + i2 + j;
                    var td2 = document.getElementById(pos2);
                    td2.style.backgroundColor = "black";
                }
            }
        }
    }


    var derecha = 0;
    bool = false;

    for(var i = 5;i >= 0;i--){
        for(var j = 0;j < 10;j++){
            var pos = "" + j + i;
            var td = document.getElementById(pos);
            if(td.style.backgroundColor == "black")bool = true;
        }
        if(bool == true)break;
        else derecha++;
    }
    if(derecha > 0){
        for(var i = 5;i >= 0;i--){
            for(var j = 0;j < 10;j++){
                var pos = "" + j + i;
                var td = document.getElementById(pos);
                if(td.style.backgroundColor == "black"){
                    var i2 = i + derecha;
                    array[(j*6) + i] = 0;
                    array[(j*6) + i2] = 1;
                    td.style.backgroundColor = "white";
                    var pos2 = "" + j + i2;
                    var td2 = document.getElementById(pos2);
                    td2.style.backgroundColor = "black";
                }
            }
        }
    }


}

function check(){
    llenarArray();
    Entrenar();
    console.log(rn.activate(array));
}

function train(){
    llenarArray();
    //alert(array);
    clear();
    var txt = document.getElementById("numero").value;
    
    paentrenar.push({
        input:array,
        output:[txt/10]
    });
    //test(txt);
}

function clear(){
    for(var i = 0;i<10;i++){
        for(var j = 0;j<6;j++){
            var pos = "" + i + j;
            var td = document.getElementById(pos);
            td.style.backgroundColor = "white";
        }
    }
}