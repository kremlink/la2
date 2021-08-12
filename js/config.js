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
   //tmpl:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/season2/episode1/mp4/<%= src %>.mp4'
   //tmpl:'videos/<%= spec %>/<%= src %>.mp4'
  },
  data:{
   '1':{
    src:'1-ser-prev',
    timecodes:[
     //{start:1,back:.9,invoked:false,checkpoint:true,data:{interactive:'checkpoint1',achievement:'Ачивка1 прокнула с чекпоинта'}},
     //{start:1,end:1,back:.1,invoked:false,data:{interactive:'Fork',alt:2}},
     {start:1,end:3,back:.2,invoked:false,data:{interactive:'Packing'}},
     //{start:2,end:4,back:0.1,invoked:false,data:{interactive:'Team'}}
     //{start:54.12,end:54.64,noBg:true,back:.1,invoked:false,data:{interactive:'Fork',alt:112.56}},
     //{start:186.92,end:187.44,back:.2,invoked:false,data:{interactive:'Packing'}},
     //{start:247.4,end:247.92,back:0.1,invoked:false,data:{interactive:'Team'}}
    ]
   },
   '2':{
    src:'oceans',
    timecodes:[
     {start:.2,end:3,back:.2,invoked:false,data:{interactive:'Qs'}}
    ]
   }//[noAutoClose:true|repeatable:true|delayedPause:-1|noVidAutoPlay:true|]checkpoint:true|iniTimer:true
  }
 },
 interactives:{

 }
};