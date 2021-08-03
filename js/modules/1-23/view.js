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
  app=opts.app;
  data=app.configure({start:dat}).start;

  this.opts=opts;

  this.$prog=this.$(data.view.$prog);

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

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
 toggle:function(f){
  if(f)
  {
   this.stop=false;
   this.$prog.addClass(this.shownCls).on('transitionend',()=>{
    this.$el.addClass(data.view.vanishCls);
   });
  }else{
   this.$el.removeClass(data.view.vanishCls);
   this.$prog.removeClass(this.shownCls).off('transitionend');
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 click:function(e){
  let index=$(e.currentTarget).index();

  if(index===data.vanish)
   this.setData('time',this.opts.data.data.alt);
  app.get('aggregator').trigger('ls:save',{interactive:'1-23',value:index});
  app.get('aggregator').trigger('main:achieve','Ачивка: прошел развилку');
  this.away();
 }
});