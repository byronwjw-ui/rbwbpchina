// 运行时把 slides/sN.html 注入到对应占位 section
(async function(){
  const targets=[17,18,19,20,21,22];
  for(const id of targets){
    const sec=document.querySelector('section.slide[data-id="'+id+'"]');
    if(!sec) continue;
    if(sec.children.length===0 || sec.innerHTML.indexOf('PLACEHOLDER_')>-1){
      try{
        const r=await fetch('slides/s'+id+'.html',{cache:'no-cache'});
        if(r.ok){ sec.innerHTML=await r.text(); }
      }catch(e){console.warn('load slide',id,e);}
    }
  }
  // 注入完成后渲染第 18 页的图表
  if(typeof Chart!=='undefined'){
    const el=document.getElementById('ch18');
    if(el && !el.dataset.done){
      el.dataset.done=1;
      new Chart(el,{type:'bar',data:{labels:['曝光\n(亿)','到达\n(千万)','点击\n(百万)','注册\n(百万)','首次占卜\n(百万)','付费\n(十万)','复购\n(十万)'],datasets:[{label:'冷启动 6 个月漏斗',data:[5.0,1.2,1.8,0.9,0.62,0.38,0.21],backgroundColor:['#d4af37','#e8c25a','#f5d77a','#b9a7e6','#7e5bef','#e07a8b','#6ddfb8'],borderRadius:6}]},options:{plugins:{legend:{display:false},title:{display:true,text:'冷启动 6 个月用户漏斗（数据为对应数量级）',color:'#f5d77a',font:{size:13,family:"'Noto Serif SC',serif"}}},scales:{y:{grid:{color:'rgba(212,175,55,.08)'}},x:{grid:{display:false},ticks:{font:{size:10}}}}}});
    }
  }
})();
