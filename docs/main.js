!function(e){function t(t){for(var i,s,a=t[0],l=t[1],c=t[2],p=0,h=[];p<a.length;p++)s=a[p],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&h.push(o[s][0]),o[s]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);for(d&&d(t);h.length;)h.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],i=!0,a=1;a<n.length;a++){var l=n[a];0!==o[l]&&(i=!1)}i&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var i={},o={0:0},r=[];function s(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=i,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var a=window.webpackJsonp=window.webpackJsonp||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var d=l;r.push([26,1]),n()}({14:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);n(13),n(14);var i=n(2),o=n(0),r=n.p+"nodes.json",a=n.p+"links.json",l=n.p+"triplets.json",c=n.p+"arial.xml",d=n(10),p=n.n(d),h=n(11),u=n.p+"arial.png",m=n(12),f=n.n(m);let w,x,y;o.BitmapFont.from("KeywordFont",{fontFamily:"Arial",fontSize:72,fill:13095362});var g=()=>{const e=new o.Graphics;e.interactiveChildren=!1,e.alpha=.03;const t=s.pixi.addChild(e);s.links.forEach(({source:e,target:n,value:i})=>{t.lineStyle(i,16777215),t.moveTo(e.x,e.y),t.lineTo(n.x,n.y)})};const b="—————————————",v='<span class="block"></span>';const C=16702720,E=13095362;var k=()=>{const e=new o.Graphics;s.pixi.addChild(e);o.BitmapFont.from("NodeFont",{fontFamily:"Arial",fontSize:24,fill:E}),s.nodes.forEach(t=>{t.visibility=!1;const n=.1*t.docs;t.circle=new o.Graphics,t.circle.beginFill(E,1),t.circle.drawCircle(0,0,n),t.circle.endFill(),t.circle.tint=E,t.circle.position=new o.Point(t.x,t.y),t.circle.interactive=!0,t.circle.hitArea=new o.Circle(0,0,s.distance),e.addChild(t.circle);const[r,a]=(e=>{const t=Math.round(e.length/2);for(let n=t,i=t;n<e.length||i>=0;n++,i--){if(" "===e[n])return[e.substring(0,n),e.substring(n+1)];if(" "===e[i])return[e.substring(0,i),e.substring(i+1)]}return[e,""]})(t.name);t.text=new o.BitmapText(`${r}\n${a}`,{fontName:"NodeFont"}),t.text.scale.set(.2),t.text.align="center",t.text.position.set(t.x-t.text.width/2,t.y+n+2),e.addChild(t.text),t.circle.mouseover=e=>{!function(e){const t=i.select("body").append("div").attr("id","focus");t.append("h2").html(e.name),t.append("h3").html(`${e.docs} Publications`),t.append("p").html("&nbsp;"),t.append("h3").html("Tokens by tf-idf"),t.append("p").html(b),Object.entries(e.tokens).slice(0,20).forEach(([e,n])=>{const i=v.repeat(n/10);t.append("p").html(`${i} &nbsp; ${e}`)}),t.append("p").html("&nbsp;"),t.append("h3").html("Co-author Nationalities"),t.append("p").html(b),Object.entries(e.nationalities).sort().forEach(([e,n],i)=>{const o=v.repeat(4*n);t.append("p").html(`${o} &nbsp; ${e}`)}),t.append("p").html("&nbsp;"),t.append("h3").html("Publication Years"),t.append("p").html(b),Object.entries(e.years).forEach(([e,n],i)=>{const o=v.repeat(4*n);t.append("p").html(`${o} &nbsp; ${e}`)})}(t),s.nodes.filter(e=>t.peers.includes(e.id)).forEach(e=>{e.circle.tint=C,e.text.tint=C})},t.circle.mouseout=e=>{i.select("#focus").remove(),s.tokens=[],s.nodes.forEach(e=>{e.circle.tint=E,e.text.tint=E})}})};o.BitmapFont.from("TripletFont",{fontFamily:"Arial",fontSize:24,fill:6516064});window.d3=i,window.s={distance:30,links:g,nodes:k,tokens:[]},Promise.all([i.json(r),i.json(a),i.json(l),i.xml(c)]).then(([e,t,n,i])=>{s.links=t,s.nodes=e,s.triplets=n,console.log("nodes",s.nodes.length),console.log("links",s.links.length),console.log("triplets",s.triplets.length),(e=>{const t=new o.Application({width:window.innerWidth,height:window.innerHeight,antialias:!0,transparent:!0,resolution:2,autoDensity:!0,autoResize:!0,resizeTo:window});document.body.prepend(t.view),s.app=t;const n=o.Texture.from(u),i=(o.BitmapFont.install(e,n),new h.a({screenWidth:window.innerWidth,screenHeight:window.innerHeight,interaction:t.renderer.plugins.interaction}));t.stage.addChild(i),s.pixi=i;i.drag().pinch().wheel().decelerate().clampZoom({minScale:.1,zoomMax:5}).setTransform(window.innerWidth/2,window.innerHeight/2,.1,.1);const r=d3.scaleLinear().domain([.1,2]).range([1,0]),a=d3.scaleLinear().domain([.1,2]).range([0,1]);i.on("zoomed",e=>{const t=e.viewport.lastViewport.scaleX;e.viewport.children[2].alpha=r(t),e.viewport.children[3].alpha=r(t),e.viewport.children[5].alpha=a(t)}),window.addEventListener("wheel",e=>{e.preventDefault()},{passive:!1})})(i),(()=>{const e=document.createElement("canvas");let t=o.Texture.from(e),n=new o.Sprite(t);s.pixi.addChild(n)})(),g(),(()=>{const e=new o.Graphics;e.interactiveChildren=!1;const t=s.pixi.addChild(e),n=d3.extent(s.nodes,e=>e.x),i=d3.extent(s.nodes,e=>e.y),r=n[1]-n[0],a=i[1]-i[0],l=n[0],c=i[0],d=d3.contourDensity().x(e=>e.x-l).y(e=>e.y-c).weight(e=>e.relevancy).size([r,a]).cellSize(15).bandwidth(50).thresholds(20)(s.nodes);d.forEach(e=>e.coordinates=e.coordinates.map(e=>e.map(e=>e.map(e=>[e[0]+l,e[1]+c]))));const p=2/d.length;let h=1;for(let e=d.length-1;e>=0;e--){const n=2-p*h;t.lineStyle(n,10066329),h+=1,d[e].coordinates.forEach(e=>{e.forEach(e=>{e.forEach(([e,n],i)=>{0==i&&t.moveTo(e,n),t.lineTo(e,n)})}),t.closePath()})}})(),(()=>{const e=new o.Graphics;e.interactiveChildren=!1,w=s.pixi.addChild(e);x=Math.pow(2*s.distance-10,2),y=Math.pow(2*s.distance+10,2),s.links.forEach(e=>{const t=Math.abs(e.source.x-e.target.x),n=Math.abs(e.source.y-e.target.y),i=Math.pow(t,2)+Math.pow(n,2);if(x<i&&i<y){const[i,r]=Object.entries(e.tokens)[0],a=.005*r,l=t/2+Math.min(e.source.x,e.target.x),c=n/2+Math.min(e.source.y,e.target.y);e.txt=new o.BitmapText(i,{fontName:"KeywordFont"}),e.txt.scale.set(a),e.txt.position.set(l-e.txt.width/2,c-e.txt.height/2);let d=!1;s.links.filter(e=>e.txt).forEach(t=>{if(e.index==t.index)return;const n=e.txt,i=t.txt;i.x>n.x+n.width||i.x+i.width<n.x||i.y>n.y+n.height||i.y+i.height<n.y||(d=!0)}),d||w.addChild(e.txt)}})})(),k(),(()=>{const e=new o.Graphics;e.alpha=0,e.interactiveChildren=!1;const t=s.pixi.addChild(e);s.triplets.forEach(e=>{const n=e.tokens.slice(0,3),i=5*n.length/2,r=e.position[0],s=e.position[1];n.forEach(([e,n],a)=>{const l=new o.BitmapText(e,{fontName:"TripletFont"});l.align="center",l.scale.set(.16),l.position.set(r-l.width/2,s-i+5*a),t.addChild(l)})})})(),(()=>{const e=f()({every:1});setInterval(()=>{e.tick()},1e3/60);const t=document.getElementById("fps");e.on("data",(function(e){t.innerHTML=Math.floor(parseInt(e))}))})(),(()=>{document.querySelector("#autoComplete").addEventListener("autoComplete",e=>{console.log(e)});new p.a({data:{src:async()=>s.nodes.reduce((e,{name:t,x:n,y:i})=>(e.push({name:t,x:n,y:i}),e),[]),key:["name"],cache:!1},sort:(e,t)=>e.match<t.match?-1:e.match>t.match?1:0,placeHolder:"Search",selector:"#autoComplete",threshold:0,debounce:0,searchEngine:"loose",highlight:!0,maxResults:10,resultsList:{render:!0,container:e=>{e.setAttribute("id","autoComplete_list")},destination:document.querySelector("#autoComplete"),position:"afterend",element:"ul"},resultItem:{content:(e,t)=>{t.innerHTML=e.match},element:"li"},noResults:()=>{const e=document.createElement("li");e.setAttribute("class","no_result"),e.setAttribute("tabindex","1"),e.innerHTML="No Results",document.querySelector("#autoComplete_list").appendChild(e)},onSelection:e=>{console.log(e);e.selection.key;const t=e.selection.value,{x:n,y:i,name:o}=t;document.querySelector("#autoComplete").value=o;s.pixi.setTransform(window.innerWidth/2-5*n,window.innerHeight/2-5*i,5,5),s.pixi.children[2].alpha=0,s.pixi.children[3].alpha=0,s.pixi.children[5].alpha=1}})})(),window.onresize=function(){s.pixi.resize()}})}});