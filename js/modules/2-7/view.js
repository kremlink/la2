import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';
import {lottie as lArrData} from '../baseInteractive/lottie.js';

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
events[`transitionend ${data.view.$prog}`]='progEnd';
events[`mouseenter ${data.events.td}`]='tdOver';
events[`mouseleave ${data.events.td}`]='tdOut';
events[`click ${data.events.td}`]='tdClick';

export let RingView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 tableTemplate:null,
 angle:0,
 angleInd:0,
 rStep:360/alfLen/2,
 textArr:[],
 ringGo:null,
 won:false,
 ringInt:null,
 digiActive:0,
 digiCurr:0,
 timeIsUp:false,
 date:[...Array.from((month+1>9?'':'0')+now.getDate().toString()),...Array.from((month>9?'':'0')+month.toString()),...now.getFullYear().toString()].map((o)=>+o),
 initialize:function(opts){
  let self=this;

  app=opts.app;
  //data=app.configure({start:dat}).start;
  
  this.opts=opts;

  this.$rotator=this.$(data.view.rotator);
  this.$text=this.$(data.view.text);
  this.clrText();

  this.$digits=this.$(data.view.digits);
  this.$topDigits=this.$(data.view.topDigits).each(function(i){this.innerHTML=self.date[i];});
  this.$botDigits=this.$(data.view.botDigits);

  this.$prog=this.$(data.view.$prog);

  this.tableTemplate=_.template($(data.view.table.tmpl).html());
  this.$(data.view.table.item).html(this.$reveal=$(this.tableTemplate(data.table)).filter(function(){return this.nodeType!==3;}));
  this.$tds=this.$(data.events.td);

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  this.setAnim();

  //this.setLastPhase(6);

  this.ringIni();

  this.setIniDigit();

  /*this.next();//TODO:remove
  this.next();//TODO:remove
  this.next();//TODO:remove
  this.next();//TODO:remove
  this.next();//TODO:remove*/
 },
 ringIni:function(){
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
 },
 progEnd:function(){
  this.timeIsUp=true;
 },
 ringLRDown:function(f){
  app.get('aggregator').trigger('sound','btn');
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
  this.$(`${data.events.ringLArr},${data.events.ringRArr},${data.events.dateTArr},${data.events.dateBArr}`)
   .each(function(){
   lottie.loadAnimation({
    container:this,
    renderer:'svg',
    loop:true,
    autoplay:true,
    animationData:lArrData
   });
  });
  this.$(data.view.nLottie).each(function(){
   lottie.loadAnimation({
    container:this,
    renderer:'svg',
    loop:true,
    autoplay:true,
    animationData:lData.number
   });
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
 tdOver:function(e){
  let ind=$(e.currentTarget).index();

  this.$tds.removeClass(this.shownCls);
  this.$tds.filter((i,o)=>$(o).index()===ind).addClass(this.shownCls);
 },
 tdOut:function(){
  this.$tds.removeClass(this.shownCls);
 },
 tdClick:function(e){
  let curr=$(e.currentTarget),
      ind=this.$tds.index(curr),
      row=Math.floor(ind/10),
      col=ind-row*10;

  if(row===this.date[this.digiActive*2]&&col===this.date[this.digiActive*2+1]&&this.digiActive<4)
  {
   app.get('aggregator').trigger('sound','yes');
   this.$botDigits.eq(this.digiActive).removeClass(this.shownCls).text(parseInt(curr.text()));
   this.$topDigits.eq(this.digiActive*2).removeClass(this.shownCls);
   this.digiActive++;
   if(this.digiActive<4)
   {
    this.$botDigits.eq(this.digiActive).addClass(this.shownCls);
    this.$topDigits.eq(this.digiActive*2).addClass(this.shownCls);
   }else
   {
    this.$topDigits.removeClass(this.shownCls);
    this.$botDigits.removeClass(this.shownCls);
    app.get('aggregator').trigger('ls:save',{interactive:'2-7',value:this.timeIsUp});
    setTimeout(()=>this.next(),data.before);
   }
  }else
  {
   app.get('aggregator').trigger('sound','no');
  }
 },
 nextDigit:function(){
  app.get('aggregator').trigger('sound','btn');
  if(this.date[this.digiActive]===this.digiCurr)
  {
   this.$digits.eq(this.digiActive).removeClass(this.shownCls);
   if(this.digiActive<this.date.length-1)
   {
    this.digiActive++;
    this.setIniDigit();
   }else
   {
    this.digiActive=0;
    setTimeout(()=>this.next(),data.before);
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
   this.$prog.removeClass(this.shownCls);
   this.timeIsUp=false;
   this.$botDigits.removeClass(this.shownCls).eq(0).addClass(this.shownCls);
   this.$topDigits.removeClass(this.shownCls).eq(0).addClass(this.shownCls);
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 next:function(){
  BaseIntView.prototype.next.apply(this,arguments);
  if(this.phase===1)
  {
   setTimeout(()=>{
    this.$prog.addClass(this.shownCls);
   },data.progWait);
  }
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