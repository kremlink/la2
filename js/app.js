import {app} from './bf/base.js';

import {Index} from './modules/index-page/view.js';

import {Bar} from './bf/lib/bar.js';
import {utils} from './bf/lib/utils.js';
//import {Toggle} from './bf/lib/toggle.js';
//------------------------
const dataApp=app.get('helpers.html').data('app'),
      modules=dataApp.modules;

function iOS(){
 return [
   'iPad Simulator',
   'iPhone Simulator',
   'iPod Simulator',
   'iPad',
   'iPhone',
   'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  ||(navigator.userAgent.includes("Mac")&&"ontouchend" in document)
}
//------------------------
app.set({dest:'objects.aggregator',object:_.extend({},Backbone.Events)});

//main index page; could be more
if(~modules.indexOf('index'))
{
 app.init({
  //plugins:[Toggle],
  plugins:[Bar,{object:utils,name:'utils'}],
  settings:{}
 });

 app.set({dest:'objects.epIndex',object:dataApp.index});

 if(iOS())
  app.get('helpers.html').addClass('iOS');

 //app.set({dest:'objects._dev-sound',object:true});//TODO:remove
 //app.set({dest:'objects._dev-player',object:true});//TODO:remove
//app.set({dest:'objects.isPomoi',object:/iPad|iPhone|iPod/.test(navigator.platform)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)});

 $(()=>{
  app.set({dest:'objects.scrollDim',object:-Math.abs(utils.scrollDim()+1)});
  new Index({app:app});
 });
}