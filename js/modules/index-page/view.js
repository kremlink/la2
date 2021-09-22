import {Metrika} from '../metrika.js';
import {MainView} from '../main/view.js';
import {PlayerView} from '../player/view.js';

import {data as dat} from './data.js';
let app,
    data=dat,
    epIndex,
    lsMgr;

let events={};
events[`click ${data.events.start}`]='start';
//events[`click ${data.events.goOn}`]='goOn';
events[`click ${data.events.clr}`]='clr';

export let Index=Backbone.View.extend({
 events:events,
 el:data.view.el,
 main:null,
 initialize:function(opts){
  app=opts.app;
  data=app.configure({index:dat}).index;
  //might be needed someday
  app.set({dest:'objects.isPc',object:matchMedia(data.pcViewport).matches});

  epIndex=app.get('epIndex');

  new Metrika({app:app});
  this.main=new MainView({app:app});

  this.$el.toggleClass(data.view.tooSmallCls,window.screen.width<data.minViewport);
  $(window).on('resize',_.debounce(()=>{
   this.$el.toggleClass(data.view.tooSmallCls,window.screen.width<data.minViewport);
  },200));
  document.addEventListener('contextmenu',e=>e.preventDefault());
  this.listenTo(app.get('aggregator'),'player:ready',this.loaded);
  //this.listenTo(app.get('aggregator'),'player:fs',this.fs);
  this.listenTo(app.get('aggregator'),'player:interactive',this.pause);
  this.listenTo(app.get('aggregator'),'player:play',this.play);

  lsMgr=this.main.lsMgr;

  lsMgr.sendData({ini:true,cb:()=>this.prepare()});
 },
 prepare:function(){//inconsistent loadeddata event with multiple videos
  let imgs,
      wait=[];

  if(data.preload[epIndex])
  {
   for(let [x,y] of Object.entries(data.preload[epIndex]))
   {
    imgs=[];
    if(y.imgs){
     imgs=y.imgs.map(t=>x+t);
    }
    if(y.j)
    {
     for(let i=1;i<=y.j.length;i++)
      for(let j=1;j<=y.j[i-1];j++)
       for(let k=0;k<y.tmpl.length;k++)
        imgs.push(x+y.tmpl[k].replace('[i]',i).replace('[j]',j));
    }
    wait.push(app.get('lib.utils.imgsReady')({src:imgs}));
   }
  }

  $.when(wait).then(()=>{
   this.main.addPlayer(new PlayerView({app:app,lsMgr:lsMgr}));
  });
 },
 /*goOn:function(){
  let ls=lsMgr.getData().data[epIndex];

  this.$el.addClass(data.view.startCls);
  this.main.player.setGoOn();
  this.main.player.play({time:ls.savedTime,interactive:ls.interactive});
 },*/
 clr:function(){
  lsMgr.resetData(true);
  this.$el.removeClass(data.view.goOnCls);
 },
 loaded:function(){
  this.$el.addClass(data.view.loadedCls);
  this.start();//TODO:remove
  setTimeout(()=>this.main.player.pause(),500);//TODO:remove
 },
 disable:function(f){
  this.$el.toggleClass(data.view.nopeCls,f);
 },
 start:function(){
  let ls=lsMgr.getData().data[epIndex];
  
  this.$el.addClass(data.view.startCls);
  if(ls.savedTime)
  {console.log(ls);
   this.main.player.setGoOn();
   this.main.player.play({time:ls.savedTime,interactive:ls.interactive});
  }else
  {
   //lsMgr.resetData();
   this.main.player.play();
  }
  app.get('aggregator').trigger('sound','btn');
 },
 pause:function(opts){
  if(!opts.data.checkpoint)
   this.$el.addClass(data.view.pauseCls);
 },
 play:function(){
  this.$el.removeClass(data.view.pauseCls);
 }
});