export let config={
 metrika:{name:64365469},
 ls:{
  name:'la-vid',
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
  template:'<audio src="../sounds/<%= src %>.mp3" preload="auto" <%= loop?"loop":"" %>></audio>'
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
   spec:['1080','720','360'],
   tmpl:'../<%= src %>.mp4'
   //tmpl:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/season2/episode<%= src %>/mp4/<%= src %>-ser-prev.mp4'
   //tmpl:'videos/<%= spec %>/<%= src %>.mp4'
  },
  data:{
   '1':{
    src:'1',
    //src:'oceans',
    timecodes:[
     //{start:1,back:.9,invoked:false,checkpoint:true,data:{interactive:'checkpoint1',achievement:'Ачивка1 прокнула с чекпоинта'}},
     {start:1,end:1,back:.1,invoked:false,data:{interactive:'Fork',alt:2}},
     //{start:1,end:3,back:.2,invoked:false,data:{interactive:'Packing'}},
     //{start:2,end:4,back:0.1,invoked:false,data:{interactive:'Team'}}
     //{start:54.12,end:54.64,noBg:true,back:.1,invoked:false,data:{interactive:'Fork',alt:112.56}},
     //{start:186.92,end:187.44,back:.2,invoked:false,data:{interactive:'Packing'}},
     //{start:247.4,end:247.92,back:0.1,invoked:false,data:{interactive:'Team'}}
    ]
   },//[noAutoClose:true|repeatable:true|delayedPause:-1|noVidAutoPlay:true|]checkpoint:true|iniTimer:true
   '2':{
    src:'2',
    //src:'oceans',
    timecodes:[
     //{start:.2,end:1,back:.2,invoked:false,data:{interactive:'Ring'}},
     {start:2,end:3,back:.2,invoked:false,data:{interactive:'Qs'}},
     {start:4,end:5,back:.2,invoked:false,data:{interactive:'Labyrinth'}},
     {start:6,end:7,back:.2,invoked:false,data:{interactive:'Fix'}}
     /*{start:8.36,end:9.36,back:.2,invoked:false,data:{interactive:'Ring'}},
     {start:53.76,end:54.76,back:.2,invoked:false,data:{interactive:'Qs'}},
     {start:104.12,end:105.12,back:.2,invoked:false,data:{interactive:'Labyrinth'}},
     {start:131.28,end:132.28,back:.2,invoked:false,data:{interactive:'Fix'}}*/
    ]
   },
   '3':{
    //src:'3',
    src:'oceans',
    timecodes:[
     {start:1,end:2,back:.2,invoked:false,data:{interactive:'Loop'}},
     //{start:.1,end:4,back:.2,invoked:false,data:{interactive:'Browser'}},
     //{start:5,end:6,back:.2,invoked:false,data:{interactive:'Qs1'}}
     /*{start:20.92,end:20.96,back:.2,invoked:false,data:{interactive:'Loop'}},
     {start:21.88,end:21.92,back:.2,invoked:false,data:{interactive:'Browser'}},
     {start:56.2,end:57.2,back:.2,invoked:false,data:{interactive:'Qs1'}}*/
    ]
   },
   '4':{
    src:'4',
    //src:'oceans',
    timecodes:[
     {start:211.4,end:212.4,back:.2,invoked:false,data:{interactive:'Qs',item:{h:'Ищем дальше',text:''}}},
     {start:47.92,end:48.92,back:.1,invoked:false,data:{interactive:'Fork',alt:58.84,diff:true}},
     {start:186.72,end:187.72,back:.2,invoked:false,data:{interactive:'Tablets'}}
    ]
   }
  }
 },
 interactives:{

 }
};