function go(c,d,a,e) {a===undefined&&(a=200);var f=Math.max(Math.abs(c),Math.abs(d)),b=f*1e3/a;motorA.moveTo(c,b),motorB.moveTo(d,b,function(){motorA.stop(!0),motorB.stop(!0),motorA.setHome(),motorB.setHome(),e&&e()})}
function StepperMotor(a) {this.pins=a.pins,this.pattern=a.pattern||[1,2,4,8],this.offpattern=a.offpattern||0,this.pos=0,this.stepsPerSec=a.stepsPerSec||100,this.onstep=a.onstep||0}
StepperMotor.prototype.setHome = function () {this.pos=0};
StepperMotor.prototype.getPosition = function () {return this.pos};
StepperMotor.prototype.stop = function (a) {this.interval&&(clearInterval(this.interval),this.interval=void 0),a&&digitalWrite(this.pins,this.offpattern)};
StepperMotor.prototype.moveTo = function (b,c,d,f) {if(b|=0,void 0===c&&(c=1e3*Math.abs(b-this.pos)/this.stepsPerSec),this.stop(f),b!=this.pos){var a=this,e=function(){a.pos==b?(a.stop(f),d&&d()):(a.pos+=b<a.pos?-1:1,digitalWrite(a.pins,a.pattern[a.pos&a.pattern.length-1])),a.onstep&&a.onstep(a.pos)};this.interval=setInterval(e,c/Math.abs(b-this.pos)),e()}else d&&setTimeout(d,c)};
var motorA = Object.create(ÿ.modules.StepperMotor["prototype"]);
motorA.pins = [ D3, D31, D30, D29 ];
motorA.pattern = [ 1, 2, 4, 8 ];
motorA.offpattern = 0;
motorA.pos = 0;
motorA.stepsPerSec = 100;
motorA.onstep = 0;
motorA.interval = undefined;
var motorB = Object.create(ÿ.modules.StepperMotor["prototype"]);
motorB.pins = [ D22, D20, D19, D18 ];
motorB.pattern = [ 1, 2, 4, 8 ];
motorB.offpattern = 0;
motorB.pos = 0;
motorB.stepsPerSec = 100;
motorB.onstep = 0;
motorB.interval = undefined;
digitalWrite(D3, 0);
digitalWrite(D18, 0);
digitalWrite(D19, 0);
digitalWrite(D20, 0);
digitalWrite(D22, 0);
digitalWrite(D29, 0);
digitalWrite(D30, 0);
digitalWrite(D31, 0);