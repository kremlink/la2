import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';

let app,
    data=dat,
    events={};

const alfLen=32,
      now=new Date(),
      month=now.getMonth()+1;

events[`mousedown ${data.events.ringLArr}`]='ringLClick';
events[`touchstart ${data.events.ringLArr}`]='ringLClick';
events[`mousedown ${data.events.ringRArr}`]='ringRClick';
events[`touchstart ${data.events.ringRArr}`]='ringRClick';
events[`mouseup ${data.events.ringLArr}`]='ringLUp';
events[`touchend ${data.events.ringLArr}`]='ringLUp';
events[`mouseup ${data.events.ringRArr}`]='ringRUp';
events[`touchend ${data.events.ringRArr}`]='ringRUp';
events[`click ${data.events.dateTArr}`]='dateTClick';
events[`click ${data.events.dateBArr}`]='dateBClick';

export let RingView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 //rTemplate:null,
 angle:0,
 angleInd:0,
 rStep:360/alfLen/2,
 textArr:[],
 ringGo:null,
 won:false,
 ringInt:null,
 digiActive:0,
 digiCurr:0,
 date:[...now.getDate().toString(),...Array.from((month>9?'':'0')+month.toString()),...now.getFullYear().toString()].map((o)=>+o),
 initialize:function(opts){
  app=opts.app;
  data=app.configure({start:dat}).start;
  
  this.opts=opts;

  this.$rotator=this.$(data.view.rotator);
  this.$text=this.$(data.view.text);
  this.clrText();

  this.$digits=this.$(data.view.digits);

  //this.rTemplate=_.template($(data.view.rTmpl).html());

  //this.$(data.view.reveal).html(this.$reveal=$(this.rTemplate({items:data.items})).filter(function(){return this.nodeType!==3;}));

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  this.setAnim();

  this.setLastPhase(4);

  $(document).on('mouseup.ring touchend.ring',()=>this.ringLRUp());

  this.ringGo=_.throttle((f)=>{
   if(!this.won)
   {
    this.angle=this.angle+f*this.rStep;
    this.angleInd=Math.round(this.angle/this.rStep)%alfLen;
    if(this.angleInd===data.ringWin||this.angleInd===alfLen+data.ringWin)
    {
     this.won=true;
     setTimeout(()=>this.next(),data.before);
    }
    this.setText(f+1);
    this.$rotator.css('transform',`rotate(${this.angle}deg)`);
   }
  },data.ringInt,{leading:true,trailing:false});

  this.setIniDigit();

  this.next();//TODO:remove
  this.next();//TODO:remove
 },
 ringLRDown:function(f){
  if(!this.ringInt)
   this.ringInt=setInterval(()=>this.ringGo(f),data.ringInt);
 },
 ringLRUp:function(f,onArrow){
  if(onArrow)
   this.ringGo(f);
  if(this.ringInt)
  {
   clearInterval(this.ringInt);
   this.ringInt=null;
  }
 },
 ringLUp:function(){
  this.ringLRUp(1,true);
 },
 ringRUp:function(){
  this.ringLRUp(-1,true);
 },
 ringLClick:function(){
  this.ringLRDown(1);
 },
 ringRClick:function(){
  this.ringLRDown(-1);
 },
 setAnim:function(){
  lottie.loadAnimation({
   container:this.$(data.view.ringLottie)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.frame
  });
  lottie.loadAnimation({
   container:this.$(data.events.ringLArr)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.arr
  });
  lottie.loadAnimation({
   container:this.$(data.events.ringRArr)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.arr
  });
  lottie.loadAnimation({
   container:this.$(data.view.nLottie)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.number
  });
  lottie.loadAnimation({
   container:this.$(data.events.dateTArr)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.arr
  });
  lottie.loadAnimation({
   container:this.$(data.events.dateBArr)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.arr
  });
 },
 dateTClick:function(){
  this.$digits.eq(this.digiActive).html(this.digiCurr<9?++this.digiCurr:this.digiCurr);
  this.nextDigit();
 },
 dateBClick:function(){
  this.$digits.eq(this.digiActive).html(this.digiCurr>0?--this.digiCurr:this.digiCurr);
  this.nextDigit();
 },
 nextDigit:function(){
  if(this.date[this.digiActive]===this.digiCurr)
  {
   this.$digits.eq(this.digiActive).removeClass(this.shownCls);
   if(this.digiActive<this.date.length-1)
   {
    this.digiActive++;
    this.setIniDigit();
   }else
   {

    setTimeout(()=>this.next(),data.before)
   }
  }
 },
 clrText:function(){
  this.textArr=[];
  this.$text.each((i,o)=>{
   this.textArr.push(Array.from(data.textData[i]));
   o.innerHTML=data.textData[i];
  });
 },
 toggle:function(f){
  if(f)
  {
   this.clrText();
   this.angle=0;
   this.angleInd=0;
   this.won=false;
   this.digiActive=0;
   this.$rotator.css('transform',`rotate(${this.angle}deg)`);
   this.$digits.html('').removeClass(this.shownCls);
   this.setIniDigit();
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 setIniDigit:function(){
  let f;

  this.digiCurr=data.iniDigit;
  f=this.date[this.digiActive]===this.digiCurr;
  this.$digits.eq(this.digiActive).html(f?data.ifSameDigit:this.digiCurr).addClass(this.shownCls);
  if(f)
   this.digiCurr=data.ifSameDigit;
 },
 setText:function(f){
  this.textArr.forEach((o,i)=>{
   o.map((o1,i1,ar)=>{
    let code=o1.charCodeAt(0);

    if(f)
     code=code===1040?1071:--code;else
     code=code===1071?1040:++code;

    ar[i1]=String.fromCharCode(code);
   });

   this.$text.eq(i).html(o.join(''));
  });
 }
});