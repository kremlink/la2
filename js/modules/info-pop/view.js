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

 },
 toggle:function(e){
  this.$el.toggleClass(data.view.shownCls,$(e.currentTarget).is(data.events.caller));
 }
});