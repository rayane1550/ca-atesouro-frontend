(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=t(e);fetch(e.href,n)}})();const l=[{id:1,nome:"Praia do Sol",status:"disponivel",tesouro:"Baú perdido",pergunta:"Qual tecnologia permite salvar informações no navegador?",alternativas:["LocalStorage","Python","MySQL","Django"],resposta:"LocalStorage",pista:"O primeiro fragmento aponta para o caminho da floresta."},{id:2,nome:"Floresta Negra",status:"bloqueado",tesouro:"Pergaminho antigo",pergunta:"Qual linguagem é usada para estruturar uma página HTML?",alternativas:["HTML","SQL","Python","Java"],resposta:"HTML",pista:"A próxima pista está escondida onde a luz quase não chega."},{id:3,nome:"Caverna do Eco",status:"bloqueado",tesouro:"Cristal misterioso",pergunta:"Qual propriedade do CSS altera a cor do texto?",alternativas:["background","color","display","margin"],resposta:"color",pista:"O próximo caminho leva até o antigo navio."},{id:4,nome:"Navio das Brumas",status:"bloqueado",tesouro:"Mapa antigo",pergunta:"Qual recurso permite mover elementos com o mouse?",alternativas:["Drag and Drop","LocalStorage","Flexbox","Grid"],resposta:"Drag and Drop",pista:"Todas as pistas estão quase completas. O tesouro final está próximo."},{id:5,nome:"Ilha do Tesouro",status:"bloqueado",tesouro:"Grande Tesouro",pergunta:"Qual é a palavra formada pelas pistas?",alternativas:["TESOURO","AVENTURA","ILHA","PIRATA"],resposta:"TESOURO",pista:"Parabéns! Você encontrou o tesouro final."}];function c(o){return typeof localStorage>"u"||localStorage.setItem("cacaAoTesouro",JSON.stringify(o)),o}function m(){if(typeof localStorage>"u")return null;const o=localStorage.getItem("cacaAoTesouro");return o?JSON.parse(o):null}function g(){typeof localStorage<"u"&&localStorage.removeItem("cacaAoTesouro")}function u(o){return l.find(a=>a.id===o)}function h(o,a){const t=l.findIndex(n=>n.id===a),s=l[t+1];if(!s)return o;o.pontosDesbloqueados.includes(s.id)||o.pontosDesbloqueados.push(s.id);const e=o.pontos.find(n=>n.id===s.id);return e&&(e.status="disponivel"),o}function d(o,a,t){const s=u(a);return s?!o.pontosDesbloqueados.includes(a)&&a!==1?(console.log("🚫 Este ponto ainda está bloqueado."),!1):(t?.(s),!0):!1}function b(o={pontos:l,inventario:[]}){const a=["🏖️","🌲","🕳️","⛵","💰"],t={bloqueado:"🔒",disponivel:"⚓",andamento:"🧭",concluido:"✓"},s=(o.pontos??[]).map(n=>{const r=n.status||"bloqueado";return`
      <button
        type="button"
        class="ponto ${r} ponto-${n.id}"
        data-ponto="${n.id}"
        aria-label="Local ${n.nome} - ${r}"
      >
        <span class="icone-local">${a[n.id-1]||"📍"}</span>
        <h2>${n.nome}</h2>
        <span class="icone-status">${t[r]||"🔒"}</span>
      </button>
    `}).join(""),e=`
    <aside class="inventario">
      <h2>🧰 Inventário</h2>
      <div class="lista-pistas">
        ${(o.inventario??[]).length?(o.inventario??[]).map((n,r)=>`
              <div class="pista" draggable="true">
                <span>📜</span>
                <span>${n.nome||n.texto||`Pista ${r+1}`}</span>
              </div>
            `).join(""):'<div class="inventario-vazio">Encontre pistas durante sua aventura!</div>'}
      </div>
    </aside>
  `;return`
    <main class="cenario">
      <div class="mapa">
        <div class="decoracao decoracao-mar"></div>

        <div class="bussola">
          <span class="norte">N</span>
          <span class="leste">L</span>
          <span class="sul">S</span>
          <span class="oeste">O</span>
          <span class="estrela-bussola">✦</span>
        </div>

        <h1 class="titulo">
          <span>Caça ao Tesouro</span>
        </h1>

        <div class="ilha ilha-praia">🌴</div>
        <div class="ilha ilha-floresta">🌳🌲🌳</div>
        <div class="ilha ilha-caverna">⛰️</div>
        <div class="ilha ilha-navio">⛵</div>
        <div class="ilha ilha-tesouro">🏝️</div>

        <div class="trilha">
          <span class="trilha-trecho"></span>
        </div>

        <div class="marcador-tesouro">✕</div>

        ${s}
      </div>

      ${e}
    </main>
  `}function p(o){const a=document.getElementById("app");a&&(a.innerHTML=b(o),a.querySelectorAll("[data-ponto]").forEach(t=>{t.addEventListener("click",()=>{const s=Number(t.dataset.ponto);d(o,s,e=>{console.log(`📍 Abrindo ${e.nome}`)})})}))}function $(o){console.log("================================"),console.log(`📍 LOCAL: ${o.nome}`),console.log(`💎 TESOURO: ${o.tesouro}`),console.log("================================"),console.log(`❓ ${o.pergunta}`),o.alternativas.forEach((a,t)=>{console.log(`${t+1} - ${a}`)})}function P(o,a,t,s,e){const n=encontrarPonto(a);return n?o.pontosDesbloqueados.includes(a)?(o.quizzes[a]={resposta:t,correta:t===n.resposta},t===n.resposta?(console.log("✅ Resposta correta!"),s?.(n),!0):(console.log("❌ Resposta incorreta!"),console.log("Tente novamente."),e?.(o),!1)):(console.log("Local bloqueado!"),!1):!1}function f(o){return console.log("🎒 INVENTÁRIO"),o.inventario.length===0?(console.log("Nenhuma pista encontrada."),[]):(o.inventario.forEach((a,t)=>{console.log(`${t+1}. ${a.nome}`)}),o.inventario)}function S(o,a,t){return o.inventario=a,t?.(o),console.log("🎒 Inventário reorganizado!"),o.inventario}function L(o,a,t){return o.pontosConcluidos.length===t.length?a?.trim().toUpperCase()==="TESOURO"?(console.log("🏆 ENIGMA RESOLVIDO!"),console.log("🎉 Parabéns! Você encontrou o tesouro!"),!0):(console.log("❌ Resposta incorreta!"),!1):(console.log("🔒 Você ainda precisa concluir todos os locais!"),!1)}function y(){return{pontos:l.map(o=>({...o,status:o.status})),pontosConcluidos:[],pontosDesbloqueados:[1],tesouros:[],pistas:[],quizzes:{},inventario:[]}}let i=y();function E(){const o=m();o?(i=o,console.log("Progresso carregado!")):(c(i),console.log("Novo jogo iniciado!")),p(i),f(i)}function O(o){const a=o.id;if(i.pontosConcluidos.includes(a))return;i.pontosConcluidos.push(a);const t=i.pontos.find(s=>s.id===a);t&&(t.status="concluido"),i.tesouros.push({id:a,nome:o.tesouro}),i.pistas.push({id:a,texto:o.pista,status:"completa"}),i.inventario.push({id:a,nome:o.pista}),h(i,a),c(i),p(i),console.log(`🎉 ${o.nome} concluído!`),console.log(`💎 Tesouro encontrado: ${o.tesouro}`),console.log(`🧩 Pista recebida: ${o.pista}`)}function T(o){d(i,o,a=>$(a))}function q(o,a){return u(o)?P(i,o,a,e=>O(e),c):!1}function I(){g(),window.location.reload()}function N(o=i){const a=["🏖️","🌲","🕳️","🛶","💰"],t=o.pontos.map(e=>{const n=e.status||"bloqueado";return`
        <button
          type="button"
          class="ponto ${n} ponto-${e.id}"
          data-ponto="${e.id}"
          aria-label="Local ${e.nome} - ${n}"
        >
          <h2>${e.nome}</h2>
          <span class="icone">${a[e.id-1]||"📍"}</span>
        </button>
      `}).join(""),s=o.inventario.length?`
      <aside class="inventario">
        <h2>Inventário</h2>
        ${o.inventario.map(e=>`<div class="pista">${e.nome||e.texto||"Pista"}</div>`).join("")}
      </aside>
    `:"";return`
    <div class="mapa">
      <h1 class="titulo">Caça ao Tesouro</h1>
      <div class="trilha"></div>
      ${t}
    </div>
    ${s}
  `}function v(){E();const o=document.getElementById("app");return o&&(o.innerHTML=N(i),document.querySelectorAll("[data-ponto]").forEach(t=>{t.addEventListener("click",()=>{T(Number(t.dataset.ponto))})})),i}window.cacaAoTesouro={iniciarJogo:v,responderPonto:q,reiniciarAventura:I,verificarEnigma:o=>L(i,o,l),mostrarInventario:()=>f(i),reorganizarPistas:o=>S(i,o,c)};typeof document<"u"&&document.addEventListener("DOMContentLoaded",()=>{v()});
