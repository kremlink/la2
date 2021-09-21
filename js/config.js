export let config={
 metrika:{name:64365469},
 ls:{
  name:'la-vid3',
  url:'php.php?data='
 },
 'index':{
  preload:{
   '1':{
    /*'images/':{imgs:['question-photo.png','map-bg2.png']},
    'images/packing/':{j:[12,8,5],tmpl:['packing-[i]-[j].png','packing-[i]-[j]-p.png']}*/
   }
  }
 },
 sound:{
  template:'<audio src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/season2/base-mp3/<%= src %>.mp3" preload="auto" <%= loop?"loop":"" %>></audio>'
 },
 redirect:{
   '1':'end.php'
  },
 'player':{
  quality:[
   {
    width:'(min-width:1600px)',
    label:'1080P'
   },
   {
    width:'(min-width:1280px) and (max-width:1599px)',
    label:'720P'
   },
   {
    width:'(max-width:1279px)',
    label:'360P'
   }
  ],
  srcData:{
   spec:['1080p','720p','480p'],
   tmpl:'../<%= src %>.mp4'
   //tmpl:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/season2/episode<%= src %>/mp4/ng2_master_<%= src %>ser<%= spec %>.mp4'
  },
  data:{
   '1':{
    //src:'1',
    src:'oceans',
    timecodes:[
     //{start:1,back:.9,invoked:false,checkpoint:true,data:{interactive:'checkpoint1',achievement:'Ачивка1 прокнула с чекпоинта'}},
     {start:1,end:2,back:1,invoked:false,data:{interactive:'Fork',alt:2}},
     //{start:3,end:4,back:3,invoked:false,data:{interactive:'Packing'}},
     //{start:5,end:6,back:5,invoked:false,data:{interactive:'Team'}}
     /*{start:1043.48,end:1044.52,noBg:true,back:1043,invoked:false,data:{interactive:'Fork',alt:1095.92}},
     {start:1412.68,end:1413.68,back:1412,invoked:false,data:{interactive:'Packing'}},
     {start:1650.24,end:1651.36,back:1649.8,invoked:false,data:{interactive:'Team'}}*/
    ]
   },//[noAutoClose:true|repeatable:true|delayedPause:-1|noVidAutoPlay:true|]checkpoint:true|iniTimer:true
   '2':{
    //src:'2',
    src:'oceans',
    timecodes:[
     /*{start:1,end:2,back:1,invoked:false,data:{interactive:'Ring'}},
     {start:3,end:4,back:3,invoked:false,data:{interactive:'Qs'}},
     {start:5,end:6,back:5,invoked:false,data:{interactive:'Labyrinth'}},
     {start:7,end:8,back:7,invoked:false,data:{interactive:'Fix'}}*/
     /*{start:459.76,end:460.8,back:459,invoked:false,data:{interactive:'Ring'}},
     {start:1185.44,end:1186.48,back:1185,invoked:false,data:{interactive:'Qs'}},
     {start:1361.36,end:1362.4,back:1361,invoked:false,data:{interactive:'Labyrinth'}},
     {start:1784.28,end:1785.32,back:1783.8,invoked:false,data:{interactive:'Fix'}}*/
    ]
   },
   '3':{
    //src:'3',
    src:'oceans',
    timecodes:[
     /*{start:1,end:2,back:1,invoked:false,data:{interactive:'Loop'}},
     {start:3,end:4,back:3,invoked:false,data:{interactive:'Browser'}},
     {start:5,end:6,back:5,invoked:false,data:{interactive:'Qs1'}}*/
     /*{start:800.36,end:800.88,back:800,invoked:false,data:{interactive:'Loop'}},
     {start:801.36,end:801.4,back:801,invoked:false,data:{interactive:'Browser'}},
     {start:1333.96,end:1335,back:1333.4,invoked:false,data:{interactive:'Qs1'}}*/
    ]
   },
   '4':{
    //src:'4',
    src:'oceans',
    timecodes:[
     /*{start:1,end:2,back:1,invoked:false,data:{interactive:'Qs',item:{h:'Пешие поисковики осмотрели реку.<br />к счастью, тело не найдено.<br /><br />Продолжай поиски.',text:''}}},
     {start:3,end:4,back:3,invoked:false,data:{interactive:'Fork',alt:3,diff:true}},
     {start:5,end:6,back:5,invoked:false,data:{interactive:'Tablets'}}*/
     /*{start:335.6,end:336.6,back:335,invoked:false,data:{interactive:'Tablets'}},
     {start:393.2,end:394.24,back:392.7,invoked:false,data:{interactive:'Fork',alt:404.12,diff:true}},
     {start:1617.32,end:1618.32,back:1616.9,invoked:false,data:{interactive:'Qs',item:{h:'Ищем дальше',text:''}}}*/
    ]
   }
  }
 },
 interactives:{

 }
};