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
 initialize:function(opts){
  app=opts.app;
  data=app.configure({start:dat}).start;

  this.opts=opts;

  this.tTmpl=_.template(data.view.tTmpl);
  this.$time=this.$(data.view.time);

  this.$cont=this.$(data.view.cont);
  this.$cont.find('img').imagesLoaded(()=>{
   this.$cont.addClass(this.shownCls);
   this.setScroll();
  });

  this.$popsCont=this.$(data.view.popsCont).before(_.template($(data.view.tmpl).html())(data));
  this.$pops=this.$(data.view.pops);

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  this.next();

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
   this.$cont.removeClass(this.shownCls);
   this.$popsCont.removeClass(this.shownCls);
   this.$pops.removeClass(this.shownCls);
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 click:function(e){
  this.$popsCont.addClass(this.shownCls);
  this.$pops.eq(this.curr=$(e.currentTarget).index()).addClass(this.shownCls);
  if(data.items[this.curr].yep)
  {
   app.get('aggregator').trigger('ls:save',{interactive:'3-15'});
   setTimeout(()=>this.next(),data.before);
  }
 },
 close:function(){
  this.$popsCont.removeClass(this.shownCls);
  this.$pops.eq(this.curr).removeClass(this.shownCls);
 }
});