// -----------------------------------------------------
// Title: Skip to Options User script
// version: 2.0.4
// Date: 2019-07-30
// Author: PayPal Accessibility Team and University of Illinois
// Homepage: https://github.com/paypal/skipto
// Copyright (c) 2019 PayPal Accessibility Team and University of Illinois
// -----------------------------------------------------
//
// ==UserScript==
// @name skipto
// @namespace skipto
// @description This plugin provides a dynamically-generated drop-down menu that allows keyboard and screen reader users to quickly skip to the most important places on the webpage.
// @include *
// ==/UserScript==

/*! skipto - v2.0.4 - 2019-07-30
* https://github.com/paypal/skipto
* Copyright (c) 2019 PayPal Accessibility Team and University of Illinois; Licensed BSD */
 /*@cc_on @*/
/*@if (@_jscript_version >= 5.8) @*/

"undefined"==typeof document||"classList"in document.createElement("a")||function(view){"use strict";if("HTMLElement"in view||"Element"in view){var elemCtrProto=(view.HTMLElement||view.Element).prototype,objCtr=Object,strTrim=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},arrIndexOf=Array.prototype.indexOf||function(item){for(var i=0,len=this.length;i<len;i++)if(i in this&&this[i]===item)return i;return-1},DOMEx=function(type,message){this.name=type,this.code=DOMException[type],this.message=message},checkTokenAndGetIndex=function(classList,token){if(""===token)throw new DOMEx("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(token))throw new DOMEx("INVALID_CHARACTER_ERR","String contains an invalid character");return arrIndexOf.call(classList,token)},ClassList=function(elem){for(var trimmedClasses=strTrim.call(elem.className),classes=trimmedClasses?trimmedClasses.split(/\s+/):[],i=0,len=classes.length;i<len;i++)this.push(classes[i]);this._updateClassName=function(){elem.className=this.toString()}},classListProto=ClassList.prototype=[],classListGetter=function(){return new ClassList(this)};if(DOMEx.prototype=Error.prototype,classListProto.item=function(i){return this[i]||null},classListProto.contains=function(token){return-1!==checkTokenAndGetIndex(this,token+="")},classListProto.add=function(){for(var token,tokens=arguments,i=0,l=tokens.length,updated=!1;-1===checkTokenAndGetIndex(this,token=tokens[i]+"")&&(this.push(token),updated=!0),++i<l;);updated&&this._updateClassName()},classListProto.remove=function(){var tokens=arguments,i=0,l=tokens.length,updated=!1;do{var index=checkTokenAndGetIndex(this,tokens[i]+"");-1!==index&&(this.splice(index,1),updated=!0)}while(++i<l);updated&&this._updateClassName()},classListProto.toggle=function(token,forse){token+="";var result=this.contains(token),method=result?!0!==forse&&"remove":!1!==forse&&"add";return method&&this[method](token),!result},classListProto.toString=function(){return this.join(" ")},objCtr.defineProperty){var classListPropDesc={get:classListGetter,enumerable:!0,configurable:!0};try{objCtr.defineProperty(elemCtrProto,"classList",classListPropDesc)}catch(ex){-2146823252===ex.number&&(classListPropDesc.enumerable=!1,objCtr.defineProperty(elemCtrProto,"classList",classListPropDesc))}}else objCtr.prototype.__defineGetter__&&elemCtrProto.__defineGetter__("classList",classListGetter)}}(self),Window.prototype.addEventListener||(HTMLDocument.prototype.addEventListener=Element.prototype.addEventListener=Window.prototype.addEventListener=function(type,fCallback,capture){var modtypeForIE="on"+type;if(capture)throw new Error("This implementation of addEventListener does not support the capture phase");var nodeWithListener=this;this.attachEvent(modtypeForIE,function(e){Object.defineProperty(e,"currentTarget",{get:function(){return nodeWithListener}}),Object.defineProperty(e,"eventPhase",{get:function(){return e.srcElement==nodeWithListener?2:3}});var time=new Date;Object.defineProperty(e,"timeStamp",{get:function(){return time}}),"function"==typeof fCallback&&fCallback.call(nodeWithListener,e)})},Object.defineProperty(Event.prototype,"target",{get:function(){return this.srcElement}}),Event.prototype.stopPropagation=function(){this.cancelBubble=!0},Event.prototype.preventDefault=function(){this.returnValue=!1}),document.getElementsByClassName||(document.getElementsByClassName=function(classNames){return classNames=String(classNames).replace(/^|\s+/g,"."),document.querySelectorAll(classNames)},Element.prototype.getElementsByClassName=document.getElementsByClassName),Array.prototype.indexOf||(Array.prototype.indexOf=function(searchElement){if(null==this)throw new TypeError;var t=Object(this),len=t.length>>>0;if(0==len)return-1;var n=0;if(1<arguments.length&&((n=Number(arguments[1]))!=n?n=0:0!=n&&n!=1/0&&n!=-1/0&&(n=(0<n||-1)*Math.floor(Math.abs(n)))),len<=n)return-1;for(var k=0<=n?n:Math.max(len-Math.abs(n),0);k<len;k++)if(k in t&&t[k]===searchElement)return k;return-1}),function(){"use strict";var Dropdown={};Dropdown.prototype={btn:null,prt:null,menu:null,wrap:"false",config:{callbacks:[],focusOnClick:"false"},setUpConfig:function(config){var i,idConfig;if("object"==typeof config.ids){for(i=0;i<config.ids.length;i+=1)"object"==typeof(idConfig=config.ids[i])&&idConfig.callback&&(this.config.callbacks[idConfig.id]=idConfig.callback);this.config.focusOnClick=config.focusOnClick}},clearMenus:function(){var self=this;setTimeout(function(){self.prt.classList.contains("open")&&!self.prt.contains(document.activeElement)&&(self.prt.classList.remove("open"),self.btn.setAttribute("aria-expanded","false"))},150)},initOptList:function(e){this.btn=e.target,this.prt=this.btn.parentNode,this.menu=document.getElementById(this.btn.getAttribute("data-target")),this.toggleOptList()},toggleOptList:function(){void 0!==this.btn.getAttribute("data-wrap")&&(this.wrap=this.btn.getAttribute("data-wrap")),this.prt.classList.toggle("open"),this.prt.classList.contains("open")?this.btn.setAttribute("aria-expanded","true"):this.btn.setAttribute("aria-expanded","false");try{this.menu.getElementsByTagName("a")[0].focus()}catch(err){}},navigateMenus:function(e){var keyCode=e.keyCode||e.which,arrow_up=38,arrow_esc=27,arrow_down=40,isActive=this.prt.classList.contains("open"),items=this.menu.getElementsByTagName("a"),index=Array.prototype.indexOf.call(items,e.target);if(/(32|38|40|27)/.test(keyCode)){switch(e.preventDefault(),keyCode){case arrow_down:index+=1;break;case arrow_up:index-=1;break;case arrow_esc:if(isActive)return this.btn.click(),void this.btn.focus()}index<0&&(index="true"===this.wrap?items.length-1:0),index===items.length&&(index="true"===this.wrap?0:items.length-1),items.item(index).focus()}},executeCallback:function(e){var target,id=e.target.getAttribute("href").replace("#","");this.config.callbacks.hasOwnProperty(id)?(e.preventDefault(),this.config.callbacks[id](),this.toggleOptList()):"false"!==this.config.focusOnClick&&(e.preventDefault(),(target=document.getElementById(id)).tabIndex=0,target.focus(),target.scrollIntoView(!0),this.toggleOptList())},init:function(config){var toggleBtn,k,l,items,i,j,item,toggle=document.getElementsByClassName("dropMenu-toggle"),self=this;for(this.setUpConfig(config),k=0,l=toggle.length;k<l;k+=1)for(toggleBtn=toggle[k],items=document.getElementById(toggleBtn.getAttribute("data-target")).getElementsByTagName("a"),toggleBtn.addEventListener("click",function(e){self.initOptList(e)}),toggleBtn.addEventListener("keydown",function(e){var keyCode=e.keyCode||e.which;keyCode!==32&&keyCode!==40||(this.click(e),e.preventDefault())}),i=0,j=items.length;i<j;i+=1)(item=items[i]).addEventListener("keydown",function(e){self.navigateMenus(e)}),item.addEventListener("blur",function(e){self.clearMenus(e)}),item.addEventListener("click",function(e){self.executeCallback(e)})}},window.skipToDropDownInit=function(customConfig){Dropdown.prototype.init(customConfig||window.Drupal||window.Wordpress||window.SkipToConfig||{})}}(window.Drupal||window.Wordpress||window.SkipToConfig),function(){"use strict";var SkipTo={};SkipTo.prototype={headingElementsArr:[],landmarkElementsArr:[],idElementsArr:[],dropdownHTML:null,config:{buttonLabel:"Skip To...",buttonDivTitle:"Skip To Keyboard Navigation",buttonDivRole:"complementary",buttonDivLabel:"",menuLabel:"Skip To and Page Outline",landmarksLabel:"Skip To",headingsLabel:"Page Outline",contentLabel:" Content",main:'main, [role="main"]',landmarks:'[role="navigation"], [role="search"]',sections:"nav",headings:"h1, h2, h3",ids:"#SkipToA1, #SkipToA2",accessKey:"0",wrap:"false",focusOnClick:"false",hashOnMenu:"true",enumerateElements:"false",visibility:"onFocus",customClass:"",attachElement:document.body},setUpConfig:function(appConfig){var name,localConfig=this.config,appConfigSettings=void 0!==appConfig.settings?appConfig.settings.skipTo:{};for(name in appConfigSettings)localConfig.hasOwnProperty(name)&&(localConfig[name]=appConfigSettings[name])},init:function(appConfig){if(this.setUpConfig(appConfig),null!==document.getElementById("skipToMenu")){var existingMenu=document.getElementById("skipToMenu");existingMenu.parentNode.removeChild(existingMenu)}var htmlStr,div=document.createElement("div"),attachElement=this.config.attachElement.nodeType?this.config.attachElement:document.querySelector(this.config.attachElement);div.setAttribute("id","skipToMenu"),""!==this.config.buttonDivRole&&div.setAttribute("role",this.config.buttonDivRole),""!==this.config.buttonDivTitle&&div.setAttribute("title",this.config.buttonDivTitle),""!==this.config.buttonDivLabel&&div.setAttribute("aria-label",this.config.buttonDivLabel),this.addStyles(".skipTo{padding:.5em;position:absolute;background:transparent;color:#000;-webkit-transition:top .5s ease-out, background .5s linear;-moz-transition:top .5s ease-out, background .5s linear;-o-transition:top .5s ease-out, background .5s linear;transition:top .5s ease-out, background .5s linear}.skipTo:focus{position:absolute;top:0;left:0;background:#ccc;z-index:3000;text-decoration:underline;-webkit-transition:top .1s ease-in, background .3s linear;-moz-transition:top .1s ease-in, background .3s linear;-o-transition:top .1s ease-in, background .3s linear;transition:top .1s ease-in, background .3s linear}.onFocus{top:-5em;left:0}.onLoad{top:0 ;left:0;background:#ccc}.dropup,.dropMenu{position:relative}.dropMenu-toggle{*margin-bottom:-3px}.dropMenu-toggle:active,.open .dropMenu-toggle{outline:0}#skipToMenu .caret{display:inline-block;width:0;height:0;vertical-align:top;border-top:4px solid #000;border-right:4px solid transparent;border-left:4px solid transparent;content:'';pointer-events:none}#skipToMenu .dropMenu .caret{margin-top:8px;margin-left:2px}.dropMenu-menu{position:absolute;top:100%;left:0;z-index:3000;display:none;float:left;min-width:160px;padding:5px 0;margin:2px 0 0;list-style:none;background-color:#fff;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.2);*border-right-width:2px;*border-bottom-width:2px;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;-webkit-box-shadow:0 5px 10px rgba(0,0,0,0.2);-moz-box-shadow:0 5px 10px rgba(0,0,0,0.2);box-shadow:0 5px 10px rgba(0,0,0,0.2);-webkit-background-clip:padding-box;-moz-background-clip:padding;background-clip:padding-box}.dropMenu-menu.pull-right{right:0;left:auto}.dropMenu-menu .divider{*width:100%;height:1px;margin:9px 1px;*margin:-5px 0 5px;overflow:hidden;background-color:#e5e5e5;border-bottom:1px solid #fff}.dropMenu-menu>li>a{display:block;padding:3px 20px;clear:both;font-weight:normal;line-height:20px;color:#333;white-space:nowrap;text-decoration:none}.dropMenu-menu>li>a.po-h1{font-size:110%}.dropMenu-menu>li>a.po-h2{padding-left:28px}.dropMenu-menu>li>a.po-h3{padding-left:36px}.dropMenu-menu>li>a.po-h4{padding-left:44px}.dropMenu-menu>li>a.po-h5{padding-left:52px}.dropMenu-menu>li>a.po-6{padding-left:60px}.dropMenu-menu>li[role=separator]{padding-left:20px;margin-top:9px;font-weight:bold;border-bottom:thin solid black}.dropMenu-menu>li>a:hover,.dropMenu-menu>li>a:focus,.dropMenu-submenu:hover>a,.dropMenu-submenu:focus>a{text-decoration:none;color:#fff;background-color:#0081c2;background-image:-moz-linear-gradient(top, #08c, #0077b3);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#08c), to(#0077b3));background-image:-webkit-linear-gradient(top, #08c, #0077b3);background-image:-o-linear-gradient(top, #08c, #0077b3);background-image:linear-gradient(to bottom, #08c, #0077b3);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc', endColorstr='#ff0077b3', GradientType=0)}.dropMenu-menu>.active>a,.dropMenu-menu>.active>a:hover,.dropMenu-menu>.active>a:focus{color:#fff;text-decoration:none;outline:0;background-color:#0081c2;background-image:-moz-linear-gradient(top, #08c, #0077b3);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(#08c), to(#0077b3));background-image:-webkit-linear-gradient(top, #08c, #0077b3);background-image:-o-linear-gradient(top, #08c, #0077b3);background-image:linear-gradient(to bottom, #08c, #0077b3);background-repeat:repeat-x;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff0088cc', endColorstr='#ff0077b3', GradientType=0)}.dropMenu-menu>.disabled>a,.dropMenu-menu>.disabled>a:hover,.dropMenu-menu>.disabled>a:focus{color:#999}.dropMenu-menu>.disabled>a:hover,.dropMenu-menu>.disabled>a:focus{text-decoration:none;background-color:transparent;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled = false);cursor:default}.open{*z-index:3000}.open>.dropMenu-menu{display:block}.pull-right>.dropMenu-menu{right:0;left:auto}#skipToMenu .dropup .caret,#skipToMenu .navbar-fixed-bottom .dropMenu .caret{border-top:0;border-bottom:4px solid #000;content:''}#skipToMenu .dropup .dropMenu-menu,#skipToMenu .navbar-fixed-bottom .dropMenu .dropMenu-menu{top:auto;bottom:100%;margin-bottom:1px}.dropMenu-submenu{position:relative}.dropMenu-submenu>.dropMenu-menu{top:0;left:100%;margin-top:-6px;margin-left:-1px;-webkit-border-radius:0 6px 6px 6px;-moz-border-radius:0 6px 6px 6px;border-radius:0 6px 6px 6px}.dropMenu-submenu:hover>.dropMenu-menu{display:block}.dropup .dropMenu-submenu>.dropMenu-menu{top:auto;bottom:0;margin-top:0;margin-bottom:-2px;-webkit-border-radius:5px 5px 5px 0;-moz-border-radius:5px 5px 5px 0;border-radius:5px 5px 5px 0}.dropMenu-submenu>a:after{display:block;content:' ';float:right;width:0;height:0;border-color:transparent;border-style:solid;border-width:5px 0 5px 5px;border-left-color:#ccc;margin-top:5px;margin-right:-10px}.dropMenu-submenu:hover>a:after{border-left-color:#fff}.dropMenu-submenu.pull-left{float:none}.dropMenu-submenu.pull-left>.dropMenu-menu{left:-100%;margin-left:10px;-webkit-border-radius:6px 0 6px 6px;-moz-border-radius:6px 0 6px 6px;border-radius:6px 0 6px 6px}.dropMenu .dropMenu-menu .nav-header{padding-left:20px;padding-right:20px}"),this.dropdownHTML='<a accesskey="'+this.config.accessKey+'" tabindex="0" data-wrap="'+this.config.wrap+'"class="dropMenu-toggle skipTo '+this.config.visibility+" "+this.config.customClass+'" id="drop4" role="button" aria-haspopup="true" ',this.dropdownHTML+='aria-expanded="false" data-toggle="dropMenu" data-target="menu1"',"true"===this.config.hashOnMenu&&(this.dropdownHTML+=' href="#"'),this.dropdownHTML+=">"+this.config.buttonLabel+'<span class="caret"></span></a>',this.dropdownHTML+='<ul id="menu1" class="dropMenu-menu" role="menu" aria-label="'+this.config.menuLabel+'" style="top:3%; text-align:left">',this.getLandMarks(this.config.main),this.getLandMarks(this.config.landmarks),this.getSections(this.config.sections),this.getIdElements(),this.getHeadings(),htmlStr=this.getdropdownHTML(),this.dropdownHTML+=htmlStr+"</ul>",0<htmlStr.length&&(div.className="dropMenu",attachElement.insertBefore(div,attachElement.firstChild),div.innerHTML=this.dropdownHTML,this.addListeners()),window.skipToDropDownInit(this.config)},normalizeName:function(name){return"string"==typeof name?name.replace(/\w\S*/g,function(txt){return txt.charAt(0).toUpperCase()+txt.substr(1).toLowerCase()}):""},getTextContent:function(elem){var str="Test",strings=[];return function getText(e,strings){if(3===e.nodeType)strings.push(e.data);else if(1===e.nodeType){var tagName=e.tagName.toLowerCase();if("img"===tagName||"area"===tagName)e.alt&&strings.push(e.alt);else for(var c=e.firstChild;c;)getText(c,strings),c=c.nextSibling}}(elem,strings),strings.length&&(str=strings.join(" ")),30<str.length&&(str=str.substring(0,27)+"..."),str},getAccessibleName:function(elem){var labelledbyIds=elem.getAttribute("aria-labelledby"),label=elem.getAttribute("aria-label"),title=elem.getAttribute("title"),name="";if(labelledbyIds&&labelledbyIds.length){var str,strings=[],ids=labelledbyIds.split(" ");ids.length||(ids=[labelledbyIds]);for(var i=0,l=ids.length;i<l;i+=1){var e=document.getElementById(ids[i]);e&&(str=this.getTextContent(e)),str.length&&strings.push(str)}name=strings.join(" ")}else label&&label.length?name=label:title&&title.length&&(name=title);return name},getHeadings:function(){var targets=this.config.headings;if("string"==typeof targets&&0!==targets.length){var i,j,heading,role,id,name,headings=document.querySelectorAll(targets);for(i=0,j=headings.length;i<j;i+=1)"string"==typeof(role=(heading=headings[i]).getAttribute("role"))&&"presentation"===role||this.isVisible(heading)&&(id=heading.getAttribute("id")||heading.innerHTML.replace(/\s+/g,"_").toLowerCase().replace(/[&\/\\#,+()$~%.'"!:*?<>{}¹]/g,"")+"_"+i,heading.tabIndex="-1",heading.setAttribute("id",id),name=this.getTextContent(heading),"false"===this.config.enumerateElements&&(name=heading.tagName.toLowerCase()+": "+name),this.headingElementsArr[id]={id:id,name:name})}},isVisible:function(element){return function isVisibleRec(el){if(9===el.nodeType)return!0;var display=document.defaultView?document.defaultView.getComputedStyle(el,null).getPropertyValue("display"):el.currentStyle.display,visibility=document.defaultView?document.defaultView.getComputedStyle(el,null).getPropertyValue("visibility"):el.currentStyle.visibility,hidden=el.getAttribute("hidden"),ariaHidden=el.getAttribute("aria-hidden"),clientRect=el.getBoundingClientRect();return!("none"===display||"hidden"===visibility||null!==hidden||"true"===ariaHidden||clientRect.height<4||clientRect.width<4)&&isVisibleRec(el.parentNode)}(element)},getSections:function(targets){if("string"==typeof targets&&0!==targets.length){var k,l,section,id1,role,val,name,sections=document.querySelectorAll(targets);for(k=0,l=sections.length;k<l;k+=1)"string"==typeof(role=(section=sections[k]).getAttribute(role))&&"presentation"===role||this.isVisible(section)&&(id1=section.getAttribute("id")||"ui-skip-"+Math.floor(100*Math.random()+1),section.tabIndex="-1",section.setAttribute("id",id1),role=section.tagName.toLowerCase(),val="false"===this.config.enumerateElements?this.normalizeName(role)+": ":"",(name=this.getAccessibleName(section))&&name.length?val+=name:"main"===role&&(val+=this.config.contentLabel),this.landmarkElementsArr[id1]=val)}},getLandMarks:function(targets){if("string"==typeof targets&&0!==targets.length){var k,l,landmark,id1,role,name,val,landmarks=document.querySelectorAll(targets);for(k=0,l=landmarks.length;k<l;k+=1)"string"==typeof(role=(landmark=landmarks[k]).getAttribute("role"))&&"presentation"===role||this.isVisible(landmark)&&(id1=landmark.getAttribute("id")||"ui-skip-"+Math.floor(100*Math.random()+1),landmark.tabIndex="-1",landmark.setAttribute("id",id1),role=role||landmark.tagName.toLowerCase(),name=this.getAccessibleName(landmark),"banner"===role&&(role="header"),"contentinfo"===role&&(role="footer"),"navigation"===role&&(role="nav"),val="false"===this.config.enumerateElements?this.normalizeName(role)+": ":"",name&&name.length?val+=name:"main"===role&&(val+=this.config.contentLabel),this.landmarkElementsArr[id1]=val)}},getIdElements:function(){var i,els,el,id,val;for(els="object"==typeof this.config.ids?this.config.ids:"string"==typeof this.config.ids?(els=this.config.ids.split(",")).map(function(el){return{id:el.trim()}}):[],i=0;i<els.length;i+=1)id=els[i].id.replace("#",""),null!==(el=document.getElementById(id))&&(30<(val=els[i].description||el.innerHTML.replace(/<\/?[^>]+>/gi,"").replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")).length&&(val=val.replace(val,val.substr(0,30)+"...")),"false"===this.config.enumerateElements&&(val="id: "+val),this.idElementsArr[id]=val)},getdropdownHTML:function(){var key,val,htmlStr="",landmarkSep=!0,headingSep=!0,elementCnt=1;for(key in this.landmarkElementsArr)this.landmarkElementsArr.hasOwnProperty(key)&&(landmarkSep&&(htmlStr+='<li role="separator" style="list-style:none outside none">'+this.config.landmarksLabel+"</li>",landmarkSep=!1),val=this.landmarkElementsArr[key],htmlStr+='<li role="presentation" style="list-style:none outside none"><a tabindex="-1" role="menuitem" href="#',htmlStr+=key+'">',"false"!==this.config.enumerateElements&&(htmlStr+=elementCnt+": ",elementCnt+=1),htmlStr+=val+"</a></li>");for(key in this.idElementsArr)this.idElementsArr.hasOwnProperty(key)&&(landmarkSep&&(htmlStr+='<li role="separator" style="list-style:none outside none">'+this.config.landmarksLabel+"</li>",landmarkSep=!1),val=this.idElementsArr[key],htmlStr+='<li role="presentation" style="list-style:none outside none"><a tabindex="-1" role="menuitem" href="#',htmlStr+=key+'">',"false"!==this.config.enumerateElements&&(htmlStr+=elementCnt+": ",elementCnt+=1),htmlStr+=val+"</a></li>");for(key in this.headingElementsArr)this.headingElementsArr[key].name&&(headingSep&&(htmlStr+='<li role="separator" style="list-style:none outside none">'+this.config.headingsLabel+"</li>",headingSep=!1),htmlStr+='<li role="presentation" style="list-style:none outside none"><a class="po-'+(val=this.headingElementsArr[key].name).substring(0,2)+'" tabindex="-1" role="menuitem" href="#',htmlStr+=key+'">',"false"!==this.config.enumerateElements&&(htmlStr+=elementCnt+": ",elementCnt+=1),htmlStr+=val+"</a></li>");return htmlStr},addStyles:function(cssString){var tt1,ss1=document.createElement("style"),hh1=document.getElementsByTagName("head")[0];ss1.setAttribute("type","text/css"),hh1.appendChild(ss1),ss1.styleSheet?ss1.styleSheet.cssText=cssString:(tt1=document.createTextNode(cssString),ss1.appendChild(tt1))},addListeners:function(){"false"===this.config.focusOnClick&&window.addEventListener("hashchange",function(){var element=document.getElementById(location.hash.substring(1));element&&(/^(?:a|select|input|button|textarea)$/i.test(element.tagName)||(element.tabIndex=-1),element.focus(),element.scrollIntoView(!0))},!1)}},window.skipToMenuInit=function(customConfig){SkipTo.prototype.init(customConfig||window.Drupal||window.Wordpress||window.SkipToConfig||{})}}(window.Drupal||window.Wordpress||window.SkipToConfig);
//# sourceMappingURL=skipto.min.js.map/*@end @*/
