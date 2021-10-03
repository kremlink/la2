import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.click}`]='click';

export let ForkView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 initialize:function(opts){
  let self=this;

  app=opts.app;
  //data=app.configure({start:dat}).start;

  this.opts=opts;

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data,
   progDur:data.progDur
  }]);

  this.$(data.view.$lottie).each(function(i){
   lottie.loadAnimation({
    container:this,
    renderer:'svg',
    loop:true,
    autoplay:true,
    animationData:!self.opts.data.data.diff?lData.btn:lData.btns[i]
   });
  });
 },
 next:function(){
  BaseIntView.prototype.next.apply(this,arguments);
  if(this.phase===1)
  {
   this.theProg.$prog.css('transition-duration',data.progDur+'s');
   setTimeout(()=>{
    this.$el.addClass(data.view.vanishCls);
   },data.before);
  }
 },
 toggle:function(f){
  if(f)
  {
   this.$el.removeClass(data.view.vanishCls);
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 click:function(e){
  let curr=$(e.currentTarget);

  app.get('aggregator').trigger('sound','btn');
  if(curr.hasClass(data.view.altCls))
   this.setData('time',this.opts.data.data.alt);
  app.get('aggregator').trigger('ls:save',{interactive:'1-23',value:curr.index()});
  this.away();
 }
});