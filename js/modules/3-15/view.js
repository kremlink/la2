import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.click}`]='click';
events[`click ${data.events.close}`]='close';

export let BrowserView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 curr:0,
 initialize:function(opts){
  app=opts.app;
  data=app.configure({start:dat}).start;

  this.opts=opts;

  this.$popsCont=this.$(data.view.popsCont).before(_.template($(data.view.tmpl).html())(data));
  this.$pops=this.$(data.view.pops);

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  this.next();
 },
 toggle:function(f){
  if(f)
  {

  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 click:function(e){
  this.$popsCont.addClass(this.shownCls);
  this.$pops.eq(this.curr=$(e.currentTarget).index()).addClass(this.shownCls);
 },
 close:function(){
  this.$popsCont.removeClass(this.shownCls);
  this.$pops.eq(this.curr).removeClass(this.shownCls);
 }
});