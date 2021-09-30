export const data={
 events:{
  'click':'.btn'
 },
 view:{
  el:'.ov-wrap.labyrinth',
  vid:'video',
  into:'.into',
  $smooth:'.smooth',
  tmpl:'#i-2-28-template'
 },
 vidSrc:{
  tmpl:'https://naidenzhiv-cache.cdnvideo.ru/naidenzhiv/season2/episode<%= epIndex %>/int-mp4/<%= src %>.mp4',
  //tmpl:'../videos/<%= src %>.mp4',
  'src':{
   '1080P':'2-28-lost-1080',
   '720P':'2-28-lost-720',
   '480P':'2-28-lost-480'
  }
 },
 before:500,
 forks:{
  "4c":{
   ovl:{left:0,top:0},
   btns:[{start:0,end:2.88,left:22.01,top:33.96,go:"4b"},{start:16,end:18.88,left:52.24,top:18.96,go:"3c"},{start:20,end:22.88,left:23.54,top:17.24,go:"4l"},{start:24,end:26.88,left:80.47,top:29.06,go:"4r"}]
  },
  "4b":{
   ovl:{left:-2,top:7},
   btns:[{start:4,end:6.88,left:28.54,top:20.04,go:"4c"},{start:8,end:10.88,left:42.19,top:22.08,go:"3b"},{start:12,end:14.88,left:15.73,top:22.08,go:"4l"},{start:116,end:118.88,left:62.76,top:36.3,go:"4r"}]
  },
  "4l":{
   ovl:{left:-23,top:-5},
   btns:[{start:28,end:30.88,left:6.46,top:22.55,go:"4b"},{start:32,end:34.88,left:46.35,top:21.03,go:"4c"},{start:36,end:38.88,left:12.4,top:4.73,go:"3l2"}]
  },
  "4r":{
   ovl:{left:23,top:0},
   btns:[{start:40,end:42.88,left:81.77,top:37.97,go:"4b"},{start:44,end:46.88,left:58.07,top:24.22,go:"4c"},{start:48,end:50.88,left:73.39,top:18.69,go:"3r2"}]
  },
  "3b":{
   ovl:{left:-2,top:10},
   btns:[{start:52,end:54.88,left:30.78,top:21.98,go:"3c"},{start:56,end:58.88,left:16.15,top:25.59,go:"3l1"},{start:60,end:62.88,left:59.69,top:40.1,go:"3r1"},{start:64,end:66.88,left:43.23,top:22.81,go:"4b"}]
  },
  "3c":{
   ovl:{left:0,top:0},
   btns:[{start:68,end:70.88,left:21.77,top:40,go:"3b"},{start:72,end:74.88,left:54.71,top:22.5,go:"4c"}]
  },
  "3l1":{
   ovl:{left:-17,top:0},
   btns:[{start:76,end:78.88,left:17.76,top:31.85,go:"3b"},{start:80,end:82.88,left:8.03,top:14.19,go:"3l2"},{start:84,end:86.88,left:1.79,top:23.08,go:"3l1"}]
  },
  "3l2":{
   ovl:{left:-12,top:-3},
   btns:[{start:88,end:90.88,left:17.97,top:27.4,go:"3l1"},{start:92,end:34.88,left:23.85,top:9.9,go:"4l"}]
  },
  "3r1":{
   ovl:{left:19,top:6},
   btns:[{start:96,end:98.88,left:63.13,top:39.53,go:"3b"},{start:100,end:102.88,left:89.43,top:39.53,finish:true},{start:104,end:106.88,left:88.39,top:26.88,go:"3r2"}]
  },
  "3r2":{
   ovl:{left:17,top:1},
   btns:[{start:108,end:110.88,left:79.11,top:41.82,go:"3r1"},{start:112,end:114.88,left:79.11,top:20.68,go:"4r"}]
  }
 }
};
