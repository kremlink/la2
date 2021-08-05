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
events[`transitionend ${data.events.l}`]='trs';
events[`transitionend ${data.events.r}`]='trs';

export let TeamView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 iTemplate:_.template($(data.view.item.tmpl).html()),
 ctrTemplate:_.template(data.view.ctrTmpl),
 el:data.view.el,
 waiting:true,
 index:0,
 iLength:null,
 ignore:false,
 initialize:function(opts){
  let s='';

  app=opts.app;
  data=app.configure({start:dat}).start;

  pc=app.get('isPc');

  this.opts=opts;

  this.setLottie();

  this.$vid=this.$(data.view.vid.item);

  this.$miniCont=this.$(data.view.miniCont.item);
  for(let i=0;i<data.items.length;i++)
   s+=data.view.miniCont.tmpl;
  this.$miniCont.html(this.$mini=$(s));

  this.$items=$(this.iTemplate({items:data.items})).filter(function(){
   return this.nodeType!==3;
  });

  this.$iCont=this.$(data.view.item.cont).prepend(this.$items);

  this.$desc=this.$(data.view.desc);

  this.$items.on('transitionend',(e)=>{this.anim(e);});

  this.$ctr=this.$(data.view.$ctr);

  this.iLength=this.$items.length;

  this.setCtr(0);
  
  this.iniSwipe();
  this.iniVids();

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  this.next();//TODO:remove
 },
 next:function(){
  BaseIntView.prototype.next.apply(this,arguments);
  if(this.phase===1)
   setTimeout(()=>{this.$vid[0].play();},data.beforeCards);
 },
 iniVids:function(){
  this.$vid.on('timeupdate',()=>{
   if(this.$vid[0].currentTime>data.view.vid.pause&&!this.ignore)
   {
    this.ignore=true;
    this.$vid[0].pause();
    this.$items.eq(this.index).addClass(this.shownCls);
   }
  }).on('ended',()=>{
   if(this.index!==this.iLength-1)
   {
    this.$vid[0].currentTime=0;
    this.$vid[0].play();
    this.ignore=false;
    this.$el.removeClass(data.view.enableCls);
   }
  });
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
  if(e.originalEvent.propertyName===data.view.item.showTrs&&
   $(e.currentTarget).is(this.$items.eq(this.index)))
  {
   this.$vid[0].currentTime=data.view.vid.go;
   this.waiting=false;

   this.$el.addClass(data.view.enableCls);
  }

  if(e.originalEvent.propertyName===data.view.item.fakeTrs)
  {
   if(this.index!==this.iLength-1)
   {
    this.$items.eq(this.index++).removeClass(this.shownCls+' '+data.view.item.putLCls+' '+data.view.item.putRCls);
    this.waiting=true;
    this.setCtr(this.index);
   }else
   {
    this.$items.eq(this.index).removeClass(this.shownCls+' '+data.view.item.putLCls+' '+data.view.item.putRCls);
    this.index++;
    this.setCtr(this.index);
    app.get('aggregator').trigger('ls:save',{interactive:'1-30'});
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
 trs:function(e){
  if(e.originalEvent.propertyName===data.view.item.fakeTrs)
   $(e.currentTarget).removeClass(data.view.item.errCls);
 },
 lClick:function(e){
  this.lrClick(e,!data.items[this.index].yep,data.view.item.putLCls);
 },
 rClick:function(e){
  this.lrClick(e,data.items[this.index].yep,data.view.item.putRCls);
 },
 lrClick:function(e,f,cls){
  if(!this.waiting)
  {
   if(f)
   {
    this.$items.eq(this.index).addClass(cls);
    this.$el.removeClass(data.view.enableCls);
    this.waiting=true;
    this.$vid[0].play();
    app.get('aggregator').trigger('sound','btn');
    this.$mini.eq(data.items[this.index].mini.index).html(data.items[this.index].mini.type);
   }else
   {
    app.get('aggregator').trigger('sound','btn');
    $(e.currentTarget).addClass(data.view.item.errCls);
    this.$desc.html(data.items[this.index].err);
   }
  }
 },
 toggle:function(f){
  BaseIntView.prototype.toggle.apply(this,arguments);
  if(f)
  {
   this.index=0;
   this.$vid[0].currentTime=0;
   this.ignore=false;
   this.$desc.html('');
   this.$mini.html('');

   this.setCtr(0);
  }
 },
});