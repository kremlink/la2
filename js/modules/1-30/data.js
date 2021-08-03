export const data={
 events:{
  'l':'.left',
  'r':'.right'
 },
 view:{
  el:'.ov-wrap.team',
  $ctr:'.r-ctr span',
  ctrTmpl:'<%= curr %>/<%= amt %>',
  vid:{
   item:'.emerge',
   pause:.9,
   go:1.5
  },
  enableCls:'enable',
  item:{
   cont:'.into',
   tmpl:'#i-1-30-item-template',
   lCls:'item-l',
   rCls:'item-r',
   putLCls:'putL',
   putRCls:'putR',
   fakeTrs:'text-indent',
   showTrs:'opacity'
  },
  lottie:{
   no:'.left .l',
   yes:'.right .l'
  }
 },
 items:[1,0,0,1],
 beforeCards:500,
 wait:500
};
