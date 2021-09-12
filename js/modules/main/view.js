import {SoundMgr} from '../soundMgr/view.js';
import {LsMgr} from '../lsMgr/view.js';
import {MicroScore} from '../mS/view.js';
import {InfoPop} from '../info-pop/view.js';
import {AchievePop} from '../achieve/view.js';

import {ForkView} from '../1-23/view.js';
import {PackingView} from '../1-25/view.js';
import {TeamView} from '../1-30/view.js';

import {QsView} from '../2-25/view.js';
import {RingView} from '../2-7/view.js';
import {LabyrinthView} from '../2-28/view.js';
import {FixView} from '../2-39/view.js';

import {BrowserView} from '../3-15/view.js';
import {LoopView} from '../3-15-1/view.js';
import {Qs1View} from '../3-17/view.js';

import {TabletsView} from '../4-4/view.js';

import {data as dat} from './data.js';

let Interactives={
 Fork:ForkView,
 Packing:PackingView,
 Team:TeamView,
 Qs:QsView,
 Ring:RingView,
 Labyrinth:LabyrinthView,
 Fix:FixView,
 Browser:BrowserView,
 Loop:LoopView,
 Qs1:Qs1View,
 Tablets:TabletsView
};

let app,
    data=dat,
    events={},
    epIndex;

export let MainView=Backbone.View.extend({
 events:events,
 el:data.view.el,
 player:null,
 goOn:false,
 delayedPTimer:null,
 intData:null,
 interactives:{},
 initialize:function(opts){
  let throttle=_.throttle((opts)=>this.saveTimeAndPhase(opts),data.throttle,{leading:false});

  app=opts.app;
  data=app.configure({main:dat}).main;

  epIndex=app.get('epIndex');

  this.lsMgr=new LsMgr({app:app});
  new InfoPop({app:app});
  new AchievePop({app:app});

  this.listenTo(app.get('aggregator'),'interactive:toggle',this.toggle);
  this.listenTo(app.get('aggregator'),'player:back',this.hide);
  this.listenTo(app.get('aggregator'),'player:interactive',this.step);
  this.listenTo(app.get('aggregator'),'player:timeupdate',throttle);
  this.listenTo(app.get('aggregator'),'player:goOn',this.setGoOn);

  $(window).on('visibilitychange pagehide',()=>app.get('aggregator').trigger('page:state'));

  new SoundMgr({app:app});
 },
 hide:function(){
  this.$el.removeClass(data.view.shownCls+' '+data.view.noBgCls);
  for(let x of Object.values(this.interactives))
   x.toggle(false);
 },
 addPlayer:function(P){
  this.player=P;
 },
 saveTimeAndPhase:function(currTime){
  let ls=this.lsMgr.getData();

  ls.data[epIndex].savedTime=currTime;
  this.lsMgr.setData(ls);
 },
 setGoOn:function(){
  this.goOn=true;
 },
 toggle:function({show:show,opts}){
  let tD=this.intData.data,
      ls=this.lsMgr.getData();

  app.get('aggregator').trigger('main:toggle',!show);

  if(show)
  {
   ls.data[epIndex].interactive=this.intData.index;
   if(~tD.delayedPause)
    this.delayedPTimer=setTimeout(()=>this.player.pause(),tD.delayedPause?tD.delayedPause*1000:0);
  }else
  {
   ls.data[epIndex].interactive=-1;
   clearTimeout(this.delayedPTimer);
   this.player.play({time:opts.time?opts.time:(!('end' in tD)?-1:tD.end)});
  }

  this.lsMgr.setData(ls);
  this.$el.toggleClass(tD.noAnim?data.view.noAnimCls:data.view.shownCls,show);
  if(tD.noBg)
   this.$el.toggleClass(data.view.noBgCls,show);
 },
 step:function(opts){
  let tD=opts.data,
      int=tD.data.interactive,
      ls;

  this.intData=opts;

  if(tD.checkpoint)
  {
   ls=this.lsMgr.getData();
   ls.data[epIndex].interactive=this.intData.index;
   this.lsMgr.setData(ls);
   app.get('aggregator').trigger('ls:save',{interactive:tD.data.interactive});
   if(tD.data.achievement)
    this.achieve(tD.data.achievement);
  }else
  {
   if(!this.interactives[int])
    this.interactives[int]=new Interactives[int]({app:app,data:tD,MS:MicroScore});else
    this.interactives[int].toggle(true);
   this.toggle({show:true});
  }
 }
});