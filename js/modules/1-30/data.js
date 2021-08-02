export const data={
 events:{
  'l':'.left',
  'r':'.right'
 },
 view:{
  el:'.ov-wrap.team',
  $ctr:'.r-ctr span',
  ctrTmpl:'<%= curr %>/<%= amt %>',
  item:{
   cont:'.int .ov-cont',
   tmpl:'#i-1-30-item-template',
   lCls:'item-l',
   rCls:'item-r',
   putLCls:'putL',
   putRCls:'putR',
   fakeTrs:'text-indent',
  },
  lottie:{
   no:'.left .l',
   yes:'.right .l'
  }
 },
 items:[1,0,0,1],
 wait:1000
};
