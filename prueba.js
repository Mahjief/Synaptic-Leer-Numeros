var synaptic = require('synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron;

function red(){
    var inputlayer=new synaptic.Layer(2);
    var hiddenlayer=new synaptic.Layer(3);
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
entrenar.train([
    {
        input:[1,1],
        output:[0]
    },{
        input:[1,0],
        output:[1]
    },{
        input:[0,1],
        output:[1]
    },{
        input:[0,0],
        output:[0]
    }
],{
    iterations:100000,
    cost:synaptic.Trainer.cost.MSE,
    shuffle:true,
    log:false
});

console.log(rn.activate([1,1]));
console.log(rn.activate([0,1]));
console.log(rn.activate([1,0]));
console.log(rn.activate([0,0]));

console.log("Hola");