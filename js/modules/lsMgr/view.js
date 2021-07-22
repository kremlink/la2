import {data as dat} from './data.js';

let app,
    data=dat,
    epIndex;

export let LsMgr=Backbone.View.extend({
 initialize:function(opts){
  app=opts.app;
  data=app.configure({ls:dat}).ls;

  epIndex=app.get('epIndex');

  if(!localStorage.getItem(data.name))
  {
   this.resetData(true);
  }else
  {
   let ls=this.getData();

   if(!ls.data[epIndex])
    ls.data[epIndex]={interactive:-1};

   this.setData(ls);
  }
 },
 resetData:function(resetUser=false){
  if(resetUser)
  {
   localStorage.setItem(data.name,JSON.stringify({
    user:{},
    data:{[epIndex]:{interactive:-1}}
   }));
  }else
  {
   let ls=this.getData();

   ls.data[epIndex]={interactive:-1};
   this.setData(ls);
  }
 },
 getData:function(){
  return JSON.parse(localStorage.getItem(data.name));
 },
 setData:function(ls){
  localStorage.setItem(data.name,JSON.stringify(ls));
 }
});