import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.click}`]='click';
events[`transitionend ${data.events.click}`]='trs';

export let QsView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 iTemplate:_.template($(data.view.iTmpl).html()),
 rTemplate:_.template($(data.view.rTmpl).html()),
 index:0,
 initialize:function(opts){
  app=opts.app;
  data=app.configure({start:dat}).start;

  this.opts=opts;

  this.$(data.view.reveal).html(this.$reveal=$(this.rTemplate({items:data.items})).filter(function(){return this.nodeType!==3;}));
  this.$(data.view.into).html(this.$items=$(this.iTemplate({items:data.items})).filter(function(){return this.nodeType!==3;}));

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  this.$(data.events.click).each(function(){
   lottie.loadAnimation({
    container:this,
    renderer:'svg',
    loop:true,
    autoplay:true,
    animationData:lData.btn
   });
  });

  lottie.loadAnimation({
   container:this.$(data.view.map)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.map
  });


  this.next();//TODO:remove
 },
 trs:function(e){
  if(e.originalEvent.propertyName===data.view.fakeTrs)
   $(e.currentTarget).removeClass(data.view.errCls);
 },
 toggle:function(f){
  if(f)
  {
   this.index=0;
   this.$reveal.removeClass(this.shownCls);
   this.$items.removeClass(this.shownCls).eq(this.index).addClass(this.shownCls);
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 click:function(e){
  let curr=$(e.currentTarget);
  
  if(this.index<data.items.length-1&&(curr.hasClass(data.view.yepCls)&&data.items[this.index].yep||!curr.hasClass(data.view.yepCls)&&!data.items[this.index].yep))
  {
   if('index' in data.items[this.index])
    this.$reveal.eq(data.items[this.index].index).addClass(this.shownCls);
   this.$items.eq(this.index).removeClass(this.shownCls);
   this.index++;
   this.$items.eq(this.index).addClass(this.shownCls);
   if(this.index===data.items.length-1)
    setTimeout(()=>this.next(),data.before);
  }else
  {
   curr.addClass(data.view.errCls);
  }
 }
});