import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';
import {lottie as lBtnsData} from '../2-25/lottie.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.click}`]='click';
events[`transitionend ${data.events.click}`]='trs';

export let Qs1View=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 iTemplate:null,
 rTemplate:null,
 index:0,
 prog:null,
 wait:false,
 step:0,
 dur:0,
 ctr:1,
 initialize:function(opts){
  app=opts.app;
  //data=app.configure({start:dat}).start;

  this.opts=opts;

  this.iTemplate=_.template($(data.view.iTmpl).html());
  this.rTemplate=_.template($(data.view.rTmpl).html());

  this.$(data.view.reveal).html(this.$reveal=$(this.rTemplate({items:data.items})).filter(function(){return this.nodeType!==3;}));
  this.$(data.view.into).html(this.$items=$(this.iTemplate({items:data.items})).filter(function(){return this.nodeType!==3;}));

  this.setLottie();

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  //this.next();//TODO:remove
 },
 setLottie:function(){
  this.$(data.events.click).each(function(i){
   lottie.loadAnimation({
    container:this,
    renderer:'svg',
    loop:true,
    autoplay:true,
    animationData:lBtnsData.btn[i]
   });
  });

  lottie.loadAnimation({
   container:this.$(data.view.rotator)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.rotator
  });

  this.prog=lottie.loadAnimation({
   container:this.$(data.view.prog)[0],
   renderer:'svg',
   loop:false,
   autoplay:false,
   animationData:lData.prog
  });

  this.dur=this.prog.getDuration(true);
  this.step=this.dur/data.items.length;
  this.prog.addEventListener('enterFrame',e=>{
   if(e.currentTime>this.step*this.ctr&&this.dur-this.step*(this.ctr-1)>this.step)
   {
    this.ctr++;
    this.prog.pause();
    this.wait=false;
   }
  });
  this.prog.addEventListener('complete',()=>{
   this.$el.addClass(data.view.remainCls);
  });
 },
 trs:function(e){
  if(e.originalEvent.propertyName===data.view.fakeTrs)
   $(e.currentTarget).removeClass(data.view.errCls+' '+data.view.corrCls);
 },
 toggle:function(f){
  if(f)
  {
   this.index=0;
   this.ctr=1;
   this.wait=false;
   this.prog.goToAndStop(0);
   this.$reveal.removeClass(this.shownCls);
   this.$items.removeClass(this.shownCls).eq(this.index).addClass(this.shownCls);
   this.$el.removeClass(data.view.remainCls);
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 click:function(e){
  let yep=$(e.currentTarget).hasClass(data.view.yepCls);

  if(this.index<data.items.length&&!this.wait)
  {
   app.get('aggregator').trigger('sound','btn');
   if(yep)
   {
    this.wait=true;
    this.$reveal.eq(this.index).addClass(this.shownCls);
    this.prog.play();
   }
   this.$items.eq(this.index).removeClass(this.shownCls);
   this.index++;
   this.$items.eq(this.index).addClass(this.shownCls);
   if(this.index===data.items.length)
   {
    app.get('aggregator').trigger('ls:save',{interactive:'3-17'});
    setTimeout(()=>this.next(),data.before);
   }
  }
 }
});