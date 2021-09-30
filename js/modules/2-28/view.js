import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.click}`]='click';

export let LabyrinthView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 tmpl:null,
 currData:{
  key:null,
  btnInd:0
 },
 finish:false,
 initialize:function(opts){
  app=opts.app;
  //data=app.configure({start:dat}).start;

  this.opts=opts;
  this.$vid=this.$(data.view.vid);

  this.tmpl=_.template($(data.view.tmpl).html());

  this.$into=this.$(data.view.into);

  this.$smooth=$(data.view.$smooth);

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  this.iniVid();

  //this.next();
 },
 iniVid:function(){
  this.$vid.on('timeupdate',()=>{
   let curr=this.$vid[0].currentTime;

   if(!this.$vid[0].paused&&curr>data.forks[this.currData.key].btns[this.currData.btnInd].end)
   {
    this.$vid[0].pause();
    if(this.finish)
    {
     setTimeout(()=>this.next(),data.before);
    }else
    {
     this.currData.key=data.forks[this.currData.key].btns[this.currData.btnInd].go;
     this.render();
    }
   }
  }).on('seeked',()=>this.$smooth.removeClass(this.shownCls));
 },
 smoothify:function(changeTime){
  let ctx=this.$smooth[0].getContext('2d'),
   cW,
   cH,
   iW=this.$vid[0].videoWidth,
   iH=this.$vid[0].videoHeight,
   r;

  ctx.clearRect(0,0,10000,10000);
  this.$smooth.removeAttr('width').removeAttr('height');
  cW=this.$smooth.width();
  cH=this.$smooth.height();
  r=Math.min(cW/iW,cH/iH);
  this.$smooth.attr({width:cW,height:cH});
  ctx.drawImage(this.$vid[0],0,0,iW,iH,(cW-iW*r)/2,(cH-iH*r)/2,iW*r,iH*r);
  this.$smooth.addClass(this.shownCls);
  setTimeout(()=>{
   changeTime();
  },50);
 },
 render:function(){
  this.$into.addClass(this.shownCls).html(this.tmpl(_.extend({src:this.currData.key},data.forks[this.currData.key])));
 },
 toggle:function(f){
  if(f)
  {
   this.$vid[0].src=_.template(data.vidSrc.tmpl)({epIndex:app.get('epIndex'),src:data.vidSrc.src[app.get('playerQ')]});
   this.finish=false;
   this.$smooth.removeClass(this.shownCls);
   this.$into.removeClass(this.shownCls);
   this.currData={key:Object.keys(data.forks)[0],btnInd:0};
   this.render();
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 click:function(e){
  this.currData.btnInd=$(e.currentTarget).index();

  app.get('aggregator').trigger('sound','btn');
  this.$into.removeClass(this.shownCls);
  if(data.forks[this.currData.key].btns[this.currData.btnInd].finish)
  {
   this.finish=true;
   app.get('aggregator').trigger('ls:save',{interactive:'2-28'});
  }
  this.smoothify(()=>{
   this.$vid[0].currentTime=data.forks[this.currData.key].btns[this.currData.btnInd].start;
   this.$vid[0].play();
  });
 }
});