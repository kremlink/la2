import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';

let app,
    events={},
    data=dat;

events[`click.base ${data.events.click}`]='btnClick';
events[`mouseenter.base ${data.events.click}`]='btnHover';

export let BaseIntView=Backbone.View.extend({
 events:events,
 phase:0,
 data:{},
 lastPhase:0,
 shownCls:data.view.shownCls,
 theProg:{
  $item:null,
  outerWidth:0,
  value:0,
  pulse:false
 },
 initialize:function(opts){
  app=opts.app;

  this.$block=this.$(data.view.block);
  this.lastPhase=this.$block.length-1;

  this.theProg.$prog=this.$(data.view.$prog);
  this.theProg.outerWidth=this.theProg.$prog.parent().width();

  setInterval(()=>{
   if(this.theProg.pulse)
    app.get('aggregator').trigger('sound','pulse');
   if(this.phase===1)
    this.theProg.value=this.theProg.$prog.width()/this.theProg.outerWidth;
  },1000);

  this.toggle(true);
  this.$(data.view.$lottie).each(function(){
   lottie.loadAnimation({
    container:this,
    renderer:'svg',
    loop:true,
    autoplay:true,
    animationData:lData
   });
  });
 },
 setData:function(k,v){
  this.data[k]=v;
 },
 next:function(){
  this.$block.eq(this.phase).removeClass(this.shownCls);
  this.phase++;
  this.$block.eq(this.phase).addClass(this.shownCls);
  if(this.phase===1)
  {
   this.theProg.pulse=true;
   this.theProg.$prog.addClass(this.shownCls);
  }
 },
 btnClick:function(){
  app.get('aggregator').trigger('sound','btn');
  if(this.phase===this.lastPhase)
   this.away();else
   this.next();
 },
 btnHover:function(){
  app.get('aggregator').trigger('sound','btn-h');
 },
 away:function(){
  app.get('aggregator').trigger('interactive:toggle',{show:false,opts:this.data});
  this.toggle(false);
 },
 toggle:function(f){
  if(f)
  {
   this.$block.removeClass(this.shownCls).eq(this.phase).addClass(this.shownCls);
   this.data={};
   this.theProg.$prog.removeClass(this.shownCls).css('transition-duration','0s');
  }else
  {
   this.theProg.pulse=false;
  }

  this.phase=0;
  this.$el.toggleClass(this.shownCls,f);
  app.get('aggregator').trigger(f?'sound':'unsound','bg');
 }
});