import {SoundMgr} from '../soundMgr/view.js';
import {LsMgr} from '../lsMgr/view.js';

import {StartView} from '../start/view.js';

import {data as dat} from './data.js';

let Interactives={
 Start:StartView
};

let app,
    data=dat,
    events={},
    epIndex;

export let MainView=Backbone.View.extend({
 events:events,
 el:data.view.el,
 goOn:false,
 delayedPTimer:null,
 interactives:{},
 initialize:function(opts){console.log(opts);
  let throttle=_.throttle((opts)=>this.saveTimeAndPhase(opts),data.throttle,{leading:false});

  app=opts.app;
  data=app.configure({main:dat}).main;

  epIndex=app.get('epIndex');

  this.lsMgr=new LsMgr({app:app});

  this.listenTo(app.get('aggregator'),'interactive:toggle',this.toggle);
  this.listenTo(app.get('aggregator'),'player:back',this.hide);
  this.listenTo(app.get('aggregator'),'player:interactive',this.step);
  this.listenTo(app.get('aggregator'),'player:timeupdate',throttle);
  this.listenTo(app.get('aggregator'),'player:goOn',this.setGoOn);

  $(window).on('visibilitychange pagehide',()=>app.get('aggregator').trigger('page:state'));

  new SoundMgr({app:app});
 },
 saveTimeAndPhase:function(opts){
  let ls=this.lsMgr.getData();

  ls.data[epIndex].savedTime=opts.currTime;
  this.lsMgr.setData(ls);
 },
 setGoOn:function(){
  this.goOn=true;
 },
 toggle:function({show:show,opts}){
  let timecodeData=this.player.getData().timecodes;

  app.get('aggregator').trigger('main:toggle',!show);

  if(show)
  {
   if(~timecodeData.delayedPause)
    this.delayedPTimer=setTimeout(()=>app.get('aggregator').trigger('player:pause'),timecodeData.delayedPause?timecodeData.delayedPause*1000:0);
  }else
  {
   clearTimeout(this.delayedPTimer);
   //setTimeout(()=>app.get('aggregator').trigger('player:pause'),data.time);else
   app.get('aggregator').trigger('player:play',{time:opts.end?timecodeData.data[opts.end]:
     (!('end' in timecodeData)?-1:timecodeData.end)});
  }

  this.$el.toggleClass(timecodeData.noAnim?data.view.noAnimCls:data.view.shownCls,show);
 },
 step:function(){
  let timecodeData=this.player.getData().timecodes,
      int=timecodeData.data.interactive;

  if(timecodeData.checkpoint)
  {
   app.get('aggregator').trigger('timer:update',timecodeData);
  }else
  {
   if(!this.interactives[int])
    this.interactives[int]=new Interactives[int]({app:app,data:d});else
    this.interactives[int].toggle(true);
   this.toggle({show:true});
  }
 }
});