import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';

import {Scroll} from '../scroll/view.js';
import {data as scrollData} from '../scroll/data.js';

let app,
    data=dat,
    events={},
    months=['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'];

events[`click ${data.events.click}`]='click';
events[`click ${data.events.close}`]='close';

export let BrowserView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 curr:0,
 tTmpl:null,
 pTmpl:null,
 initialize:function(opts){
  app=opts.app;
  //data=app.configure({start:dat}).start;

  this.opts=opts;

  this.tTmpl=_.template(data.view.tTmpl);
  this.pTmpl=_.template(data.view.pTmpl);
  this.$(data.view.popsInto).append(_.template($(data.view.pTmpl).html())(data));
  this.$time=this.$(data.view.time);

  this.$cont=this.$(data.view.cont);
  this.$cont.find('img').imagesLoaded(()=>{//TODO:remove when shared preload added
   this.$cont.addClass(this.shownCls);
   this.setScroll();
  });

  this.$popsCont=this.$(data.view.popsCont).before(_.template($(data.view.tmpl).html())(data));
  this.$pops=this.$(data.view.pops);

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  //this.next();

  this.render();
  setInterval(()=>this.render(),1000);
 },
 setScroll:function(){
  let $wrap=this.$cont.find(scrollData.extra.$wrap).css('margin-right',app.get('scrollDim')+'px').scrollTop(0),
   $block=this.$cont.find(scrollData.extra.$block);

  app.set({
   object:'Bar',
   on:Scroll.events($wrap,$block),
   add:$.extend(true,{},scrollData,{
    holder:this.$cont.find(scrollData.holder),
    bar:this.$cont.find(scrollData.bar),
    options:{helpers:{drag:app.get('lib.utils').drag}},
    extra:{$wrap:$wrap,$block:$block}
   }),
   set:false
  });
 },
 render:function(){
  let now=new Date();

  this.$time.html(this.tTmpl({month:months[now.getMonth()],date:now.getDate(),hour:now.getHours(),minute:now.getMinutes()}));
 },
 toggle:function(f){
  if(f)
  {
   this.$popsCont.removeClass(this.shownCls);
   this.$pops.removeClass(this.shownCls);
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 click:function(e){
  this.curr=$(e.currentTarget).index();
  if(data.items[this.curr].yep)
  {
   app.get('aggregator').trigger('sound','yes');
   app.get('aggregator').trigger('ls:save',{interactive:'3-15-2'});
   this.next();
  }else
  {
   this.$popsCont.addClass(this.shownCls);
   this.$pops.eq(this.curr).addClass(this.shownCls);
   app.get('aggregator').trigger('sound','no');
  }
 },
 close:function(){
  app.get('aggregator').trigger('sound','btn');
  this.$popsCont.removeClass(this.shownCls);
  this.$pops.eq(this.curr).removeClass(this.shownCls);
 }
});