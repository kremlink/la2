export const data={
 events:{
  'click':'.caller',
  'close':'.p-bg,.close'
 },
 view:{
  el:'.ov-wrap.browser',
  tmpl:'#i-3-15-template',
  tTmpl:'<%= month %> <%= date %> <span><%= hour %>:<%= minute %></span>',
  time:'.time',
  cont:'.container',
  popsCont:'.pops',
  pops:'.pop'
 },
 before:1500,
 items:[
  {left:28,top:20,width:7,height:7},
  {left:15,top:50,width:10,height:7,yep:true},
  {left:31,top:56,width:10,height:21}
 ]
};
