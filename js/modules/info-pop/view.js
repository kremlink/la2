import {data as dat} from './data.js';

let app,
    data=dat,
    epIndex;

let events={};
events[`click ${data.events.hide}`]='toggle';
events[`click ${data.events.caller}`]='toggle';

export let InfoPop=Backbone.View.extend({
 events:events,
 el:data.view.el,
 initialize:function(opts){
  app=opts.app;
  this.listenTo(app.get('aggregator'),'info',this.populateAchievements);
 },
 toggle:function(e){
  this.$el.toggleClass(data.view.shownCls,$(e.currentTarget).is(data.events.caller));
 },
 populateAchievements:function(){
  console.log('populate achievements');
 }
});