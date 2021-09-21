import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.click}`]='click';

export let TabletsView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 value:0,
 outerWidth:null,
 initialize:function(opts){
  app=opts.app;
  //data=app.configure({start:dat}).start;

  this.opts=opts;

  this.$prog=this.$(data.view.$prog);
  this.outerWidth=this.$prog.parent().width();

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  setInterval(()=>{
   if(this.phase===1)
    this.value=this.$prog.width()/this.outerWidth;
  },1000);

  this.$(data.view.$lottie).each(function(i){
   lottie.loadAnimation({
    container:this,
    renderer:'svg',
    loop:true,
    autoplay:true,
    animationData:lData.btns[i]
   });
  });
 },
 next:function(){
  BaseIntView.prototype.next.apply(this,arguments);
  if(this.phase===1)
  {
   setTimeout(()=>{
    this.$prog.addClass(this.shownCls);
   },data.before);
  }
 },
 toggle:function(f){
  if(f)
  {
   this.$el.removeClass(data.view.vanishCls);
   this.$prog.removeClass(this.shownCls);
   this.value=0;
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 click:function(e){
  let curr=$(e.currentTarget);

  app.get('aggregator').trigger('sound','btn');
  if(!curr.hasClass(data.view.altCls))
  {
   this.$el.addClass(data.view.vanishCls);
  }else
  {
   app.get('aggregator').trigger('ls:save',{interactive:'4-4',value:this.value});
   this.away();
  }
 }
});