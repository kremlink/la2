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
   //tmpl:'videos/<%= spec %>/<%= src %>.mp4'
  },
  data:{
   '1':{
    src:'oceans',
    timecodes:[
     //{start:.2,back:0.5,invoked:false,data:{interactive:'Fork',alt:3}}//,
     //{start:.2,back:0.5,invoked:false,data:{interactive:'Packing'}}
     {start:.2,back:0.5,invoked:false,data:{interactive:'Team'}}
    ]
   }//[noAutoClose:true|repeatable:true|delayedPause:-1|noVidAutoPlay:true|]checkpoint:true|iniTimer:true
  }
 },
 interactives:{

 }
};