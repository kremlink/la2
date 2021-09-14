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
  {yep:true,err:'Semen, авто. Выезд от Красногвардейской, 3 места.',mini:{index:4,type:'foot'}},
  {err:'ПаЛех погряз в пробках, сорри.'},
  {yep:true,err:'Оболенская, выезжаю из Балашихи, авто 3 места. При стопе позвоните.',mini:{index:2,type:'foot'}},
  {err:'Surprise, выезжаю на другой поиск через 15 минут.'},
  {yep:true,err:'Ежик с котомкой и Bigden, готовы стартовать от метро Орехово.',mini:{index:8,type:'foot'}},
  {yep:true,err:'Это Vert. Буду ко времени штаба, есть 4 места для пеших.',mini:{index:5,type:'foot'}},
  {err:'К сожалению, сегодня никак не смогу, полный завал с работой, но мысленно с вами.'},
  {yep:true,err:'Тамада, готов на авто, подберу пеших. Три места свободных.',mini:{index:7,type:'foot'}},
  {yep:true,err:'БОБ, готов, выдвигаюсь.',mini:{index:6,type:'foot'}},
  {yep:true,err:'Картошкин, готова, выдвигаюсь вместе с БОБом.',mini:{index:9,type:'map'}},
  {yep:true,err:'Passiflora, экипаж, 2 места. Стартую через час от метро Домодедовская.',mini:{index:3,type:'foot'}},
  {yep:true,err:'Камбоджо, выдвигаюсь. 2-3 места свободных есть.',mini:{index:1,type:'foot'}},
  {err:'Абонент временно недоступен'},
  {err:'Джимни, нахожусь Зеленограде. По картам сплошные пробки, не успею в разумные сроки.'},
  {err:'Olexandra, в отпуске, в другой раз ребят.'},
  {yep:true,err:'Леший, готов, беру руководство на себя.',mini:{index:10,type:'gear'}},
  {yep:true,err:'Сашка, готова, буду инфоргом на поиске.',mini:{index:11,type:'gear'}},
 ],
 beforeCards:500,
 wait:500
};
