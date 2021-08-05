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
   pause:1,
   go:1.6
  },
  enableCls:'enable',
  miniCont:{
   item:'.mini',
   tmpl:'<div />'
  },
  item:{
   cont:'.into',
   tmpl:'#i-1-30-item-template',
   lCls:'item-l',
   rCls:'item-r',
   putLCls:'putL',
   putRCls:'putR',
   errCls:'err',
   fakeTrs:'text-indent',
   showTrs:'opacity'
  },
  desc:'.i-desc',
  lottie:{
   no:'.left .l',
   yes:'.right .l'
  }
 },
 items:[
  {yep:true,err:'Неверно1',mini:{index:2,type:2}},
  {err:'Неверно2',mini:{index:0,type:0}},
  {err:'Неверно3',mini:{index:3,type:3}},
  {yep:true,err:'Неверно4',mini:{index:1,type:1}}
  ],
 beforeCards:500,
 wait:500
};
