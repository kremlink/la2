import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.lClick}`]='lClick';
events[`click ${data.events.rClick}`]='rClick';

export let RingView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 //rTemplate:null,
 angle:0,
 rStep:360/64,
 initialize:function(opts){
  app=opts.app;
  data=app.configure({start:dat}).start;

  this.opts=opts;

  this.$rotator=this.$(data.view.rotator);
  //this.rTemplate=_.template($(data.view.rTmpl).html());

  //this.$(data.view.reveal).html(this.$reveal=$(this.rTemplate({items:data.items})).filter(function(){return this.nodeType!==3;}));

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  lottie.loadAnimation({
   container:this.$(data.view.ringLottie)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.frame
  });
  lottie.loadAnimation({
   container:this.$(data.events.lClick)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.arr
  });
  lottie.loadAnimation({
   container:this.$(data.events.rClick)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.arr
  });


  this.next();//TODO:remove
 },
 toggle:function(f){
  if(f)
  {

  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 lClick:function(){
  this.lrClick(true);
 },
 rClick:function(){
  this.lrClick(false);
 },
 lrClick:function(f){
  if(f)
   this.angle+=this.rStep;else
   this.angle-=this.rStep;
  this.$rotator.css('transform',`rotate(${this.angle}deg)`);
 }
});