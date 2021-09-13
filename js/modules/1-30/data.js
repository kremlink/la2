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
  {yep:true,err:'Semen',mini:{index:4,type:'foot'}},
  {err:'ПаЛех'},
  {yep:true,err:'Оболенская',mini:{index:2,type:'foot'}},
  {err:'Surprise'},
  {yep:true,err:'Ежик с котомкой',mini:{index:8,type:'foot'}},
  {yep:true,err:'Vert',mini:{index:5,type:'foot'}},
  {err:'Limonnik'},
  {yep:true,err:'Тамада',mini:{index:7,type:'foot'}},
  {yep:true,err:'БОБ',mini:{index:6,type:'foot'}},
  {yep:true,err:'Картошкин',mini:{index:9,type:'map'}},
  {yep:true,err:'Passiflora',mini:{index:3,type:'foot'}},
  {yep:true,err:'Камбоджо',mini:{index:1,type:'foot'}},
  {err:'Pshen'},
  {err:'Jimny'},
  {err:'Olexandra'},
  {yep:true,err:'Леший',mini:{index:10,type:'gear'}},
  {yep:true,err:'Сашка',mini:{index:11,type:'gear'}},
 ],
 beforeCards:500,
 wait:500
};
