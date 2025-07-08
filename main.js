// --- SCRIPT ---
document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const navMenu = document.getElementById('nav-menu');
    const mainContent = document.getElementById('main-content');
    const headerTitle = document.getElementById('header-title');
    const langPtBtn = document.getElementById('lang-pt');
    const langEnBtn = document.getElementById('lang-en');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    let currentLang = 'pt-br';
    let contentData = null; // Armazenará os dados do JSON

    /**
     * Carrega o conteúdo principal da aplicação a partir de um arquivo JSON.
     */
    async function initializeApp() {
        try {
            const response = await fetch('./content.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            contentData = await response.json();
            // Após carregar os dados, renderiza o conteúdo inicial
            loadContent(currentLang);
        } catch (error) {
            console.error("Could not load content data:", error);
            mainContent.innerHTML = "<p>Error loading documentation content. Please try again later.</p>";
        }
    }

    /**
     * Renderiza o conteúdo da página com base no idioma e no hash da URL.
     * @param {string} lang - O idioma a ser carregado ('pt-br' ou 'en-us').
     * @param {string} [hash] - O hash da URL para carregar uma página específica.
     */
    function loadContent(lang, hash) {
        if (!contentData) return; // Não faz nada se os dados não foram carregados

        currentLang = lang;
        
        // Atualiza a aparência dos botões de idioma
        if (lang === 'pt-br') {
            langPtBtn.classList.add('bg-accent-color', 'text-white');
            langEnBtn.classList.remove('bg-accent-color', 'text-white');
        } else {
            langEnBtn.classList.add('bg-accent-color', 'text-white');
            langPtBtn.classList.remove('bg-accent-color', 'text-white');
        }

        // Carrega a navegação da barra lateral
        navMenu.innerHTML = contentData[lang].nav.map(group => `
            <div>
                <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">${group.category}</h3>
                <ul class="space-y-1">
                    ${group.items.map(item => `
                        <li>
                            <a href="#${item.id}" class="sidebar-link flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors duration-200">
                                ${item.title}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');

        // Carrega os textos do rodapé
        document.getElementById('footer-powered-by').textContent = contentData[lang].footer.poweredBy;
        document.getElementById('footer-portfolio').textContent = contentData[lang].footer.portfolio;

        // Carrega o conteúdo da página com base no hash atual
        loadPage(hash || location.hash);
    }

    /**
     * Carrega e exibe uma página específica no conteúdo principal.
     * @param {string} hash - O identificador da página (ex: '#visao-geral').
     */
    function loadPage(hash) {
        if (!contentData) return;

        // Define a página padrão se o hash estiver vazio
        const pageId = hash ? hash.substring(1) : contentData[currentLang].nav[0].items[0].id;
        const pageData = contentData[currentLang].pages[pageId];

        if (pageData) {
            mainContent.innerHTML = `
                <article class="prose prose-invert max-w-none">
                    <h1 class="text-3xl md:text-4xl mb-4">${pageData.title}</h1>
                    ${pageData.content}
                </article>
            `;
            headerTitle.textContent = pageData.title;

            // Atualiza o link ativo na barra lateral
            document.querySelectorAll('.sidebar-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${pageId}`) {
                    link.classList.add('active');
                }
            });
        } else {
             // Se o hash for inválido, carrega a primeira página como fallback
            loadPage(`#${contentData[currentLang].nav[0].items[0].id}`);
        }
    }
    
    // --- Event Listeners ---

    langPtBtn.addEventListener('click', () => loadContent('pt-br'));
    langEnBtn.addEventListener('click', () => loadContent('en-us'));
    
    // Ouve mudanças no hash da URL para navegação
    window.addEventListener('hashchange', () => loadPage(location.hash));

    // Delega eventos de clique para os links da barra lateral (melhora a performance)
    navMenu.addEventListener('click', (e) => {
        if (e.target.closest('.sidebar-link')) {
            // Esconde a barra lateral em telas pequenas após o clique
            if (window.innerWidth < 768) { // md breakpoint
                sidebar.classList.add('-translate-x-full');
            }
        }
    });

    // Toggle para o menu em dispositivos móveis
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });
    
    // Inicia a aplicação carregando os dados
    initializeApp();

    // Renderiza os ícones do Lucide
    lucide.createIcons();
});
