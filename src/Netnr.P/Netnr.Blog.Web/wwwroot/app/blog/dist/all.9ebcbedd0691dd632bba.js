(()=>{var e,t={5246:()=>{window.addEventListener("DOMContentLoaded",(function(){if(console){var e=[],t="https://www.netnr.com",a={msg:("","NET牛人"),style:""};a.style="padding:10px 40px 10px;line-height:50px;background:url('"+t+"/favicon.svg') no-repeat;background-size:15% 100%;font-size:1.8rem;color:orange",e.push(a),(a={msg:"",style:""}).msg=t,a.style="background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #25e),color-stop(0.75, #4f2), color-stop(0.9, #f2f), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:1.5em;",e.push(a),a={msg:"",style:""};for(var o=[{name:"GitHub",link:"https://github.com/netnr"}],n=0;n<o.length;n++){var r=o[n];a.msg+="\r\n"+r.name+"：\r\n"+r.link+"\r\n"}e.push(a),"ActiveXObject"in window||e.map((function(e){console.log("%c"+e.msg,e.style)})),window.performance&&(window.funsi=setInterval((function(){var e=performance.timing;e.loadEventEnd&&(console.log(JSON.stringify({load:e.loadEventEnd-e.navigationStart,ready:e.domComplete-e.responseEnd,request:e.responseEnd-e.requestStart})),clearInterval(window.funsi))}),10))}if("04-05"===new Date((new Date).valueOf()+288e5).toISOString().substring(5,10)){var i=document.documentElement.style;i.filter="progid: DXImageTransform.Microsoft.BasicImage(grayscale = 1)",i["-webkit-filter"]="grayscale(100%)"}}),!1)},79:(e,t,a)=>{"use strict";a(2119);var o=a(4784),n={init:function(){document.querySelectorAll("*").forEach((e=>{if(e.classList.value.startsWith("nr-")){var t="dom";e.classList[0].substring(3).split("-").forEach((e=>t+=e.substring(0,1).toUpperCase()+e.substring(1))),n[t]=e}})),n.navbarInit(),n.event(),document.cookie.includes(".theme=dark")&&!document.documentElement.classList.contains("sl-theme-dark")&&n.setTheme("dark"),n.ready(),n.changeSize(),window.addEventListener("resize",(function(){n.changeSize()})),n.setThemeGrid()},navbarInit:function(){n.domNavbar&&(n.domNavbarToggler.addEventListener("click",(function(){n.domNavbarDrawer.style.display="",n.domNavbarDrawer.show()})),n.domNavbarDropdown&&n.domNavbarDropdown.addEventListener("sl-show",(function(){n.domNavbarDropdown.querySelector("sl-menu").style.display=""})),n.domNavbar.querySelectorAll("sl-menu").forEach((e=>{e.addEventListener("sl-select",(function(e){var t=e.detail.item,a=t.getAttribute("data-href"),o=t.getAttribute("data-target");null!=a&&("_blank"==o?window.open(a):location.href=a)}))}))),n.changeTheme()},event:function(){document.body.addEventListener("click",(function(e){switch(e.target.getAttribute("data-action")){case"back-to-top":document.documentElement.scrollTo(0,0),document.body.scrollTo(0,0);break;case"theme":n.setTheme(n.isDark()?"light":"dark")}}),!1)},keyId:null,ready:function(){n.onReady()},onReady:function(){},changeSize:function(){var e=document.documentElement.clientHeight,t=document.documentElement.clientWidth;n.onChangeSize(e,t)},onChangeSize:function(e,t){},isDark:function(){return document.documentElement.classList.contains("sl-theme-dark")},setTheme:function(e){var t="dark"==e?"light":"dark";document.documentElement.className=document.documentElement.className.replace(t,e),n.domNavbar.className=n.domNavbar.className.replaceAll(t,e),n.cookie(".theme",e,31536e6),n.changeTheme()},setThemeGrid:function(e,t){(t=t||n.domGrid)&&("dark"==(e=e||(n.isDark()?"dark":"light"))?(t.classList.remove("ag-theme-alpine"),t.classList.add("ag-theme-alpine-dark")):(t.classList.remove("ag-theme-alpine-dark"),t.classList.add("ag-theme-alpine")))},changeTheme:function(){if(n.domNavbar){var e=n.domNavbar.querySelector('sl-menu-item[data-action="theme"]');e&&(e.checked=n.isDark())}window.monaco&&(n.isDark()?monaco.editor.setTheme("vs-dark"):monaco.editor.setTheme("vs")),n.nmd&&n.nmd.toggleTheme(n.isDark()?"dark":"light"),n.setThemeGrid(),n.onChangeTheme()},onChangeTheme:function(){},toFormData:function(e){var t=new FormData;for(var a in e)t.append(a,e[a]);return t},toQueryString:function(e){var t=[];for(var a in e)t.push(a+"="+encodeURIComponent(e[a]));return t.join("&")},htmlEncode:e=>{var t=document.createElement("div");return t.innerText=e,t.innerHTML},htmlDecode:e=>{var t=document.createElement("div");return t.innerHTML=e,t.innerText},alert:function(e,t="bell",a=5e3){const o=Object.assign(document.createElement("sl-alert"),{closable:!0,duration:a,innerHTML:`<sl-icon name="${t}" slot="icon"></sl-icon>${e}`});return document.body.append(o),o.toast()},dialog:function(e){const t=Object.assign(document.createElement("sl-dialog"),{label:"Message",innerHTML:`${e}`});return document.body.append(t),t.show(),t},cookie:function(e,t,a){if(1==arguments.length){var o=document.cookie.match(new RegExp("(^| )"+e+"=([^;]*)(;|$)"));return null!=o?o[2]:null}var n=e+"="+t+";path=/";if(a){var r=new Date;r.setTime(r.getTime()+a),n+=";expires="+r.toGMTString()}document.cookie=n},findScript:function(e){var t=document.scripts;for(let a=0;a<t.length;a++){let o=t[a];if(o.src.includes(e))return o}},type:function(e){return{}.toString.call(e).split(" ")[1].replace("]","")},receiveFiles:function(e,t,a){(a=a||document).addEventListener("dragover",(e=>{t&&t.contains(e.target)||(e.preventDefault(),e.stopPropagation())})),a.addEventListener("drop",(a=>{if(!t||!t.contains(a.target)){a.preventDefault();var o=a.dataTransfer.items;n.readDataTransferItems(o).then((t=>{t.length&&e(t,"drag")}))}})),t&&t.addEventListener("change",(function(){var t=this.files;t.length&&e(t,"change")})),document.addEventListener("paste",(function(t){var a=t.clipboardData.items,o=[];for(let e=0;e<a.length;e++){var n=a[e].getAsFile();n&&o.push(n)}o.length&&e(o,"paste")}))},readDataTransferItems:e=>new Promise((t=>{for(var a=[],o=[],r=0;r<e.length;r++){var i=e[r],l=i.webkitGetAsEntry();if(null!=l)a.push(n.readDataTransferItemEntry(l));else{var s=i.getAsFile();s&&o.push(s)}}Promise.all(a).then((e=>{e.forEach((e=>{e.length?o=o.concat(e):o.push(e)})),t(o)}))})),readDataTransferItemEntry:(e,t)=>new Promise((a=>{if(t=t||"",e.isFile)e.file((e=>{""!=t&&(e.fullPath=t+e.name),a(e)}));else if(e.isDirectory){e.createReader().readEntries((o=>{for(var r=[],i=0;i<o.length;i++)r.push(n.readDataTransferItemEntry(o[i],t+e.name+"/"));Promise.all(r).then((e=>{var t=[];e.forEach((e=>{e.length?t=t.concat(e):t.push(e)})),a(t)}))}))}})),ls:{},lsInit:function(){try{var e=localStorage.getItem(location.pathname);null!=e&&""!=e&&(n.ls=JSON.parse(e))}catch(e){n.ls={},console.debug("localStorage parse error",e)}},lsArr:function(e){return n.ls[e]=n.ls[e]||[]},lsObj:function(e){return n.ls[e]=n.ls[e]||{}},lsStr:function(e){return n.ls[e]=n.ls[e]||""},lsSave:function(){localStorage.setItem(location.pathname,JSON.stringify(n.ls))},download:function(e,t){var a=document.createElement("a");if(a.download=t,1==e.nodeType)a.href=e.toDataURL();else{var o=new Blob([e]);a.href=URL.createObjectURL(o)}document.body.appendChild(a),a.click(),a.remove()},formatByteSize:function(e,t=2,a=1024){if(Math.abs(e)<a)return e+" B";const o=1e3==a?["KB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"];let n=-1;const r=10**t;do{e/=a,++n}while(Math.round(Math.abs(e)*r)/r>=a&&n<o.length-1);return(1*e.toFixed(t)).toString()+" "+o[n]}};window.addEventListener("DOMContentLoaded",(function(){n.lsInit(),n.init()}),!1);var r={agSetColumn:(e,t)=>Object.assign(e,{cellRenderer:e=>e.value in t?t[e.value]:e.value,filter:"agSetColumnFilter",filterParams:{values:Object.keys(t)}}),lk:function(){agGrid.LicenseManager.prototype.outputMissingLicenseKey=e=>{}},defaultColDef:e=>Object.assign({width:150,maxWidth:4e3,filter:!0,sortable:!0,resizable:!0,filter:"agMultiColumnFilter",menuTabs:["generalMenuTab","filterMenuTab","columnsMenuTab"]},e),autoGroupColumnDef:e=>Object.assign({width:300,maxWidth:4e3},e),optionDef:e=>Object.assign({localeText:r.localeText,defaultColDef:r.defaultColDef(),autoGroupColumnDef:r.autoGroupColumnDef(),rowGroupPanelShow:"always",enableBrowserTooltips:!0,rowSelection:"multiple",suppressRowClickSelection:!0,enableRangeSelection:!0,autoSizePadding:40,headerHeight:32,pagination:!1,paginationPageSize:100,cacheBlockSize:100,suppressMoveWhenRowDragging:!0,animateRows:!0,isRowSelectable:e=>!0!==e.group,onSortChanged:e=>e.api.refreshCells(),onFilterChanged:e=>e.api.refreshCells(),onRowGroupOpened:e=>e.api.refreshCells()},e),numberCol:e=>Object.assign({headerName:"🆔",valueGetter:"node.rowIndex + 1",width:120,maxWidth:150,checkboxSelection:!0,headerCheckboxSelection:!0,headerCheckboxSelectionFilteredOnly:!0,sortable:!1,filter:!1,menuTabs:!1},e),localeText:{selectAll:"（全部）",selectAllSearchResults:"（全部搜索结果）",searchOoo:"搜索...",blanks:"（空）",noMatches:"未找到",filterOoo:"搜索...",equals:"等于",notEqual:"不等于",empty:"选择一项",lessThan:"小于",greaterThan:"大于",lessThanOrEqual:"小于等于",greaterThanOrEqual:"大于等于",inRange:"范围",inRangeStart:"开始值",inRangeEnd:"结束值",contains:"包含",notContains:"不包含",startsWith:"头包含",endsWith:"尾包含",dateFormatOoo:"yyyy-mm-dd",andCondition:"和",orCondition:"或",applyFilter:"确定",resetFilter:"重置",clearFilter:"清除",cancelFilter:"取消",textFilter:"文本搜索",numberFilter:"数字搜索",dateFilter:"日期搜索",setFilter:"项搜索",columns:"列",filters:"搜索",pivotMode:"枢轴模式",groups:"行组",rowGroupColumnsEmptyMessage:"拖拽列到此处进行分组",values:"值",valueColumnsEmptyMessage:"拖拽到此处合计",pivots:"列标签",pivotColumnsEmptyMessage:"拖拽到此处设置列标签",group:"分组",loadingOoo:"加载中...",noRowsToShow:"（空）",enabled:"启用",pinColumn:"固定列",pinLeft:"左固定",pinRight:"右固定",noPin:"取消固定",valueAggregation:"合计",autosizeThiscolumn:"当前列大小自适应",autosizeAllColumns:"所有列大小自适应",groupBy:"分组",ungroupBy:"取消分组",resetColumns:"重置列",expandAll:"展开全部",collapseAll:"折叠全部",copy:"复制",ctrlC:"Ctrl+C",copyWithHeaders:"复制（带标题）",paste:"粘贴",ctrlV:"Ctrl+V",export:"内置保存",csvExport:"保存为 CSV",excelExport:"保存为 Excel",excelXmlExport:"保存为 XML",sum:"求和",min:"最小",max:"最大",none:"无",count:"总数",avg:"平均",filteredRows:"过滤行",selectedRows:"选中",totalRows:"总行",totalAndFilteredRows:"搜索",more:"更多",to:"-",of:"，总共",page:"当前",nextPage:"下一页",lastPage:"尾页",firstPage:"首页",previousPage:"上一页",pivotChartAndPivotMode:"图表枢轴 & 枢轴模式",pivotChart:"图表枢轴",chartRange:"范围图表",columnChart:"柱状图",groupedColumn:"分组",stackedColumn:"Stacked",normalizedColumn:"100% Stacked",barChart:"条形图",groupedBar:"分组",stackedBar:"Stacked",normalizedBar:"100% Stacked",pieChart:"饼形图",pie:"Pie",doughnut:"Doughnut",line:"线图",xyChart:"散点图及气泡图",scatter:"散点图",bubble:"气泡图",areaChart:"面积图",area:"面积",stackedArea:"叠堆",normalizedArea:"100% 叠堆",histogramChart:"直方图",pivotChartTitle:"图表枢轴",rangeChartTitle:"范围图表",settings:"设置",data:"数据",format:"格式",categories:"类别",defaultCategory:"(无)",series:"系数",xyValues:"X Y 值",paired:"配对模式",axis:"轴",navigator:"导航",color:"颜色",thickness:"坐标宽度",xType:"X Type",automatic:"Automatic",category:"类别",number:"数字",time:"时间",xRotation:"X 旋转",yRotation:"Y 旋转",ticks:"Ticks",width:"宽",height:"高",length:"长",padding:"填充",spacing:"间距",chart:"图表",title:"标题",titlePlaceholder:"图表标题 - 双击编辑",background:"背景",font:"字体",top:"上",right:"右",bottom:"下",left:"左",labels:"标签",size:"大小",minSize:"最小",maxSize:"最大",legend:"指标项",position:"位置",markerSize:"Marker Size",markerStroke:"Marker Stroke",markerPadding:"Marker Padding",itemSpacing:"Item Spacing",itemPaddingX:"Item Padding X",itemPaddingY:"Item Padding Y",layoutHorizontalSpacing:"Horizontal Spacing",layoutVerticalSpacing:"Vertical Spacing",strokeWidth:"线条宽度",offset:"Offset",offsets:"Offsets",tooltips:"显示提示",callout:"Callout",markers:"标点",shadow:"阴影",blur:"发散",xOffset:"X 偏移",yOffset:"Y 偏移",lineWidth:"线条粗细",normal:"正常",bold:"加粗",italic:"斜体",boldItalic:"加粗斜体",predefined:"Predefined",fillOpacity:"填充透明度",strokeOpacity:"线条透明度",histogramBinCount:"Bin count",columnGroup:"柱状",barGroup:"条形",pieGroup:"饼状",lineGroup:"线",scatterGroup:"散点及气泡",areaGroup:"面积",histogramGroup:"直方",groupedColumnTooltip:"Grouped",stackedColumnTooltip:"Stacked",normalizedColumnTooltip:"100% Stacked",groupedBarTooltip:"Grouped",stackedBarTooltip:"Stacked",normalizedBarTooltip:"100% Stacked",pieTooltip:"Pie",doughnutTooltip:"Doughnut",lineTooltip:"Line",groupedAreaTooltip:"Area",stackedAreaTooltip:"Stacked",normalizedAreaTooltip:"100% Stacked",scatterTooltip:"Scatter",bubbleTooltip:"Bubble",histogramTooltip:"Histogram",noDataToChart:"No data available to be charted.",pivotChartRequiresPivotMode:"Pivot Chart requires Pivot Mode enabled.",chartSettingsToolbarTooltip:"Menu",chartLinkToolbarTooltip:"Linked to Grid",chartUnlinkToolbarTooltip:"Unlinked from Grid",chartDownloadToolbarTooltip:"Download Chart",ariaHidden:"hidden",ariaVisible:"visible",ariaChecked:"checked",ariaUnchecked:"unchecked",ariaIndeterminate:"indeterminate",ariaColumnSelectAll:"Toggle Select All Columns",ariaInputEditor:"Input Editor",ariaDateFilterInput:"Date Filter Input",ariaFilterInput:"Filter Input",ariaFilterColumnsInput:"Filter Columns Input",ariaFilterValue:"Filter Value",ariaFilterFromValue:"Filter from value",ariaFilterToValue:"Filter to value",ariaFilteringOperator:"Filtering Operator",ariaColumnToggleVisibility:"column toggle visibility",ariaColumnGroupToggleVisibility:"column group toggle visibility",ariaRowSelect:"Press SPACE to select this row",ariaRowDeselect:"Press SPACE to deselect this row",ariaRowToggleSelection:"Press Space to toggle row selection",ariaRowSelectAll:"Press Space to toggle all rows selection",ariaSearch:"Search",ariaSearchFilterValues:"Search filter values"}},i=(a(4371),{apiServer:"https://www.netnr.eu.org",fetch:(e,t)=>new Promise(((a,o)=>{var n=["https://cors.eu.org/","https://cors.zme.ink/","https://www.netnr.eu.org/api/v1/Proxy?url="],r=encodeURIComponent(e.url),i=e.encoding||"utf-8";delete e.url,delete e.encoding,null!=t?(r=n[t]+r,fetch(r,e).then((e=>e.blob())).then((e=>{var t=new FileReader;t.onload=function(e){var t=e.target.result;a(t)},t.readAsText(e,i)})).catch(o)):upstream(n,(function(t){r=t+r,fetch(r,e).then((e=>e.blob())).then((e=>{var t=new FileReader;t.onload=function(e){var t=e.target.result;a(t)},t.readAsText(e,i)})).catch(o)}),1)})),loading:function(e){var t=nr.domNavbarToggler.querySelector("sl-animation"),a=nr.domSlaSs;e?(t.duration=a.duration=1500,t.keyframes=a.keyframes=[{offset:0,easing:"cubic-bezier(0.250, 0.460, 0.450, 0.940)",fillMode:"both",transformOrigin:"center center",transform:"rotate(0)"},{offset:1,easing:"cubic-bezier(0.250, 0.460, 0.450, 0.940)",fillMode:"both",transformOrigin:"center center",transform:"rotate(360deg)"}]):(a.duration=1e4,t.keyframes=a.keyframes=[],t.cancel())}}),l={init:()=>new Promise((e=>{meRequire(["vs/editor/editor.main"],(function(){monaco.languages.html.registerHTMLLanguageService("xml",{},{documentFormattingEdits:!0}),e()}))})),config:e=>Object.assign({value:"",theme:nr.isDark()?"vs-dark":"vs",language:"text/plain",fontSize:18,automaticLayout:!0,scrollbar:{verticalScrollbarSize:13,horizontalScrollbarSize:13},minimap:{enabled:!0}},e),create:(e,t)=>{var a=monaco.editor.create(e,l.config(t));return l.fullScreen(a),l.wordWrap(a),a},formatter:e=>e.trigger("a","editor.action.formatDocument"),selectedValue:e=>e.getModel().getValueInRange(e.getSelection()),keepSetValue:(e,t)=>{var a=e.getPosition();e.executeEdits("",[{range:e.getModel().getFullModelRange(),text:t}]),e.setSelection(new monaco.Range(0,0,0,0)),e.setPosition(a)},setLanguage:(e,t)=>{monaco.editor.setModelLanguage(e.getModel(),t)},getLanguage:e=>e.getModel().getLanguageId(),onChange:(e,t,a)=>{a=a||500,e.onDidChangeModelContent((function(){clearTimeout(l.defer_change),l.defer_change=setTimeout((function(){t(e.getValue())}),a)}))},fullScreen:function(e){e.addAction({id:"meid-fullscreen",label:"全屏切换",keybindings:[monaco.KeyMod.CtrlCmd|monaco.KeyMod.Alt|monaco.KeyCode.KeyM],contextMenuGroupId:"me-01",run:function(e){e.getContainerDomNode().classList.toggle("nrc-fullscreen")}})},wordWrap:function(e){e.addAction({id:"meid-wordwrap",label:"换行切换",keybindings:[monaco.KeyMod.CtrlCmd|monaco.KeyMod.Alt|monaco.KeyCode.KeyN],contextMenuGroupId:"me-01",run:function(e){var t=e.getContainerDomNode(),a=t.getAttribute("wordWrap");null==a&&(a=e.getRawOptions().wordWrap),a="on"==a?"off":"on",t.setAttribute("wordWrap",a),e.updateOptions({wordWrap:a})}})}};a(5246);(0,o.t)("https://npm.elemecdn.com/@shoelace-style/shoelace@2.0.0-beta.73/dist"),Object.assign(window,{nr:n,ag:r,ss:i,me:l})},4371:()=>{!function(e){var t=function(t,a,o){var n="upstreamCache";if(!(n in e))try{e[n]=JSON.parse(localStorage.getItem(n))||{}}catch(t){e[n]={}}var r=(new Date).valueOf(),i=t.join(","),l=e[n][i];if(l&&l.ok.length&&r-l.date<12e4)a(l.ok[0],l.ok);else{for(var s=[],c=0,d=0,u=t.length;d<u;){var m=t[d++];m=m.trim().toLowerCase().indexOf("//")>=0?m:"//"+m,fetch(m).then((function(e){e.ok?s.push(e.url):c++})).catch((function(){c++}))}var g=setInterval((function(){var t=!1,l=(new Date).valueOf();1==o&&s.length>0&&(t=!0);var d=l-r>(1!=o&&o?o:3e3);(s.length+c==u||d)&&(t=!0),t&&(clearInterval(g),e[n][i]={date:l,ok:s},localStorage.setItem(n,JSON.stringify(e[n])),a(s[0],s))}),1)}};e.upstream=t}(window)}},a={};function o(e){var n=a[e];if(void 0!==n)return n.exports;var r=a[e]={exports:{}};return t[e](r,r.exports,o),r.exports}o.m=t,e=[],o.O=(t,a,n,r)=>{if(!a){var i=1/0;for(d=0;d<e.length;d++){for(var[a,n,r]=e[d],l=!0,s=0;s<a.length;s++)(!1&r||i>=r)&&Object.keys(o.O).every((e=>o.O[e](a[s])))?a.splice(s--,1):(l=!1,r<i&&(i=r));if(l){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[a,n,r]},o.d=(e,t)=>{for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={617:0};o.O.j=t=>0===e[t];var t=(t,a)=>{var n,r,[i,l,s]=a,c=0;if(i.some((t=>0!==e[t]))){for(n in l)o.o(l,n)&&(o.m[n]=l[n]);if(s)var d=s(o)}for(t&&t(a);c<i.length;c++)r=i[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(d)},a=self.webpackChunknetnr_blog=self.webpackChunknetnr_blog||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var n=o.O(void 0,[50,371,219],(()=>o(79)));n=o.O(n)})();