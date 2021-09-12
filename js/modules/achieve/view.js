import {data as dat} from './data.js';

let app,
    data=dat,
    epIndex;

let events={};
events[`click ${data.events.hide}`]='hide';

export let AchievePop=Backbone.View.extend({
 events:events,
 el:data.view.el,
 template:_.template($(data.view.template).html()),
 initialize:function(opts){
  app=opts.app;
  this.listenTo(app.get('aggregator'),'achieve',this.achieve);
 },
 achieve:function(r){
  this.$el.removeClass(data.view.shownCls).html(this.template(r));
  setTimeout(()=>this.$el.addClass(data.view.shownCls),100);
 },
 hide:function(){
  this.$el.removeClass(data.view.shownCls);
 }
});