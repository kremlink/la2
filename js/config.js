export let config={
 metrika:{name:1},
 ls:{
  name:'la-vid3',
  url:'php.php?data='
 },
 'index':{
  preload:{
   '1':{
    'images/':{imgs:['blood.svg','achiv-bg.svg']},
    'images/learn/':{
     imgs:['study-arrow.svg','study-save.png'],
     j:[4],
     tmpl:['study-bg[j].jpg']
    },
    'images/1-23/':{imgs:['1-23-bg.jpg']},
    'images/1-25/':{
     imgs:['1-25-bg.jpg','1-25-arrows.svg','1-25-intro-pic.png','1-25-intro-pic-m.png','add-bg.svg','point-empty.svg','point-full.svg'],
     j:[9],
     tmpl:['1-25-obj[j].png']
    },
    'images/1-30/':{
     imgs:['1-30-bg.jpg','1-30-intro-pic.png','1-30-intro-pic-m.png','1-30-icon-foot.svg','1-30-icon-gear.svg','1-30-icon-map.svg'],
     j:[17],
     tmpl:['card[j].png']
    }
   },
   '2':{
    'images/':{imgs:['blood.svg','achiv-bg.svg']},
    'images/2-7/':{imgs:['2-7-bg1.jpg','2-7-bg2.jpg','2-7-bigframe.svg','2-7-botframe.svg','2-7-intro-pic.png','2-7-intro-pic-m.png','2-7-ring-in.svg','2-7-ring-out.svg','2-7-table.svg','2-7-topframe.svg','2-7-two-digit-focus.svg']},
    'images/2-25/':{
     imgs:['2-25-bg.jpg','map.svg','2-25-intro-pic.png','2-25-intro-pic-m.png'],
     j:[6],
     tmpl:['over[j].svg']
    },
    'images/2-28/':{
     imgs:['2-28-lost-bg.jpg','2-28-overlay.jpg','2-28-intro-pic.png','2-28-intro-pic-m.png','3b.svg','3c.svg','3l1.svg','3l2.svg','3r1.svg','3r2.svg','3ß.svg','4b.svg','4c.svg','4l.svg','4r.svg']
    },
    'images/2-39/':{
     imgs:['2-39-bg.jpg','2-39-intro-pic.png','2-39-intro-pic-m.png']
    }
   },
   '3':{
    'images/':{imgs:['blood.svg','achiv-bg.svg']},
    'images/3-15/':{imgs:['bg.jpg','3-15-close.svg','3-15-intro-pic.png','3-15-intro-pic-m.png','3-15-scroll.png','3-15-topline.svg']},
    'images/3-15-1/':{
     imgs:['img_0.jpg'],
     j:[8],
     tmpl:['img_[j].jpg']
    },
    'images/3-17/':{
     imgs:['3-17-bg.jpg','3-17-iintro-pic.png','3-17-intro-pic-m.png'],
     j:[10],
     tmpl:['img[j].jpg']
    }
   },
   '4':{
    'images/':{imgs:['blood.svg','achiv-bg.svg']},
    'images/4-4/':{imgs:['bg.jpg']},
    'images/4-6/':{
     imgs:['bg.jpg']
    },
    'images/4-31/':{
     imgs:['4-31-bg.jpg','4-31-map.svg']
    }
   },
  }
 },
 sound:{
  template:'<audio src="../sounds/<%= src %>.mp3" preload="auto" <%= loop?"loop":"" %>></audio>'
  //template:'<audio src="https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/season2/base-mp3/<%= src %>.mp3" preload="auto" <%= loop?"loop":"" %>></audio>'//TODO:this
 },
 redirect:{
  '1':'end1.php',
  '2':'end2.php',
  '3':'end3.php',
  '4':'end4.php'
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
    label:'480P'
   }
  ],
  srcData:{
   spec:['1080p','720p','480p'],
   tmpl:'../<%= src %>.mp4'
   //tmpl:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/season2/episode<%= src %>/mp4/ng2_master_<%= src %>ser<%= spec %>.mp4'//TODO:this
  },
  data:{
   '1':{
    //src:'1',
    src:'oceans',
    timecodes:[
     //{start:1,back:.9,invoked:false,checkpoint:true,data:{interactive:'checkpoint1',achievement:'Ачивка1 прокнула с чекпоинта'}},
     {start:.2,back:.2,invoked:false,data:{interactive:'Learn'}},
     //{start:3,end:4,back:2.5,invoked:false,data:{interactive:'Fork',alt:2}},
     //{start:6,end:7,back:5.5,invoked:false,data:{interactive:'Packing'}},
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
     //{start:1,end:2,back:1,invoked:false,data:{interactive:'Ring'}},
     //{start:3,end:4,back:3,invoked:false,data:{interactive:'Qs'}},
     //{start:5,end:6,back:5,invoked:false,data:{interactive:'Labyrinth'}},
     {start:1,end:8,back:7,invoked:false,data:{interactive:'Fix'}}
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
     {start:1,end:2,back:1,invoked:false,data:{interactive:'Loop'}},
     {start:3,end:4,back:3,invoked:false,data:{interactive:'Browser'}},
     {start:5,end:6,back:5,invoked:false,data:{interactive:'Qs1'}}
     /*{start:800.36,end:800.88,back:800,invoked:false,data:{interactive:'Loop'}},
     {start:801.36,end:801.4,back:801,invoked:false,data:{interactive:'Browser'}},
     {start:1333.96,end:1335,back:1333.4,invoked:false,data:{interactive:'Qs1'}}*/
    ]
   },
   '4':{
    //src:'4',
    src:'oceans',
    timecodes:[
     {start:1,end:2,back:1,invoked:false,data:{interactive:'Qs',item:{h:'Пешие поисковики осмотрели реку.<br />к счастью, тело не найдено.<br /><br />Продолжай поиски.',text:''}}},
     {start:3,end:4,back:3,invoked:false,data:{interactive:'Fork',alt:3,diff:true}},
     {start:5,end:6,back:5,invoked:false,data:{interactive:'Tablets'}}
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