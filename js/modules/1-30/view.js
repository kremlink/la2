import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
import {lottie as lData} from '../1-25/lottie.js';
import {utils} from '../../bf/lib/utils.js';

let app,
    data=dat,
    events={},
    pc;

events[`mouseenter ${data.events.l}`]='lHover';
events[`mouseenter ${data.events.r}`]='rHover';
events[`mouseleave ${data.events.l}`]='leave';
events[`mouseleave ${data.events.r}`]='leave';
events[`click ${data.events.l}`]='lClick';
events[`click ${data.events.r}`]='rClick';

export let TeamView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 iTemplate:_.template($(data.view.item.tmpl).html()),
 ctrTemplate:_.template(data.view.ctrTmpl),
 el:data.view.el,
 waiting:false,
 index:0,
 iLength:null,
 initialize:function(opts){
  app=opts.app;
  data=app.configure({start:dat}).start;

  pc=app.get('pc');

  this.opts=opts;

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  this.setLottie();

  this.$items=$(this.iTemplate({items:data.items})).filter(function(){
   return this.nodeType!==3;
  });

  this.$iCont=this.$(data.view.item.cont).prepend(this.$items);

  this.$items.on('transitionend',(e)=>{
   this.anim(e);
  });

  this.$ctr=this.$(data.view.$ctr);

  this.iLength=this.$items.length;

  this.setCtr(0);
  
  this.iniSwipe();

  this.next();//TODO:remove
 },
 iniSwipe:function(){
  new utils.swipe({
   mult:2,
   speed:1,
   container:this.$iCont,
   callback:(delta)=>{
    if(delta>0)
     this.lClick();else
     this.rClick();
   }
  });
 },
 anim:function(e){
  if(e.originalEvent.propertyName===data.view.item.fakeTrs)
  {
   if(this.index!==this.iLength-1)
   {
    this.$items.eq(this.index).removeClass(this.shownCls+' '+data.view.item.putLCls+' '+data.view.item.putRCls);
    this.waiting=false;
    this.$items.eq(++this.index).addClass(this.shownCls);
    this.setCtr(this.index);
   }else
   {
    this.$items.eq(this.index).removeClass(this.shownCls+' '+data.view.item.putLCls+' '+data.view.item.putRCls);
    this.setCtr(this.index+1);
    setTimeout(()=>{this.next();},data.wait);
   }
  }
 },
 setLottie:function(){
  lottie.loadAnimation({
   container:this.$(data.view.lottie.no)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.no
  });
  lottie.loadAnimation({
   container:this.$(data.view.lottie.yes)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.yes
  });
 },
 setCtr:function(i){
  this.$ctr.text(this.ctrTemplate({curr:i,amt:this.iLength}));
 },
 lHover:function(){
  if(pc)
   this.$el.addClass(data.view.item.lCls);
 },
 rHover:function(){
  if(pc)
   this.$el.addClass(data.view.item.rCls);
 },
 leave:function(){
  if(pc)
   this.$el.removeClass(data.view.item.lCls+' '+data.view.item.rCls);
 },
 lClick:function(){
  if(!this.waiting)
  {
   if(!data.items[this.index])
   {
    this.$items.eq(this.index).addClass(data.view.item.putLCls);
    this.waiting=true;
    app.get('aggregator').trigger('sound','btn');
   }else
   {
    app.get('aggregator').trigger('sound','btn');
   }
  }
 },
 rClick:function(){
  if(!this.waiting)
  {
   if(data.items[this.index])
   {
    this.$items.eq(this.index).addClass(data.view.item.putRCls);
    this.waiting=true;
    app.get('aggregator').trigger('sound','btn');
   }else
   {
    app.get('aggregator').trigger('sound','btn');
   }
  }
 },
 toggle:function(f){
  BaseIntView.prototype.toggle.apply(this,arguments);
  if(!f)
  {
   this.waiting=false;
   this.index=0;
   this.$items.eq(this.index).addClass(this.shownCls);

   this.setCtr(0);
  }
 },
});