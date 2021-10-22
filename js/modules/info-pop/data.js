export const data={
 events:{
  'caller':'.caller',
  'tab':'.tabs div',
  'copy':'.copy',
  'go':'.go',
  'mail':'.mail',
  'mailInput':'.mail-input'
 },
 view:{
  el:'.info-pop',
  block:'.block',
  shownCls:'shown',
  code:'.code span',
  codeInput:'.code-input',
  //errText:'.err-text',
  param:'code',
  errCls:'err',
  save:{
   codeHidden:'.code-hidden',
   vData:'valid',
   saveBtn:'.save',
   qr:'.qr',
   qrFileName:'nayden-jiv-qr.png',
   subj:'Код сохранения сериала НАЙДЕН_ЖИВ',
   body:'Ваш код: <%= code %>\r\nСсылка: <%= ref %>'
  },
  ach:{
   item:'.achievements',
   tmpl:'#info-ach-template',
   ctr:'.ach-ctr'
  }
 }
};