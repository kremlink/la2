import {data as dat} from './data.js';

let app,
    events={},
    data=dat;

events[`click.base ${data.events.click}`]='btnClick';
events[`mouseenter.base ${data.events.click}`]='btnHover';

export let BaseIntView=Backbone.View.extend({
 events:events,
 phase:0,
 data:{},
 shownCls:data.view.shownCls,
 initialize:function(opts){
  app=opts.app;

  this.$block=this.$(data.view.block);

  this.toggle(true);
 },
 setData:function(k,v){
  this.data[k]=v;
 },
 next:function(){
  this.$block.eq(this.phase).removeClass(this.shownCls);
  this.phase++;
  this.$block.eq(this.phase).addClass(this.shownCls);
 },
 btnClick:function(){
  app.get('aggregator').trigger('sound','btn');
  if(this.phase===2)
   this.away();else
   this.next();
 },
 btnHover:function(){
  app.get('aggregator').trigger('sound','btn-h');
 },
 away:function(){
  app.get('aggregator').trigger('interactive:toggle',{show:false,opts:this.data});
  this.toggle(false);
 },
 toggle:function(f){
  if(f)
  {
   this.phase=0;
   this.$block.removeClass(this.shownCls).eq(this.phase).addClass(this.shownCls);
   this.data={};
  }
  this.$el.toggleClass(this.shownCls,f);
  app.get('aggregator').trigger(f?'sound':'unsound','bg');
 }
});