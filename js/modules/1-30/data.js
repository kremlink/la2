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
  {yep:true,text:'Semen, авто. Выезд от Красногвардейской, 3 места.',err:'При полюбом поиске чем больше людей, тем лучше.',audio:'voice1',mini:{index:4,type:'foot'}},
  {text:'Сорри ребят, в душе я с вами.',err:'К сожалению, погряз в пробках.',audio:'voice0'},
  {yep:true,text:'Оболенская, выезжаю из Балашихи, авто 3 места. При стопе позвоните.',err:'При полюбом поиске чем больше людей, тем лучше.',audio:'voice3',mini:{index:2,type:'foot'}},
  {text:'Беды не случаются по отдельности, иногда люди заняты другими поисками.',err:'Surprise, выезжаю на другой поиск через 15 минут.',audio:'voice0'},
  {yep:true,text:'Ежик с котомкой и Bigden готовы стартовать от метро Орехово.',err:'При полюбом поиске чем больше людей, тем лучше.',audio:'voice5',mini:{index:8,type:'foot'}},
  {yep:true,text:'Это Vert. Буду ко времени штаба, есть 4 места для пеших.',err:'Да куда ж ты от меня денешься, я же здесь.',audio:'voice6',mini:{index:5,type:'foot'}},
  {text:'Очень жаль, но не в этот раз',err:'К сожалению, сегодня никак не смогу, полный завал с работой, но мысленно с вами.',audio:'voice0'},
  {yep:true,text:'Тамада, готов на авто, подберу пеших. Три места свободных.',err:'При полюбом поиске чем больше людей, тем лучше.',audio:'voice8',mini:{index:7,type:'foot'}},
  {yep:true,text:'БОБ, готов, выдвигаюсь.',err:'Ага, вы пойдёте, а я тут останусь песенки петь?',mini:{index:6,type:'foot'}},
  {yep:true,text:'Картошкин, готова, выдвигаюсь вместе с БОБом.',err:'Теперь никаких праздников',mini:{index:9,type:'map'}},
  {yep:true,text:'Passiflora, экипаж, 2 места. Стартую через час от метро Домодедовская.',err:'При любом поиске чем больше людей, тем лучше.',audio:'voice11',mini:{index:3,type:'foot'}},
  {yep:true,text:'Камбоджо, выдвигаюсь. 2-3 места свободных есть.',err:'При полюбом поиске чем больше людей, тем лучше.',audio:'voice12',mini:{index:1,type:'foot'}},
  {text:'К сожалению, не все всегда доступны, нужно больше добровольцев.',err:'Абонент временно недоступен.',audio:'voice0'},
  {text:'Иногда реальность против нас',err:'Джимни, нахожусь в Зеленограде. По картам сплошные пробки, не успею в разумные сроки.',audio:'voice0'},
  {text:'Иногда отдыхают даже герои',err:'К сожалению, сейчас в отпуске, в другой раз, ребят.',audio:'voice0'},
  {yep:true,text:'Леший, готов, беру руководство на себя.',err:'Я обязан быть там.',mini:{index:10,type:'gear'}},
  {yep:true,text:'Сашка, готова, буду инфоргом на поиске.',err:'Я не оставлю его одного.',mini:{index:11,type:'gear'}}
 ],
 beforeCards:500,
 wait:500
};
