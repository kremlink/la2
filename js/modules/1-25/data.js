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
   errCls:'err',
   fakeTrs:'text-indent',
   mainTrs:'opacity'
  },
  desc:'.i-desc',
  lottie:{
   no:'.left .l',
   yes:'.right .l',
   circle:'.circle .l'
  },
  circle:{
   cont:'.ov-cont.phase2',
   tmpl:'#i-1-25-circle-template',
   clickedCls:'clicked'
  }
 },
 items:[
  {yep:true,h:'Аптечка',desc:'Описание вещи, всякие разные слова и знаки препинания',err:'Неверно1'},
  {h:'Что-то еще1',desc:'Описание вещи1',err:'Неверно2'},
  {h:'Что-то еще2',desc:'Описание вещи2',err:'Неверно3'},
  {yep:true,h:'Что-то еще3',desc:'Описание вещи3',err:'Неверно4'}
  ],
 circles:{
  wait:1000,
  data:[
   {left:10,top:10},
   {left:20,top:20},
   {left:70,top:70},
   {left:40,top:10},
   {left:30,top:30},
   {left:10,top:60},
   {left:10,top:10}
  ]
 },
 beforePhase1:1000,
 away:1000,
 points:{yes:7,no:-5,b1:0.75}
};
