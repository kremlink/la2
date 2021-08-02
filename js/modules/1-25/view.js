import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
import {lottie as lData} from './lottie.js';

let app,
    data=dat,
    events={};

events[`mouseenter ${data.events.l}`]='lHover';
events[`mouseenter ${data.events.r}`]='rHover';
events[`mouseleave ${data.events.l}`]='leave';
events[`mouseleave ${data.events.r}`]='leave';
events[`click ${data.events.l}`]='lClick';
events[`click ${data.events.r}`]='rClick';
events[`click ${data.events.circle}`]='circleClick';

export let PackingView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 iTemplate:_.template($(data.view.item.tmpl).html()),
 cTemplate:_.template($(data.view.circle.tmpl).html()),
 ctrTemplate:_.template(data.view.ctrTmpl),
 el:data.view.el,
 waiting:false,
 index:0,
 iLength:null,
 phase2Lotties:[],
 circles:{clicked:0,failed:0},
 initialize:function(opts){
  app=opts.app;
  data=app.configure({start:dat}).start;

  this.opts=opts;

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  this.setLottie();

  this.$dots=this.$(data.view.score.dots);
  this.$score=this.$(data.view.score.amt);

  this.$items=$(this.iTemplate({items:data.items})).filter(function(){
   return this.nodeType!==3;
  });

  this.$(data.view.item.cont).prepend(this.$items);

  this.$items.on('transitionend',(e)=>{
   this.anim(e);
  });

  this.$ctr=this.$(data.view.$ctr);

  this.iLength=this.$items.length;

  this.setCtr(0);
  this.setLastPhase(3);

  this.next();//TODO:remove
  this.next();//TODO:remove
  this.phase2();
 },
 anim:function(e){
  if(e.originalEvent.propertyName===data.view.item.fakeTrs)
  {
   if(this.index!==this.$items.length-1)
   {
    this.$items.eq(this.index).removeClass(this.shownCls+' '+data.view.item.putLCls+' '+data.view.item.putRCls);
    this.waiting=false;
    this.$items.eq(++this.index).addClass(this.shownCls);
    this.setCtr(this.index);
   }else
   {
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

  this.circles.clicked=0;
  this.circles.failed=0;

  if(this.phase2Lotties.length)
   for(let i=0;i<this.phase2Lotties.length;i++)
    this.phase2Lotties[i].destroy();
  this.phase2Lotties=[];
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
     self.end();
    });
   },data.circles.wait*i);
  });
 },
 end:function(){
  if(this.circles.clicked+this.circles.failed===data.circles.data.length)
  {
   app.get('aggregator').trigger('ls:save',{interactive:'1-25',value:'test'});
   this.next();
  }
 },
 circleClick:function(e){
  let circle=$(e.currentTarget).removeClass(this.shownCls);

  this.circles.clicked++;
  //console.log(this.phase2Lotties[this.$circles.index(circle)]);
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
  this.$el.addClass(data.view.item.lCls);
 },
 rHover:function(){
  this.$el.addClass(data.view.item.rCls);
 },
 leave:function(){
  this.$el.removeClass(data.view.item.lCls+' '+data.view.item.rCls);
 },
 lClick:function(){
  if(!this.waiting)
  {
   if(!data.items[this.index].yep)
   {
    this.$items.eq(this.index).addClass(data.view.item.putLCls);
    this.waiting=true;
   }else
   {
    app.get('aggregator').trigger('sound','btn');
   }
  }
 },
 rClick:function(){
  if(!this.waiting)
  {
   if(data.items[this.index].yep)
   {
    this.$items.eq(this.index).addClass(data.view.item.putRCls);
    this.waiting=true;
   }else
   {
    app.get('aggregator').trigger('sound','btn');
   }
  }
 },
 /*toggle:function(f){
  BaseIntView.prototype.toggle.apply(this,arguments);
 },*/
 click:function(){
  //this.next();

  /*if(app.get('lib.utils.form.validate')({check:this.$inp,data:data.view.vData,error:(obj)=>obj.addClass(data.view.errCls)}))
  {
   app.get('aggregator').trigger('board:user',Object.fromEntries(this.$inp.serializeArray().map(({name,value})=>[name,value])));
   this.away();
  }*/
 }
});