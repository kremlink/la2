import {data as dat} from './data.js';

let app,
    data=dat,
    epIndex,
    events={},
    lsMgr;

events[`click ${data.events.iiBack}`]='iiBack';

export let PlayerView=Backbone.View.extend({
 events:events,
 el:data.view.el,
 extTemplate:null,
 pData:null,
 qual:null,
 pausable:true,
 firstTime:true,
 goOn:false,
 initialize:function(opts){
  app=opts.app;
  data=app.configure({player:dat}).player;

  let ext=$(data.view.extTemplate);

  epIndex=app.get('epIndex');
  lsMgr=opts.lsMgr;

  this.$extra=$(data.view.$extra);

  this.extTemplate=ext.length?_.template($(data.view.extTemplate).html()):()=>{};
  this.pData=$.extend(true,{},data.data[epIndex]);
  this.qual=[...data.quality];
  this.player=videojs(this.el,{
   controlBar:{
    children:{
     playToggle:{},
     volumePanel:{inline:false},
     progressControl:{},
     currentTimeDisplay:{},
     timeDivider:{},
     durationDisplay:{}
    }
   },
   plugins:{

   }
  },()=>{
   this.prepare();
  });
  this.listenTo(app.get('aggregator'),'main:toggle',this.setPausable);
  this.listenTo(app.get('aggregator'),'page:state',this.freeze);
 },
 freeze:function(){
  if(document.visibilityState==='hidden')
   this.pause();
 },
 setPausable:function(f){
  this.pausable=f;
 },
 iiBack:function(e){
  let index=$(e.currentTarget).index();

  this.pData.timecodes.forEach((o,i)=>{
   if(index>=i)
    o.invoked=false;
  });
  app.get('aggregator').trigger('player:back');
  this.setStepsChoose();
  this.setPausable(true);

  this.play({time:this.pData.timecodes[index].start});
 },
 changeSrc:function(src){
  let ind=this.qual.findIndex((o)=>matchMedia(o.width).matches);

  for(let i=0;i<this.qual.length;i++)
  {
   this.qual[i].src=_.template(data.srcData.tmpl)({spec:data.srcData.spec[i],src:src});
   if(i===ind)
    this.qual[i].selected=true;
  }

  this.player.src(this.qual);
 },
 getData:function(){
  return {
   pData:this.pData
  };
 },
 setStepsChoose:function(){
  let choose=0;//TODO:do it

  this.$extra.html(this.extTemplate({choose:choose}));
 },
 setGoOn:function(){
  this.goOn=true;
  app.get('aggregator').trigger('player:goOn');
 },
 prepare:function(){
  let touched={};

  this.setElement(data.view.el);
  this.changeSrc(this.pData.src);

  this.player.controlBar.addChild('QualitySelector');

  if(app.get('_dev-player'))
   this.player.muted(true);

  this.player.on('play',()=>{
   if(!app.get('_dev-player')&&!document.fullscreenElement&&document.documentElement.requestFullscreen)
    document.documentElement.requestFullscreen();
   if(!this.pausable)
    this.pause();
  });

  this.player.on('touchstart',e=>{
   touched.x=e.touches[0].pageX;
   touched.y=e.touches[0].pageY;
  });
  this.player.on('touchend',e=>{
   if(Math.sqrt((touched.x-e.changedTouches[0].pageX)*(touched.x-e.changedTouches[0].pageX)+
       (touched.y-e.changedTouches[0].pageY)*(touched.y-e.changedTouches[0].pageY))<data.touchPlayRadius)
   {
    if(e.target.nodeName==='VIDEO')
     this.playPauseByCtrls();
   }
  });

  this.player.on('timeupdate',()=>{
   let curr=this.player.currentTime();

   app.get('aggregator').trigger('player:timeupdate',curr);
   this.pData.timecodes.forEach((o)=>{
    if((o.start<0?curr>this.player.duration()+o.start:curr>o.start)&&!o.invoked)
    {
     app.get('aggregator').trigger('player:interactive',o);
     o.invoked=true;
    }
   });
  });

  this.player.on('ended',()=>{
   app.get('aggregator').trigger('player:ended',{cb:()=>location.href=data.redirect[epIndex]});
  });

  this.player.on('loadedmetadata',()=>{
   if(this.firstTime)
    app.get('aggregator').trigger('player:ready');
   this.firstTime=false;
  });

  $(document).on('keypress',(e)=>{
   if(this.player.controlBar.playToggle.el()!==document.activeElement&&e.which===32&&this.pausable)
    this.playPauseByCtrls();
  });
 },
 playPauseByCtrls:function(){
  if(this.player.paused())
   this.play();else
   this.pause();
 },
 play:function({time=-1}={}){
  if(~time)
  {
   this.player.currentTime(time);
   this.timecodes.forEach((o)=>{
    if(this.goOn)
    {
     if(time>o.start)
      o.invoked=true;
    }else
    {
     if(time<o.start&&o.repeatable)
      o.invoked=false;
    }
   });
  }
  if(this.player.paused())
   this.player.play();
 },
 pause:function(){
  if(!this.player.seeking())
   this.player.pause();
 }
});