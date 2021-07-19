import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.test}`]='click';

export let StartView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 initialize:function(opts){
  app=opts.app;
  data=app.configure({start:dat}).start;

  this.opts=opts;

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);
 },
 /*toggle:function(f){
  BaseIntView.prototype.toggle.apply(this,arguments);
 },*/
 click:function(){
  this.next();
  /*if(app.get('lib.utils.form.validate')({check:this.$inp,data:data.view.vData,error:(obj)=>obj.addClass(data.view.errCls)}))
  {
   app.get('aggregator').trigger('board:user',Object.fromEntries(this.$inp.serializeArray().map(({name,value})=>[name,value])));
   this.away();
  }*/
 }
});