import {data as dat} from './data.js';

let app,
    data=dat,
    epIndex;

export let MicroScore=Backbone.View.extend({
 points:0,
 amt:0,
 pointsData:{},
 initialize:function(opts){
  this.$dots=opts.view.$(data.dots);
  this.$score=opts.view.$(data.amt);

  this.amt=opts.amt;
  this.pointsData=$.extend(data.points,opts.points);
 },
 getPoints:function(){
  return this.points;
 },
 setPoints:function(f){
  data.cls.forEach((o)=>{
   this.$dots.removeClass(o);
  });

  this.points+=f?this.pointsData.yes:this.pointsData.no;
  if(this.points<0)
   this.points=0;
  this.$score.text(this.points);
  if(this.points===this.pointsData.yes*this.amt)
   this.$dots.addClass(data.cls[2]);else
   if(this.points>=this.pointsData.yes*(this.amt-1)+this.pointsData.no)
    this.$dots.addClass(data.cls[1]);else
    if(this.points>=this.amt*(this.pointsData[data.cls[0]]*this.pointsData.yes+(1-this.pointsData[data.cls[0]])*this.pointsData.no))
     this.$dots.addClass(data.cls[0]);
 },
 clr:function(){
  this.points=0;
  data.cls.forEach((o)=>{
   this.$dots.removeClass(o);
  });
  this.$score.text(this.points);
 }
});