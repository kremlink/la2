import {data as dat} from './data.js';

import {Scroll} from '../scroll/view.js';
import {data as scrollData} from '../scroll/data.js';

let app,
    data=dat,
    epIndex;

let events={};
events[`click ${data.events.caller}`]='toggle';
events[`click ${data.events.tab}`]='tab';
events[`click ${data.events.copy}`]='copy';
events[`click ${data.events.go}`]='go';

export let InfoPop=Backbone.View.extend({
 events:events,
 el:data.view.el,
 tabLen:0,
 scrollBar:null,
 shown:false,
 achTemplate:_.template($(data.view.ach.tmpl).html()),
 initialize:function(opts){
  app=opts.app;
  this.listenTo(app.get('aggregator'),'info:populate',this.populate);

  this.$tabs=this.$(data.events.tab);
  this.$blocks=this.$(data.view.block);

  this.$ach=this.$(data.view.ach.item);
  this.$achCtr=this.$(data.view.ach.ctr);

  this.$code=this.$(data.view.code);
  this.$qr=this.$(data.view.qr);
  this.$codeInput=this.$(data.view.codeInput);
  this.$codeHidden=this.$(data.view.codeHidden);
  this.$mail=this.$(data.view.mail);
  this.$save=this.$(data.view.save);

  this.tabLen=this.$tabs.length;

  this.setScroll();

  this.tab();
 },
 copy:function(){
  this.$codeHidden.select();
  document.execCommand('copy');
 },
 clrHref:function(){
  return location.href.replace(/\?.*/,'').replace(/#.*/,'');
 },
 go:function(){
  location.href=this.clrHref()+`?${data.view.param}=`+this.$codeInput.val();
 },
 setCode:function(code){
  this.$code.text(code);
  this.$codeHidden.val(code);

  this.$qr.html('').qrcode({text:this.clrHref()+`?${data.view.param}=`+code});
  this.$save.attr('download',data.view.qrFileName).attr('href',this.$qr.find('canvas')[0].toDataURL("image/png").replace("image/png","image/octet-stream"));
  this.$mail.attr('href',`mailto:`);//mailto:me@me.com?subject=Me&body=%3Chtml%20xmlns%3D%22http:%2F%2Fwww.w3.or
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
  this.$el.toggleClass(data.view.shownCls,this.shown=!this.shown);
  app.get('aggregator').trigger('sound','btn');
  if(this.shown)
   app.get('aggregator').trigger('player:pause');
  app.get('aggregator').trigger('info:toggle',this.shown);
 },
 tab:function(e){
  let tab=e?$(e.currentTarget):this.$tabs.eq(0),
      ind=e?this.$tabs.index(tab):0;

  if(!tab.hasClass(data.view.shownCls))
  {
   if(e)
    app.get('aggregator').trigger('sound','btn');
   this.$tabs.removeClass(data.view.shownCls);
   this.$blocks.removeClass(data.view.shownCls);
   tab.addClass(data.view.shownCls);
   this.$blocks.eq(ind).addClass(data.view.shownCls);
   this.$blocks.eq(this.tabLen+ind).addClass(data.view.shownCls);
   setTimeout(()=>this.scrollBar.resize(),0);
  }
 },
 populate:function(r){
  this.$ach.html(this.achTemplate(r));
  setTimeout(()=>this.scrollBar.resize(),0);
  this.$achCtr.text(`${r.achievements.filter((o)=>!o.disabled).length}/${r.achievements.length}`);

  this.setCode(r.user.code);
 }
});