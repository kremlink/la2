export const data={
 events:{
  'l':'.left',
  'r':'.right',
  'circle':'.circle'
 },
 view:{
  el:'.ov-wrap.packing',
  $ctr:'.r-ctr span',
  ctrTmpl:'<%= curr %>/<%= amt %>',
  item:{
   cont:'.into',
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
   circle:'.circle .l'
  },
  score:{
   dots:'.s-dots',
   amt:'.s-amt',
   cls:['b1','b2','b3']
  },
  circle:{
   cont:'.ov-cont.phase2',
   tmpl:'#i-1-25-circle-template',
  }
 },
 items:[
  {h:'Аптечка',desc:'Описание вещи, всякие разные слова и знаки препинания',yep:true},
  {h:'Что-то еще1',desc:'Описание вещи1'},
  {h:'Что-то еще2',desc:'Описание вещи2'},
  {h:'Что-то еще3',desc:'Описание вещи3',yep:true}
  ],
 circles:{
  wait:1000,
  data:[
   {left:10,top:10},
   {left:20,top:20},
   {left:70,top:70}
  ]
 },
 beforePhase1:1000,
 points:{yes:1,no:-1,b1:2,b2:4,b3:7}
};
