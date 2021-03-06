import {data as dat} from './data.js';

let app,
    events={},
    data=dat;

events[`click.base ${data.events.click}`]='btnClick';
events[`mouseenter.base ${data.events.click}`]='btnHover';

export let BaseIntView=Backbone.View.extend({
 events:events,
 phase:0,
 initialize:function(opts){
  app=opts.app;

  this.$block=this.$(data.view.block);

  this.toggle(true);
 },
 next:function(){
  this.$block.eq(this.phase).removeClass(data.view.shownCls);
  this.phase++;
  this.$block.eq(this.phase).addClass(data.view.shownCls);
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
 away:function(correct=false,opts){
  app.get('aggregator').trigger('interactive:toggle',{show:false,correct:correct,opts:opts});
  this.toggle(false);
 },
 toggle:function(f){
  if(f)
  {
   this.phase=0;
   this.$block.eq(this.phase).addClass(data.view.shownCls);
  }
  this.$el.toggleClass(data.view.shownCls,f);
  app.get('aggregator').trigger(f?'sound':'unsound','bg');
 }
});