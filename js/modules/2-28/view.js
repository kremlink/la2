import {BaseIntView} from '../baseInteractive/view.js';
import {data as dat} from './data.js';

let app,
    data=dat,
    events={};

events[`click ${data.events.click}`]='click';

export let LabyrinthView=BaseIntView.extend({
 events:function(){
  return _.extend({},BaseIntView.prototype.events,events);
 },
 el:data.view.el,
 tmpl:null,
 initialize:function(opts){
  app=opts.app;
  data=app.configure({start:dat}).start;

  this.opts=opts;
  this.$vid=this.$(data.view.vid);
  this.$vid[0].src=_.template(data.vidSrc.tmpl)({src:data.vidSrc['360']});

  this.tmpl=_.template($(data.view.tmpl).html());

  this.$into=this.$(data.view.into);

  BaseIntView.prototype.initialize.apply(this,[{
   app:app,
   data:data
  }]);

  this.next();
 },
 toggle:function(f){
  let l;

  if(f)
  {
   l=Object.entries(data.forks)[0];
   this.$into.html(this.tmpl(_.extend({src:l[0]},l[1])));
  }

  BaseIntView.prototype.toggle.apply(this,arguments);
 },
 click:function(e){
  let curr=$(e.currentTarget);

  /*app.get('aggregator').trigger('ls:save',{interactive:'2-28'});
  this.away();*/
 }
});