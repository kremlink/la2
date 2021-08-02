export const data={
 events:{
  'l':'.left',
  'r':'.right'
 },
 view:{
  el:'.ov-wrap.packing',
  $ctr:'.r-ctr span',
  ctrTmpl:'<%= curr %>/<%= amt %>',
  item:{
   cont:'.int .ov-cont.phase1',
   tmpl:'#i-1-25-item-template',
   lCls:'item-l',
   rCls:'item-r',
   putLCls:'putL',
   putRCls:'putR',
   fakeTrs:'text-indent',
  },
  lottie:{
   no:'.left .l',
   yes:'.right .l',
   circle:'.circle'
  },
  score:{
   dots:'.s-dots',
   amt:'.s-amt',
   cls:['b1','b2','b3']
  }
 },
 items:[
  {h:'Аптечка',desc:'Описание вещи, всякие разные слова и знаки препинания',yep:true},
  {h:'Что-то еще1',desc:'Описание вещи1'},
  {h:'Что-то еще2',desc:'Описание вещи2'},
  {h:'Что-то еще3',desc:'Описание вещи3',yep:true}
  ],
 wait:1000
};
