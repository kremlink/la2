import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';
import {lottie as lData} from '../1-23/lottie.js';
import {lottie as lArrData} from '../baseInteractive/lottie.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.fixate}`]='fixate';
events[`click ${data.events.lArr}`]='lArr';
events[`click ${data.events.rArr}`]='rArr';
events[`transitionend ${data.events.fixate}`]='trs';

export let FixView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 duration:0,
 time:0,
 ignoreTime:[],
 initialize:function(opts){
  app=opts.app;
  //data=app.configure({start:dat}).start;

  this.opts=opts;

  this.$vid=this.$(data.view.vid);
  this.$vid[0].src=_.template(data.vidSrc.tmpl)({epIndex:app.get('epIndex'),src:data.vidSrc['360']});
  this.$words=this.$(data.view.words);

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  lottie.loadAnimation({
   container:this.$(data.view.$lottie)[0],
   renderer:'svg',
   loop:true,
   autoplay:true,
   animationData:lData.btn
  });

  this.$(`${data.events.lArr},${data.events.rArr}`).each(function(){
    lottie.loadAnimation({
     container:this,
     renderer:'svg',
     loop:true,
     autoplay:true,
     animationData:lArrData
    });
   });

  this.$vid.on('loadedmetadata',()=>{
   this.duration=this.$vid[0].duration;
  });

  //this.next();
 },
 toggle:function(f){
  if(f)
  {
   this.time=0;
   this.ignoreTime=[17,18,19];
   this.$words.html('');
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 trs:function(e){
  if(e.originalEvent.propertyName===data.view.fakeTrs)
   $(e.currentTarget).removeClass(data.view.errCls);
 },
 lArr:function(){
  this.lrArr(-1);
 },
 rArr:function(){
  this.lrArr(1);
 },
 lrArr:function(f){
  app.get('aggregator').trigger('sound','btn');

  this.setTime(f);
  while(this.ignoreTime.includes(this.time))
   this.setTime(f);

  this.$vid[0].currentTime=this.time+0.1;
 },
 fixate:function(e){
  let s;

  if(data.timing[this.time]&&!this.ignoreTime.includes(this.time))
  {
   app.get('aggregator').trigger('sound','yes');
   s=this.$words.html();
   this.$words.html((s?s+'&nbsp;&nbsp;&nbsp;&nbsp;':'')+data.timing[this.time]);
   this.ignoreTime.push(this.time);
   if(Object.keys(data.timing).every(v=>this.ignoreTime.includes(+v)))
   {
    app.get('aggregator').trigger('ls:save',{interactive:'2-39'});
    setTimeout(()=>this.next(),data.before);
   }
  }else
  {
   $(e.currentTarget).addClass(data.view.errCls);
   app.get('aggregator').trigger('sound','no');
  }
 },
 setTime:function(f){
  this.time=f<0?(this.time>0?f+this.time:this.duration):(this.time<this.duration?f+this.time:0);
 }
});