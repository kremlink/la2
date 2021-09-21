import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.click}`]='click';

export let LoopView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 value:0,
 outerWidth:null,
 l:null,
 initialize:function(opts){
  app=opts.app;
  //data=app.configure({start:dat}).start;

  this.opts=opts;

  this.$prog=this.$(data.view.$prog).on('transitionend',()=>{if(this.phase===1)this.away();});
  this.outerWidth=this.$prog.parent().width();
  this.$btn=this.$(data.events.click);

  this.setLottie();

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);
  
  setInterval(()=>{
   if(this.phase===1)
    this.value=this.$prog.width()/this.outerWidth;
  },1000);
 },
 setLottie:function(){
  this.l=lottie.loadAnimation({
   container:this.$(data.view.$lottie)[0],
   renderer:'svg',
   loop:true,
   autoplay:false,
   animationData:lData
  });
  this.l.addEventListener('enterFrame',e=>{
   this.$btn.toggleClass(this.shownCls,e.currentTime>data.show.start&&e.currentTime<data.show.end);
  });
 },
 next:function(){
  BaseIntView.prototype.next.apply(this,arguments);
  if(this.phase===1)
  {
   this.l.play();
   setTimeout(()=>{this.$prog.addClass(this.shownCls);},data.before);
  }
 },
 toggle:function(f){
  if(f)
  {
   this.$prog.removeClass(this.shownCls);
   this.$btn.removeClass(this.shownCls);
   this.value=0;
  }

  this.l.pause();

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 click:function(){
  app.get('aggregator').trigger('sound','btn');
  app.get('aggregator').trigger('ls:save',{interactive:'3-15-1',value:this.value});
  //if(this.value>data.thr)
   //app.get('aggregator').trigger('main:achieve','Ачивка: успел');
  this.away();
 }
});