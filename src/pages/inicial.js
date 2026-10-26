function renderInicialPage() {
  return `<!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Caca Tesouro | Tela inicial</title>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body class="page page-inicial">
        <div class="bg-glow glow-one"></div>
        <div class="bg-glow glow-two"></div>

        <header class="topbar">
          <div class="container topbar-inner">
            <div class="brand">
              <span class="brand-mark">C</span>
              <span>Caca Tesouro</span>
            </div>
            <nav class="nav" aria-label="Navegação principal">
              <a href="/" class="active">Início</a>
              <a href="/home">Home</a>
              <a href="#">Projetos</a>
              <a href="#">Suporte</a>
            </nav>
          </div>
        </header>

        <main class="container hero-section">
          <section class="hero-copy">
            <span class="eyebrow">Acompanhe o que realmente importa</span>
            <h1>Transforme ideias em progresso real.</h1>
            <p>
              Organize tarefas, acompanhe objetivos e mantenha sua rotina focada no
              que gera resultado.
            </p>
            <div class="cta-row">
              <a class="btn btn-primary" href="/home">Entrar na home</a>
              <a class="btn btn-secondary" href="#recursos">Saiba mais</a>
            </div>

            <div class="mini-stats">
              <div>
                <strong>24k</strong>
                <span>ações registradas</span>
              </div>
              <div>
                <strong>92%</strong>
                <span>meta alcançada</span>
              </div>
              <div>
                <strong>3x</strong>
                <span>mais produtividade</span>
              </div>
            </div>
          </section>

          <aside class="hero-panel">
            <div class="panel-card">
              <div class="panel-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>

              <div class="panel-body">
                <div class="metric-box metric-highlight">
                  <span>Resumo do mês</span>
                  <strong>R$ 24.8k</strong>
                  <small>+18,4% em relação ao mês anterior</small>
                </div>

                <div class="metric-grid">
                  <div class="metric-box">
                    <span>Projetos</span>
                    <strong>128</strong>
                    <small>ativos</small>
                  </div>
                  <div class="metric-box">
                    <span>Meta</span>
                    <strong>92%</strong>
                    <small>alcançada</small>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </main>

        <section id="recursos" class="container section">
          <div class="section-header">
            <h2>Pronto para começar</h2>
            <p>Uma visão clara para planejar melhor, agir com foco e manter tudo organizado.</p>
          </div>

          <div class="card-grid">
            <article class="feature-card">
              <div class="icon">📈</div>
              <h3>Planejamento</h3>
              <p>Organize seus projetos e priorize tarefas com clareza desde o início.</p>
            </article>
            <article class="feature-card">
              <div class="icon">🎯</div>
              <h3>Metas</h3>
              <p>Acompanhe os resultados com foco em objetivos mensais e entregas importantes.</p>
            </article>
            <article class="feature-card">
              <div class="icon">🤝</div>
              <h3>Colaboração</h3>
              <p>Mantenha a equipe alinhada e aumente a produtividade com melhor visibilidade.</p>
            </article>
          </div>
        </section>

        <script src="/js/main.js"></script>
      </body>
    </html>`;
}

module.exports = { renderInicialPage };
