import {data as dat} from './data.js';

import {Scroll} from '../scroll/view.js';
import {data as scrollData} from '../scroll/data.js';

let app,
    data=dat,
    epIndex;

let events={};
events[`click ${data.events.caller}`]='toggle';
events[`click ${data.events.tab}`]='tab';

export let InfoPop=Backbone.View.extend({
 events:events,
 el:data.view.el,
 tabLen:0,
 scrollBar:null,
 initialize:function(opts){
  app=opts.app;
  this.listenTo(app.get('aggregator'),'info',this.populateAchievements);

  this.$tabs=this.$(data.events.tab);
  this.$blocks=this.$(data.view.block);

  this.tabLen=this.$tabs.length;

  this.setScroll();

  this.tab();
 },
 setScroll:function(){
  let $wrap=this.$el.find(scrollData.extra.$wrap).css('margin-right',app.get('scrollDim')+'px').scrollTop(0),
   $block=this.$el.find(scrollData.extra.$block);

  this.scrollBar=app.set({
   object:'Bar',
   on:Scroll.events(),
   add:$.extend(true,{},scrollData,{
    holder:this.$el.find(scrollData.holder),
    bar:this.$el.find(scrollData.bar),
    options:{helpers:{drag:app.get('lib.utils').drag}},
    extra:{$wrap:$wrap,$block:$block}
   }),
   set:false
  });
 },
 toggle:function(){
  this.$el.toggleClass(data.view.shownCls);
 },
 tab:function(e){
  let tab=e?$(e.currentTarget):this.$tabs.eq(0),
      ind=e?this.$tabs.index(tab):0;

  this.$tabs.removeClass(data.view.shownCls);
  this.$blocks.removeClass(data.view.shownCls);
  tab.addClass(data.view.shownCls);
  this.$blocks.eq(ind).addClass(data.view.shownCls);
  this.$blocks.eq(this.tabLen+ind).addClass(data.view.shownCls);
  setTimeout(()=>this.scrollBar.resize(),0);
 },
 populateAchievements:function(){
  console.log('populate achievements');
 }
});