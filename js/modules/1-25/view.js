import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';
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
events[`click ${data.events.circle}`]='circleClick';
events[`transitionend ${data.events.l}`]='trs';
events[`transitionend ${data.events.r}`]='trs';

export let PackingView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 iTemplate:null,
 cTemplate:null,
 ctrTemplate:null,
 el:data.view.el,
 waiting:false,
 index:0,
 iLength:null,
 phase2Lotties:[],
 mS:null,
 circles:{clicked:0,failed:0},
 initialize:function(opts){
  app=opts.app;
  //data=app.configure({start:dat}).start;

  pc=app.get('isPc');

  this.opts=opts;

  this.mS=new opts.MS({view:this,points:data.points,amt:data.items.length+data.circles.data.length});

  this.setLottie();

  this.iTemplate=_.template($(data.view.item.tmpl).html());
  this.cTemplate=_.template($(data.view.circle.tmpl).html());
  this.ctrTemplate=_.template(data.view.ctrTmpl);

  this.$items=$(this.iTemplate({items:data.items})).filter(function(){return this.nodeType!==3;});

  this.$iCont=this.$(data.view.item.cont).prepend(this.$items);

  this.$desc=this.$(data.view.desc);

  this.$items.on('transitionend',(e)=>{
   this.anim(e);
  });

  this.$ctr=this.$(data.view.$ctr);

  this.iLength=this.$items.length;

  this.setCtr(0);
  this.setLastPhase(3);

  this.iniSwipe();

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  //this.next();//TODO:remove
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
    setTimeout(()=>{this.next();this.phase2();},data.beforePhase1);
   }
  }
 },
 phase2:function(){
  let self=this;

  this.$(data.view.circle.cont).html(this.$circles=$(this.cTemplate({circles:data.circles.data})).filter(function(){
   return this.nodeType!==3;
  }));

  this.$(data.view.lottie.circle).each(function(i){
   setTimeout(()=>{
    let l=lottie.loadAnimation({
     container:this,
     renderer:'svg',
     loop:false,
     autoplay:true,
     animationData:lData.circle
    });

    self.$circles.eq(i).addClass(self.shownCls);
    self.phase2Lotties.push(l);
    l.addEventListener('complete',()=>{
     self.$circles.eq(i).removeClass(self.shownCls);
     self.circles.failed++;
     self.mS.setPoints(false);
     self.end();
    });
   },data.circles.wait*i);
  });
 },
 end:function(){
  if(this.circles.clicked+this.circles.failed===data.circles.data.length)
  {
   app.get('aggregator').trigger('ls:save',{interactive:'1-25',value:this.mS.getPoints()});
   setTimeout(()=>{this.next();},data.away);
  }
 },
 circleClick:function(e){
  let circle=$(e.currentTarget).removeClass(this.shownCls).addClass(data.view.circle.clickedCls);

  this.circles.clicked++;
  this.mS.setPoints(true);
  this.phase2Lotties[this.$circles.index(circle)].pause();
  this.end();
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
    this.waiting=true;
    this.mS.setPoints(true);
    this.$desc.eq(this.index).html(data.items[this.index].desc);
   }else
   {
    app.get('aggregator').trigger('sound','btn');
    this.mS.setPoints(false);
    $(e.currentTarget).addClass(data.view.item.errCls);
    this.$desc.eq(this.index).html(data.items[this.index].err);
   }
  }
 },
 toggle:function(f){
  BaseIntView.prototype.toggle.apply(this,arguments);
  if(f)
  {
   this.waiting=false;
   this.index=0;
   this.$items.eq(this.index).addClass(this.shownCls);
   this.$desc.eq(this.index).html(data.items[this.index].desc);

   this.circles.clicked=0;
   this.circles.failed=0;

   for(let i=0;i<this.phase2Lotties.length;i++)
    this.phase2Lotties[i].destroy();
   this.phase2Lotties=[];

   this.setCtr(0);
   this.mS.clr();
  }
 },
});