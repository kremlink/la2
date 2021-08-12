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
   go:2
  },
  enableCls:'enable',
  miniCont:'.mini',
  yepTmpl:'#i-1-30-mini-template',
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
  {yep:true,err:'Неверно1',mini:{index:3,type:'foot'}},
  {err:'Неверно2'},
  {err:'Неверно3'},
  {err:'Неверно4'},
  {yep:true,err:'Неверно5',mini:{index:5,type:'foot'}},
  {err:'Неверно6'},
  {yep:true,err:'Неверно7',mini:{index:9,type:'phone'}},
  {yep:true,err:'Неверно8',mini:{index:2,type:'foot'}},
  {err:'Неверно9'},
  {yep:true,err:'Неверно10',mini:{index:4,type:'foot'}},
  {yep:true,err:'Неверно11',mini:{index:1,type:'foot'}},
  {err:'Неверно12'},
  {yep:true,err:'Неверно13',mini:{index:7,type:'foot'}},
  {yep:true,err:'Неверно14',mini:{index:8,type:'map'}},
  {err:'Неверно15'},
  {err:'Неверно16'},
  {yep:true,err:'Неверно17',mini:{index:6,type:'foot'}}
  ],
 beforeCards:500,
 wait:500
};
