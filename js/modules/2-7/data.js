export const data={
 events:{
  'ringLArr':'.l-arr',
  'ringRArr':'.r-arr',
  'dateTArr':'.t-arr',
  'dateBArr':'.b-arr',
  'td':'.t-td:not(.top):not(.left)'
 },
 view:{
  el:'.ov-wrap.ring',
  ringLottie:'.rings .l',
  rotator:'.r-in',
  text:'.n-text',
  $prog:'.the-prog',
  nLottie:'.d1 .roller .l,.d3 .roller .l',
  digits:'.d1 .ph:not(.empty)',
  topDigits:'.d2 .ph:not(.empty)',
  botDigits:'.d3 .ph:not(.empty)',
  table:{
   item:'.table .into',
   tmpl:'#i-2-7-table-template'
  }
 },
 before:1500,
 textData:['РДИУ','СДЙТШЯЮ','ГЯСЯ'],
 ringWin:-1,
 ringInt:100,
 iniDigit:0,
 ifSameDigit:5,
 progWait:500,
 table:{rows:4,cols:10}
};
