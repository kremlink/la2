export const data={
 preload:{},
 waitBtn:1500,
 events:{
  'start':'.start-pop .start',
  'clr':'.clr',
  'goOn':'.continue'
 },
 view:{
  el:'#wrap',
  loadedCls:'loaded',
  tooSmallCls:'too-small',
  startCls:'start',
  //fsCls:'fs',
  timerCls:'timer',
  pauseCls:'paused',
  nopeCls:'nope',
  goOnCls:'goOn'
 },
 minViewport:600,
 pcViewport:'(min-width:1024px)'
};