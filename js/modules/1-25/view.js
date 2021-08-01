import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';

let app,
    data=dat,
    events={};

events[`mouseenter ${data.events.l}`]='lHover';
events[`mouseenter ${data.events.r}`]='rHover';
events[`mouseleave ${data.events.l}`]='leave';
events[`mouseleave ${data.events.r}`]='leave';
events[`click ${data.events.l}`]='lClick';
events[`click ${data.events.r}`]='rClick';

export let PackingView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 iTemplate:_.template($(data.view.itemTmpl).html()),
 el:data.view.el,
 waiting:false,
 index:0,
 initialize:function(opts){
  let self=this;

  app=opts.app;
  data=app.configure({start:dat}).start;

  this.opts=opts;

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  this.$itemCont=this.$(data.view.$itemCont).prepend(this.$items=$(this.iTemplate({items:data.items})).filter(function(){
   return this.nodeType!==3;
  }));

  this.$items.on('transitionend',(e)=>{
   if(e.originalEvent.propertyName===data.view.fakeTrs)
   {
    this.$items.eq(this.index).removeClass(this.shownCls);
    this.waiting=false;
    this.$items.eq(++this.index).addClass(this.shownCls);
    //console.log(i);
    //console.log(self.$items.eq(i+1).css(data.view.fakeTrs));
   }
  });

  this.next();//TODO:remove
 },
 lHover:function(){
  this.$el.addClass(data.view.itemLCls);
 },
 rHover:function(){
  this.$el.addClass(data.view.itemRCls);
 },
 leave:function(){
  this.$el.removeClass(data.view.itemLCls+' '+data.view.itemRCls);
 },
 lClick:function(){
  if(!this.waiting)
  {
   this.$el.addClass(data.view.itemPutCls).removeClass(data.view.itemLCls);
   this.waiting=true;
  }
 },
 rClick:function(){

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