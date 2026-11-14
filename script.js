/**
 * ConceptCrush. Engine v2.0
 * Pure JS Component-Based Architecture for High Scalability
 */

const AppEngine = {
    state: null, // Initialized as Proxy
    rawState: {
        currentRoute: null,
        particles: [],
        observer: null,
        isBooting: true,
        isLoggedIn: false,
        user: null,
        dailyTarget: 3, // Target skills per day
        visitedToday: 0
    },

    // Initialization
    init() {
        console.log("%c🚀 ConceptCrush. Engine v3.0 (Complex Mode)", "color: #ff003c; font-weight: bold; font-size: 1.2rem;");
        this.initStateManagement();
        this.cacheDOM();
        this.initComplexSystems();
        this.handleInitialRoute();
    },

    initStateManagement() {
        const handler = {
            set: (target, prop, value) => {
                target[prop] = value;
                if (prop === 'currentRoute') this.onRouteChange();
                if (prop === 'isLoggedIn') this.updateAuthUI();
                return true;
            }
        };
        this.state = new Proxy(this.rawState, handler);
    },

    initComplexSystems() {
        this.initParticles();
        this.initIntersectionObserver();
        this.injectGlobalStyles();
        this.initSearch();
        this.initNavLinks();
        this.trackProgress();
        this.initDataStream();
        this.bindGlobalEvents();
        this.initAuth();
        this.initAIMentor();
    },

    cacheDOM() {
        this.app = document.getElementById('app');
        this.body = document.body;
        this.searchInput = document.getElementById('skill-search');
        this.searchResults = document.getElementById('search-results');
        this.authContainer = document.getElementById('auth-container');
    },



    initDataStream() {
        const overlay = document.createElement('div');
        overlay.className = 'data-grid-overlay';
        this.body.appendChild(overlay);
    },

    bindGlobalEvents() {
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Scanline logic
        const scanline = document.createElement('div');
        scanline.className = 'scanline';
        this.body.appendChild(scanline);
    },

    onRouteChange() {
        this.app.classList.remove('page-transition');
        requestAnimationFrame(() => {
            this.app.classList.add('page-transition');
        });
    },

    // --- ROUTING SYSTEM ---
    handleInitialRoute() {
        this.handleRoute();
    },

    // --- THEME SYSTEM ---
    setDynamicTheme(color) {
        const root = document.documentElement;
        const defaultColor = '#ff003c';
        const targetColor = color || defaultColor;
        
        root.style.setProperty('--primary', targetColor);
        root.style.setProperty('--primary-glow', `${targetColor}66`); // 40% opacity
        
        // Dynamic Glow matching
        this.body.style.textShadow = `0 0 20px ${targetColor}33`;
    },

    handleRoute() {
        const params = new URLSearchParams(window.location.search);
        const skillId = params.get('skill');
        const page = params.get('page');

        if (skillId) {
            const skill = skillsData.find(s => s.id === skillId);
            if (skill) {
                window.dispatchEvent(new CustomEvent('skillVisited', { detail: skill }));
                this.setDynamicTheme(skill.themeColor);
                this.renderSkillDetail(skill);
            } else {
                this.setDynamicTheme(null);
                this.renderHome();
            }
        } else if (page === 'journey' || page === 'news') {
            this.setDynamicTheme(null);
            if (page === 'journey') this.renderJourneyPage();
            else this.renderNewsPage();
        } else {
            this.setDynamicTheme(null);
            this.renderHome();
        }
    },

    navigateTo(skillId, page = null) {
        let url = window.location.pathname;
        if (skillId) url = `?skill=${skillId}`;
        else if (page) url = `?page=${page}`;
        
        window.history.pushState({ skillId, page }, '', url);
        this.state.currentRoute = url; // Trigger Proxy render
        this.handleRoute();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    // --- COMPONENTS ---
    components: {
        laptopMockup(sampleCode) {
            const codeLines = [...sampleCode, ...sampleCode] // Loop buffer
                .map(line => `<div class="code-line">${line}</div>`)
                .join('');

            return `
                <div class="hero-left" style="flex: 1; min-width: 400px; transform: scale(0.9);">
                    <div class="laptop-mockup" style="transform: rotateY(-15deg) rotateX(10deg);">
                        <div class="laptop-screen">
                            <div class="terminal-header">
                                <div class="terminal-dot red"></div>
                                <div class="terminal-dot yellow"></div>
                                <div class="terminal-dot green"></div>
                            </div>
                            <div class="code-editor">${codeLines}</div>
                        </div>
                        <div class="laptop-base"></div>
                    </div>
                </div>
            `;
        },

        skillAnimation(skill) {
            const style = skill.animation || 'animation: float 8s ease-in-out infinite;';
            return `<div class="skill-bg-animation" style="font-size: 30rem; animation: ${style}; color: ${skill.themeColor}; opacity: 0.06; filter: blur(15px);">${skill.icon}</div>`;
        }
    },

    // --- RENDERERS ---
    renderHome() {
        this.app.innerHTML = `
            <div class="hero">
                <div class="container hero-container">
                    <div class="hero-left">
                        <div class="laptop-mockup" style="transform: rotateY(15deg) rotateX(10deg);">
                            <div class="laptop-screen">
                                <div class="terminal-header">
                                    <div class="terminal-dot red"></div><div class="terminal-dot yellow"></div><div class="terminal-dot green"></div>
                                </div>
                                <div class="code-editor">
                                    <div class="code-line"><span>const</span> project = "ConceptCrush";</div>
                                    <div class="code-line"><span>function</span> build() { return "Growth"; }</div>
                                    <div class="code-line">console.log("Future Ready...");</div>
                                    <!-- Loop Buffer -->
                                    <div class="code-line"><span>const</span> project = "ConceptCrush";</div>
                                    <div class="code-line"><span>function</span> build() { return "Growth"; }</div>
                                </div>
                            </div>
                            <div class="laptop-base"></div>
                        </div>
                    </div>
                    <div class="hero-content">
                        <h1 class="text-gradient glitch-hover">Confused? Coding Roadmap is Here.</h1>
                        <p>From Beginner to Pro – Step by Step Career Guide for Computer Science Students.</p>
                        <div class="hero-cta">
                            <button class="btn btn-primary" onclick="window.scrollTo({top: document.getElementById('skills').offsetTop, behavior: 'smooth'})">Explore Skills</button>
                            <button class="btn btn-secondary" onclick="AppEngine.renderQuiz()">Find Career Path</button>
                        </div>
                    </div>
                </div>
                <div class="hero-visuals">
                    <div class="floating-icon icon-1 glitch-hover">💻</div>
                    <div class="floating-icon icon-2 glitch-hover">🚀</div>
                    <div class="floating-icon icon-3 glitch-hover">🧠</div>
                </div>
            </div>

            <div id="skills" class="skills-section">
                <div class="container">
                    <div class="section-header">
                        <h2>Explore <span class="text-gradient glitch-hover">Tech Skills</span></h2>
                        <p>Choose a path to trigger your career.</p>
                    </div>
                    <div class="skills-grid">
                        ${skillsData.map((skill, index) => `
                            <div class="skill-card reveal shimmer-effect" data-id="${skill.id}" style="--order: ${index}">
                                <div class="skill-icon" style="will-change: transform;">${skill.icon}</div>
                                <h3>${skill.title}</h3>
                                <p>${skill.shortDesc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        this.postRender();
    },

    renderSkillDetail(skill) {
        const badgeClass = `badge-${skill.difficulty.toLowerCase().split(' ')[0]}`;
        
        this.app.innerHTML = `
            <div class="container" style="padding-top: 100px;">
                <button class="btn btn-secondary" id="back-btn">← Back to Home</button>
                
                <div class="hero" style="min-height: 60vh; align-items: center; padding: 60px 0; overflow: visible;">
                    ${this.components.skillAnimation(skill)}
                    <div class="container hero-container" style="justify-content: space-between; gap: 40px; text-align: left;">
                        <div class="hero-content" style="flex: 1; margin: 0; background: rgba(10, 10, 10, 0.4); backdrop-filter: blur(5px); padding: 30px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05);">
                            <span class="badge ${badgeClass}">${skill.difficulty}</span>
                            <div class="skill-icon" style="font-size: 5rem; margin-bottom: 20px; filter: drop-shadow(0 0 15px ${skill.themeColor});">${skill.icon}</div>
                            <h1 class="text-gradient" style="font-size: 3.5rem; margin-bottom: 20px; text-shadow: 0 0 30px rgba(255,0,60,0.2);">${skill.title}</h1>
                            <p style="font-size: 1.25rem; max-width: 600px; line-height: 1.7; color: rgba(255,255,255,0.9);">${skill.fullDesc}</p>
                            
                            <div class="expert-tip-card" style="margin-top: 30px; background: rgba(255,0,60,0.05); border: 1px solid rgba(255,0,60,0.2);">
                                <p style="font-size: 1.05rem;"><strong style="color: var(--primary);">Expert Tip:</strong> ${skill.expertTip}</p>
                            </div>
                        </div>
                        <div style="flex: 1; display: flex; justify-content: center; align-items: center;">
                            ${this.components.laptopMockup(skill.sampleCode)}
                        </div>
                    </div>
                </div>

                <div class="roadmap-container">
                    <div style="text-align: center; margin-bottom: 60px;">
                        <h2 class="hud-title" style="font-size: 2rem;">STRATEGIC LEARNING VECTOR</h2>
                        <div class="scanning-bar" style="width: 200px; margin: 0 auto;"></div>
                    </div>
                    
                    <div class="roadmap-grid">
                        ${skill.roadmap.map((step, index) => `
                            <div class="roadmap-step reveal" style="--order: ${index}">
                                <div class="step-marker">${index + 1}</div>
                                <div class="step-content shimmer-effect">
                                    <h3>${step.step}</h3>
                                    <p>${step.details}</p>
                                    ${step.resources?.length ? `
                                        <div class="step-resources">
                                            ${step.resources.map(res => `
                                                <span class="resource-tag">${res}</span>
                                            `).join('')}
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="career-outlook" style="margin-bottom: 80px;">
                    <h2 style="margin-bottom: 30px;">🚀 Career Paths & Future Trends</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                        <div class="skill-card" style="cursor: default;">
                            <h3 style="color: var(--primary); margin-bottom: 15px;">💼 Career Roles</h3>
                            <ul style="list-style: none; padding: 0;">
                                ${skill.careers.map(role => `<li style="margin-bottom: 8px; font-weight: 500;">⚡ ${role}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="skill-card" style="cursor: default;">
                            <h3 style="color: var(--secondary); margin-bottom: 15px;">🔥 Job Outlook & Trends</h3>
                            <p style="color: var(--text-main); line-height: 1.6;">${skill.upcomingJobs}</p>
                        </div>
                    </div>
                </div>

                <div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 80px;">
                    <div>
                        <h3>📺 Recommended Channels</h3>
                        <div class="resource-grid">
                            ${skill.youtube.map(ch => `
                                <a href="${ch.link}" target="_blank" class="resource-card">
                                    <span class="icon">▶</span>
                                    <span>${ch.name}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                    <div>
                        <h3>🎓 Recommended Courses</h3>
                        <div class="resource-grid">
                            ${skill.courses.map(c => `
                                <a href="${c.link}" target="_blank" class="resource-card secondary">
                                    <span class="icon">🎓</span>
                                    <span>${c.name}</span>
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 100px;">
                    <h3>🔥 Practice & Projects</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 30px;">
                        <div class="skill-card" style="cursor: default;">
                            <h4>Practice Topics</h4>
                            <ul style="margin-top: 15px; padding-left: 20px; color: var(--text-muted);">
                                ${skill.practice.map(p => `<li>${p.topic} (${p.difficulty})</li>`).join('')}
                            </ul>
                        </div>
                        <div class="skill-card" style="cursor: default;">
                            <h4>Project Ideas</h4>
                            <ul style="margin-top: 15px; padding-left: 20px; color: var(--text-muted);">
                                ${skill.projects.map(p => `<li>${p}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('back-btn').addEventListener('click', () => this.navigateTo(null));
        
        // Trigger roadmap entrance animation
        setTimeout(() => {
            document.querySelectorAll('.roadmap-step').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateX(0)';
            });
        }, 50);
    },

    // --- SYSTEMS ---
    postRender() {
        document.querySelectorAll('.skill-card[data-id]').forEach(card => {
            card.addEventListener('click', () => {
                this.navigateTo(card.dataset.id);
            });
        });
        this.observeElements();
    },

    initParticles() {
        const pContainer = document.createElement('div');
        pContainer.className = 'particles';
        this.body.appendChild(pContainer);

        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.cssText = `
                left: ${Math.random() * 100}vw;
                animation-duration: ${Math.random() * 8 + 4}s;
                opacity: ${Math.random() * 0.4};
                transform: scale(${Math.random() * 1.5});
            `;
            pContainer.appendChild(p);
        }
    },

    initIntersectionObserver() {
        this.state.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    },

    observeElements() {
        document.querySelectorAll('.reveal').forEach(el => this.state.observer.observe(el));
        this.initTiltEffect();
    },

    initTiltEffect() {
        document.querySelectorAll('.skill-card, .news-card, .journey-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)`;
            });
        });
    },

    // --- SEARCH SYSTEM ---
    initSearch() {
        if (!this.searchInput) return;

        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 1) {
                this.searchResults.style.display = 'none';
                return;
            }

            const matches = skillsData.filter(s => 
                s.title.toLowerCase().includes(query) || 
                s.shortDesc.toLowerCase().includes(query)
            );

            this.renderSearchResults(matches);
        });

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                this.searchResults.style.display = 'none';
            }
        });
    },

    renderSearchResults(matches) {
        if (matches.length === 0) {
            this.searchResults.innerHTML = '<div class="search-item">No roadmaps found...</div>';
        } else {
            this.searchResults.innerHTML = matches.map(s => `
                <div class="search-item" data-id="${s.id}">
                    <span class="icon">${s.icon}</span>
                    <div style="display: flex; flex-direction: column;">
                        <span style="font-weight: 600;">${s.title}</span>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">${s.difficulty}</span>
                    </div>
                </div>
            `).join('');
        }
        
        this.searchResults.style.display = 'block';

        this.searchResults.querySelectorAll('.search-item[data-id]').forEach(item => {
            item.addEventListener('click', () => {
                this.navigateTo(item.dataset.id);
                this.searchInput.value = '';
                this.searchResults.style.display = 'none';
            });
        });
    },

    // --- NAV LINK SYSTEMS ---
    initNavLinks() {
        document.getElementById('nav-quiz').addEventListener('click', (e) => {
            e.preventDefault();
            this.renderQuiz();
        });

        document.getElementById('nav-progress').addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateTo(null, 'journey');
        });

        document.getElementById('nav-news').addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateTo(null, 'news');
        });

        document.getElementById('btn-login-trigger')?.addEventListener('click', () => {
            this.renderAuthModal('login');
        });
    },

    // --- AUTH SYSTEM ---
    initAuth() {
        const savedUser = localStorage.getItem('cc_user');
        if (savedUser) {
            this.state.user = JSON.parse(savedUser);
            this.state.isLoggedIn = true;
        }
    },

    updateAuthUI() {
        if (!this.authContainer) return;

        if (this.state.isLoggedIn) {
            const initial = this.state.user.name.charAt(0).toUpperCase();
            this.authContainer.innerHTML = `
                <div class="user-badge glitch-hover">
                    <div class="avatar">${initial}</div>
                    <span style="font-size: 0.9rem; font-weight: 600;">${this.state.user.name}</span>
                </div>
                <span class="logout-btn" onclick="AppEngine.logout()">Logout</span>
            `;
        } else {
            this.authContainer.innerHTML = `
                <button class="btn btn-secondary btn-sm" id="btn-login-trigger">Login</button>
            `;
            document.getElementById('btn-login-trigger')?.addEventListener('click', () => {
                this.renderAuthModal('login');
            });
        }
    },

    logout() {
        localStorage.removeItem('cc_user');
        this.state.user = null;
        this.state.isLoggedIn = false;
        this.navigateTo(null); // Back to home
    },

    renderAuthModal(mode = 'login') {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
                <div class="modal-content shimmer-effect" style="border: 1px solid var(--primary); background: rgba(5, 5, 5, 0.98); padding: 0; max-width: 450px;">
                <button class="modal-close" style="top: 15px; right: 15px;">×</button>
                <div style="background: linear-gradient(to right, #ff9d00, #ff4d00); padding: 25px; text-align: center;">
                    <h2 style="color: #000; font-family: 'Orbitron', sans-serif; letter-spacing: 2px; font-size: 1.2rem;">NEURAL ACCESS CONTROL</h2>
                    <p style="color: #000; font-size: 0.75rem; font-weight: 700; opacity: 0.8;">C.O.D.E.X. SECURE PROTOCOL v4.0</p>
                </div>
                <div style="padding: 35px;">
                    <div class="auth-tabs" style="border-bottom: 2px solid rgba(255,157,0,0.1); margin-bottom: 30px;">
                        <div class="auth-tab ${mode === 'login' ? 'active' : ''}" id="tab-login" style="flex: 1; text-align: center; padding: 15px; font-family: 'Share Tech Mono', monospace; cursor: pointer;">[ LOGIN ]</div>
                        <div class="auth-tab ${mode === 'signup' ? 'active' : ''}" id="tab-signup" style="flex: 1; text-align: center; padding: 15px; font-family: 'Share Tech Mono', monospace; cursor: pointer;">[ SIGNUP ]</div>
                    </div>
                    <div id="auth-form-container"></div>
                </div>
            </div>
        `;
        this.body.appendChild(modal);
        
        const closeFn = () => modal.remove();
        modal.querySelector('.modal-close').onclick = closeFn;

        const renderForm = (m) => {
            const container = document.getElementById('auth-form-container');
            if (m === 'login') {
                container.innerHTML = `
                    <form class="auth-form" id="login-form" style="display: flex; flex-direction: column; gap: 20px;">
                        <div class="form-group">
                            <label style="color: #ff9d00; font-family: 'Share Tech Mono', monospace; font-size: 0.8rem; margin-bottom: 8px; display: block;">USER DESIGNATION (EMAIL)</label>
                            <input type="email" id="login-email" required placeholder="identifier@codex.ai" style="width: 100%; padding: 14px; background: rgba(255,157,0,0.05); border: 1px solid rgba(255,157,0,0.3); color: #fff; font-family: 'Share Tech Mono', monospace;">
                        </div>
                        <div class="form-group">
                            <label style="color: #ff9d00; font-family: 'Share Tech Mono', monospace; font-size: 0.8rem; margin-bottom: 8px; display: block;">ACCESS CODE (PASSWORD)</label>
                            <input type="password" id="login-pass" required placeholder="••••••••" style="width: 100%; padding: 14px; background: rgba(255,157,0,0.05); border: 1px solid rgba(255,157,0,0.3); color: #fff; font-family: 'Share Tech Mono', monospace;">
                        </div>
                        <button type="submit" class="btn btn-primary shimmer-effect" style="margin-top: 20px; border-radius: 4px; padding: 18px; font-family: 'Orbitron', sans-serif;">AUTHORIZE ACCESS</button>
                        <p id="auth-error" style="color: #ff003c; font-size: 0.75rem; text-align: center; margin-top: 10px; display: none; font-family: 'Share Tech Mono', monospace;">INVALID ACCESS SIGNATURE DETECTED</p>
                    </form>
                `;
            } else {
                container.innerHTML = `
                    <form class="auth-form" id="signup-form" style="display: flex; flex-direction: column; gap: 20px;">
                        <div class="form-group">
                            <label style="color: #ff9d00; font-family: 'Share Tech Mono', monospace; font-size: 0.8rem; margin-bottom: 8px; display: block;">FULL NAME</label>
                            <input type="text" id="signup-name" required placeholder="Explorer Name" style="width: 100%; padding: 14px; background: rgba(255,157,0,0.05); border: 1px solid rgba(255,157,0,0.3); color: #fff; font-family: 'Share Tech Mono', monospace;">
                        </div>
                        <div class="form-group">
                            <label style="color: #ff9d00; font-family: 'Share Tech Mono', monospace; font-size: 0.8rem; margin-bottom: 8px; display: block;">EMAIL ADDRESS</label>
                            <input type="email" id="signup-email" required placeholder="name@email.com" style="width: 100%; padding: 14px; background: rgba(255,157,0,0.05); border: 1px solid rgba(255,157,0,0.3); color: #fff; font-family: 'Share Tech Mono', monospace;">
                        </div>
                        <div class="form-group">
                            <label style="color: #ff9d00; font-family: 'Share Tech Mono', monospace; font-size: 0.8rem; margin-bottom: 8px; display: block;">CREATE PASSWORD</label>
                            <input type="password" id="signup-pass" required placeholder="••••••••" style="width: 100%; padding: 14px; background: rgba(255,157,0,0.05); border: 1px solid rgba(255,157,0,0.3); color: #fff; font-family: 'Share Tech Mono', monospace;">
                        </div>
                        <button type="submit" class="btn btn-primary shimmer-effect" style="margin-top: 20px; border-radius: 4px; padding: 18px; font-family: 'Orbitron', sans-serif;">INITIALIZE ACCOUNT</button>
                    </form>
                `;
            }

            // Form Submit Logic
            container.querySelector('form').onsubmit = (e) => {
                e.preventDefault();
                if (m === 'login') {
                    const email = document.getElementById('login-email').value;
                    const pass = document.getElementById('login-pass').value;
                    this.handleLogin(email, pass, closeFn);
                }
                else this.handleSignup(closeFn);
            };
        };

        renderForm(mode);

        document.getElementById('tab-login').onclick = () => {
             document.getElementById('tab-login').classList.add('active');
             document.getElementById('tab-signup').classList.remove('active');
             renderForm('login');
        };
        document.getElementById('tab-signup').onclick = () => {
             document.getElementById('tab-signup').classList.add('active');
             document.getElementById('tab-login').classList.remove('active');
             renderForm('signup');
        };
    },

    handleLogin(email, pass, closeFn) {
        const errorEl = document.getElementById('auth-error');
        
        // --- CODES SECURITY ENFORCEMENT ---
        // Pre-seeded Admin/User
        const adminEmail = "codex@agent.ai";
        const adminPass = "concept_crush";
        
        const users = JSON.parse(localStorage.getItem('cc_users') || '[]');
        const foundUser = users.find(u => u.email === email && u.pass === pass) || 
                         (email === adminEmail && pass === adminPass ? { name: "Lead Explorer", email: adminEmail } : null);

        if (foundUser) {
            this.showNotification("CODEX: Access Signature Verified. Welcome back, " + foundUser.name, "ai");
            this.state.user = foundUser;
            localStorage.setItem('cc_user', JSON.stringify(foundUser));
            this.state.isLoggedIn = true;
            closeFn();
        } else {
            errorEl.style.display = 'block';
            this.showNotification("CODEX: Error. Invalid access credentials detected.", "info");
        }
    },

    handleSignup(closeFn) {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const pass = document.getElementById('signup-pass').value;
        
        const newUser = { name, email, pass };
        const users = JSON.parse(localStorage.getItem('cc_users') || '[]');
        
        // Check if email already exists
        if (users.some(u => u.email === email)) {
            this.showNotification("CODEX: Error. Designation already exists in local database.", "info");
            return;
        }

        users.push(newUser);
        localStorage.setItem('cc_users', JSON.stringify(users));
        localStorage.setItem('cc_user', JSON.stringify(newUser));
        
        this.showNotification(`CODEX: Neural Signature Created for Explorer ${name}. Welcome to the grid.`, "ai");
        this.state.user = newUser;
        this.state.isLoggedIn = true;
        closeFn();
    },

    // --- CODEX SYSTEM ---
    initAIMentor() {
        this.notifPortal = document.createElement('div');
        this.notifPortal.className = 'notification-portal';
        this.body.appendChild(this.notifPortal);

        // Track daily visits
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('cc_last_visit');
        if (lastVisit !== today) {
            localStorage.setItem('cc_last_visit', today);
            this.state.visitedToday = 0;
            setTimeout(() => this.showNotification("CODEX: Daily trajectory reset. Initiating new learning cycle.", "ai"), 2000);
        }

        // Periodic motivation
        setInterval(() => {
            if (Math.random() > 0.7 && !window.location.search.includes('skill')) {
                const randomSkill = skillsData[Math.floor(Math.random()*skillsData.length)];
                this.showNotification("CODEX: New insights detected in " + randomSkill.title + " sector.", "info");
            }
        }, 120000); // Every 2 minutes
    },

    showNotification(msg, type = 'info') {
        if (!this.notifPortal) return;
        const notif = document.createElement('div');
        notif.className = 'jarvis-notif';
        notif.innerHTML = `
            <div class="notif-header">
                <div class="pulse-ai" style="${type === 'ai' ? 'background: #ff9d00;' : 'background: #ff003c;'}"></div>
                <span>SYSTEM ${type === 'ai' ? 'CORE' : 'ANALYSIS'} // 74% LOAD</span>
            </div>
            <div class="hud-text" style="font-size: 0.85rem;">${msg}</div>
            <div class="scanning-bar"></div>
        `;
        this.notifPortal.appendChild(notif);
        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transform = 'translateY(-20px) scale(0.9)';
            setTimeout(() => notif.remove(), 500);
        }, 6000);
    },

    getAITip(visitedCount) {
        const tips = [
            "CODEX Analysis: Probability of success increases by 40% if we master " + (skillsData[visitedCount]?.title || 'algorithms') + " today.",
            "I've analyzed the global job market; specializing in AI seems prudent.",
            "Data suggests practical implementation is your strongest learning vector.",
            "Strategic trajectory suggests a Senior level proficiency within months.",
            "Neural energy levels optimal. Shall we proceed with the next technical sector?"
        ];
        return tips[visitedCount % tips.length];
    },

    trackProgress() {
        window.addEventListener('skillVisited', (e) => {
            let visited = JSON.parse(localStorage.getItem('cc_visited') || '[]');
            if (!visited.includes(e.detail.id)) {
                visited.push(e.detail.id);
                localStorage.setItem('cc_visited', JSON.stringify(visited));
                this.state.visitedToday++;
                this.showNotification(`CODEX: Knowledge logged for ${e.detail.title}. Database updated.`, "ai");
            }
        });
    },

    renderQuiz() {
        this.showNotification("CODEX: Initiating Strategic Deployment Phase. Scanning career vectors...", "ai");
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content shimmer-effect" style="border: 2px solid var(--primary); box-shadow: 0 0 50px rgba(255,157,0,0.2);">
                <button class="modal-close">×</button>
                <div id="quiz-container">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <div class="arc-reactor" style="width: 60px; height: 60px; margin: 0 auto 20px;">
                            <div class="ring ring-1"></div>
                            <div class="ring ring-3" style="animation-duration: 1s;"></div>
                        </div>
                        <h2 class="hud-title" style="font-size: 1.5rem;">C.O.D.E.X. Path Finder</h2>
                        <p style="color: var(--text-muted); font-family: 'Share Tech Mono', monospace;">ANALYZING BIOMETRICS...</p>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 20px; background: rgba(0,0,0,0.3); padding: 30px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05);">
                        <p style="font-size: 1.1rem; text-align: center;">Identify your technical signature, Explorer.</p>
                        <input type="text" id="user-name" placeholder="ENTER YOUR DESIGNATION" style="width: 100%; padding: 15px 25px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,157,0,0.3); border-radius: 4px; color: #ff9d00; font-family: 'Share Tech Mono', monospace; font-size: 1.1rem; text-align: center;">
                        <button class="btn btn-primary shimmer-effect" id="start-quiz-btn" style="width: 100%; padding: 18px; border-radius: 4px; font-family: 'Orbitron', sans-serif;">INITIATE SCAN</button>
                    </div>
                </div>
            </div>
        `;
        this.body.appendChild(modal);

        const quizContainer = document.getElementById('quiz-container');
        const closeModal = () => modal.remove();
        modal.querySelector('.modal-close').onclick = closeModal;

        document.getElementById('start-quiz-btn').onclick = () => {
            const userName = document.getElementById('user-name').value || "UNKNOWN_SUBJECT";
            this.showNotification(`CODEX: Subject ${userName} identified. Proceeding to career vector analysis.`, "ai");
            this.runQuizFlow(quizContainer, userName, closeModal);
        };
    },

    runQuizFlow(container, userName, closeFn) {
        const questions = [
            {
                q: `Hello <span>${userName}</span>! What excites you more?`,
                options: [
                    { text: "🎨 Building beautiful interfaces", val: "design" },
                    { text: "📂 Managing data and logic", val: "logic" }
                ]
            },
            {
                q: "What kind of projects do you dream of building?",
                options: [
                    { text: "📱 Mobile Apps for millions", val: "app" },
                    { text: "🧠 Intelligent AI systems", val: "ai" },
                    { text: "🔗 Secure Decentralized Webs", val: "blockchain" },
                    { text: "💻 Modern Web Platforms", val: "web" }
                ]
            },
            {
                q: "How do you prefer solving problems?",
                options: [
                    { text: "🛡️ By securing and Protecting", val: "security" },
                    { text: "🚂 By Automating and Scaling", val: "devops" },
                    { text: "📊 By Analyzing Patterns", val: "data" },
                    { text: "🎮 By Creating Worlds", val: "game" }
                ]
            }
        ];

        let currentStep = 0;
        let selectedScores = [];

        const renderStep = () => {
            const step = questions[currentStep];
            container.innerHTML = `
                <h2 class="text-gradient" style="font-size: 1.8rem;">Question ${currentStep + 1}</h2>
                <p style="margin: 15px 0 25px 0; font-size: 1.1rem; line-height: 1.4;">${step.q}</p>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${step.options.map(opt => `<button class="btn btn-secondary quiz-opt" data-val="${opt.val}" style="justify-content: flex-start; text-align: left;">${opt.text}</button>`).join('')}
                </div>
            `;

            container.querySelectorAll('.quiz-opt').forEach(btn => {
                btn.onclick = () => {
                    selectedScores.push(btn.dataset.val);
                    currentStep++;
                    if (currentStep < questions.length) {
                        renderStep();
                    } else {
                        this.showQuizResult(container, selectedScores, userName, closeFn);
                    }
                };
            });
        };

        renderStep();
    },

    showQuizResult(container, scores, userName, closeFn) {
        // Dynamic matching logic
        const allScores = skillsData.map(skill => {
            let matches = 0;
            scores.forEach(s => {
                if (skill.quizKeywords.includes(s)) matches++;
            });
            return { skill, matches };
        });

        // Ensure we find the best match
        const recommendation = allScores.sort((a, b) => b.matches - a.matches)[0].skill;

        container.innerHTML = `
            <div style="text-align: center;">
                <p style="text-transform: uppercase; color: var(--primary); font-weight: 700; letter-spacing: 2px; font-size: 0.8rem; margin-bottom: 10px;">Your Personalized Roadmap</p>
                <h2 class="text-gradient" style="font-size: 2.2rem;">Ready to go, ${userName}!</h2>
                
                <div style="font-size: 5.5rem; margin: 20px 0; filter: drop-shadow(0 0 20px ${recommendation.themeColor}44);">${recommendation.icon}</div>
                
                <h3 style="font-size: 1.5rem; margin-bottom: 10px;">${recommendation.title}</h3>
                <p style="margin: 0 auto 30px auto; color: var(--text-muted); max-width: 400px; line-height: 1.5;">${recommendation.shortDesc}</p>
                
                <div style="background: rgba(10, 10, 10, 0.4); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; padding: 25px; text-align: left;">
                    <h4 style="margin-bottom: 15px; color: var(--secondary); display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.2rem;">🎓</span> Recommended Courses for You:
                    </h4>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        ${recommendation.courses.map(c => `
                            <a href="${c.link}" target="_blank" class="resource-card" style="padding: 12px 15px; background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.05);">
                                <span class="icon" style="font-size: 1rem;">🔗</span>
                                <span style="font-size: 0.9rem; font-weight: 500;">${c.name}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>

                <div style="display: flex; gap: 15px; margin-top: 35px; justify-content: center;">
                    <button class="btn btn-primary" id="quiz-go-skill">View Full Roadmap</button>
                    <button class="btn btn-secondary" id="quiz-retry">Try Again</button>
                </div>
            </div>
        `;

        document.getElementById('quiz-go-skill').onclick = () => {
            this.navigateTo(recommendation.id);
            closeFn();
        };
        document.getElementById('quiz-retry').onclick = () => this.renderQuiz();
    },

    renderJourneyPage() {
        const visited = JSON.parse(localStorage.getItem('cc_visited') || '[]');
        const progressPercent = Math.round((visited.length / skillsData.length) * 100);
        
        // Circular Progress Math
        const radius = 54;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (progressPercent / 100) * circumference;

        const achievements = [
            { id: 'rookie', title: 'Rookie Explorer', desc: 'Visit your first roadmap', icon: '🐣', req: 1 },
            { id: 'nomad', title: 'Tech Nomad', desc: 'Visit 3 different roadmaps', icon: '🛰️', req: 3 },
            { id: 'navigator', title: 'Master Navigator', desc: 'Visit 7 different roadmaps', icon: '🪐', req: 7 },
            { id: 'architect', title: 'Solar Architect', desc: 'Complete all roadmaps', icon: '🏛️', req: skillsData.length }
        ];

        this.app.innerHTML = `
            <div class="container" style="padding-top: 120px; min-height: 100vh; padding-bottom: 100px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <button class="btn btn-secondary" onclick="AppEngine.navigateTo(null)">← Return to Command</button>
                    <div style="text-align: right;">
                        <p style="color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem;">Neural ID: ${this.state.isLoggedIn ? this.state.user.name : 'GUEST_PROBE'}</p>
                        <p style="color: var(--text-muted); font-size: 0.75rem;">Status: Synchronizing...</p>
                    </div>
                </div>
                
                <div class="section-header" style="text-align: left; margin: 50px 0;">
                    <h1 class="text-gradient" style="font-size: 4.5rem; line-height: 0.9;">My Journey<span>.</span></h1>
                    <p style="font-size: 1.4rem; margin-top: 15px; color: var(--text-muted); max-width: 600px;">Analyzing your trajectory through the technical stratosphere.</p>
                </div>

                <div class="jarvis-hud-card">
                    <div style="display: flex; gap: 40px; align-items: center;">
                        <div class="arc-reactor">
                            <div class="ring ring-1"></div>
                            <div class="ring ring-2"></div>
                            <div class="ring ring-3"></div>
                            <div style="width: 20px; height: 20px; background: #fff; border-radius: 50%; box-shadow: 0 0 20px #ff9d00;"></div>
                        </div>
                        <div style="flex: 1;">
                            <h2 class="hud-title">C.O.D.E.X.</h2>
                            <div class="scanning-bar" style="width: 40%; margin-bottom: 20px;"></div>
                            <p class="hud-text">"${this.getAITip(visited.length)}"</p>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 30px;">
                                <div class="hud-data-row"><span>NEURAL-STATUS</span><span>OPTIMAL</span></div>
                                <div class="hud-data-row"><span>SYNC PROBABILITY</span><span>${85 + visited.length}%</span></div>
                                <div class="hud-data-row"><span>CORE LOAD</span><span>2.4%</span></div>
                                <div class="hud-data-row"><span>LEARNING RATE</span><span>FAST</span></div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 35px; background: rgba(255, 157, 0, 0.05); padding: 20px; border: 1px solid rgba(255, 157, 0, 0.2); border-radius: 4px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                            <span style="font-family: 'Share Tech Mono', monospace; color: #ff9d00; font-size: 0.8rem;">TRAJECTORY ANALYSIS</span>
                            <span style="font-family: 'Share Tech Mono', monospace; color: #ff9d00; font-size: 0.8rem;">PROBABILITY: HIGH</span>
                        </div>
                        <div style="height: 4px; background: rgba(255, 157, 0, 0.1);">
                            <div style="width: ${progressPercent}%; height: 100%; background: #ff9d00; box-shadow: 0 0 15px #ff9d00;"></div>
                        </div>
                    </div>
                </div>

                <div class="journey-stats-grid">
                    <div class="stat-card-premium">
                        <div class="progress-circle-container">
                            <svg class="progress-circle-svg" width="120" height="120">
                                <circle class="progress-circle-bg" cx="60" cy="60" r="${radius}"></circle>
                                <circle class="progress-circle-bar" cx="60" cy="60" r="${radius}" 
                                    style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};"></circle>
                            </svg>
                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5rem; font-weight: 800;">${progressPercent}%</div>
                        </div>
                        <h3>Global Sync</h3>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">Overall knowledge coverage</p>
                    </div>

                    <div class="stat-card-premium" style="justify-content: center;">
                        <div style="font-size: 3.5rem; font-weight: 800; color: var(--primary); text-shadow: 0 0 20px var(--primary-glow);">${visited.length}</div>
                        <h3 style="margin-top: 10px;">Roadmaps Scanned</h3>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">Data points successfully logged</p>
                    </div>

                    <div class="stat-card-premium" style="justify-content: center;">
                        <div style="font-size: 3.5rem; font-weight: 800; color: var(--secondary); text-shadow: 0 0 20px var(--secondary-glow);">${achievements.filter(a => visited.length >= a.req).length}</div>
                        <h3 style="margin-top: 10px;">Milestones Met</h3>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">Achievements unlocked in system</p>
                    </div>
                </div>

                <div style="margin-top: 80px;">
                    <div class="milestone-header">
                        <h2 style="font-size: 1.8rem;">System Achievements</h2>
                        <div class="milestone-line"></div>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
                        ${achievements.map(a => `
                            <div class="achievement-badge ${visited.length >= a.req ? 'unlocked' : ''}">
                                <div class="achievement-icon">${a.icon}</div>
                                <div class="achievement-info">
                                    <h4>${a.title}</h4>
                                    <p>${a.desc}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="milestone-section">
                    <div class="milestone-header">
                        <h2 style="font-size: 1.8rem;">Exploration Log</h2>
                        <div class="milestone-line"></div>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        ${visited.length ? visited.map(id => {
                            const skill = skillsData.find(s => s.id === id);
                            return `
                                <div class="journey-card glitch-hover" onclick="AppEngine.navigateTo('${id}')">
                                    <div class="journey-card-icon">${skill.icon}</div>
                                    <div style="flex-grow: 1;">
                                        <h3 style="font-size: 1.2rem; margin-bottom: 5px;">${skill.title}</h3>
                                        <p style="font-size: 0.85rem; color: var(--text-muted);">${skill.shortDesc}</p>
                                    </div>
                                    <div style="color: var(--primary); font-weight: 800; font-size: 0.8rem; letter-spacing: 1px;">VIEW LOG >></div>
                                </div>
                            `;
                        }).join('') : `
                            <div style="text-align: center; padding: 60px; background: rgba(255,255,255,0.02); border: 2px dashed rgba(255,255,255,0.05); border-radius: 30px;">
                                <div style="font-size: 4rem; opacity: 0.3; margin-bottom: 20px;">🛰️</div>
                                <h3 style="color: var(--text-muted);">No signals detected. Start exploration to populate log.</h3>
                                <button class="btn btn-primary" style="margin-top: 25px;" onclick="AppEngine.navigateTo(null)">Initiate First Probe</button>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
        
        this.postRender();
    },

    async renderNewsPage() {
        this.app.innerHTML = `
            <div class="container" style="padding-top: 120px; min-height: 80vh;">
                <button class="btn btn-secondary" style="margin-bottom: 40px;" onclick="AppEngine.navigateTo(null)">← Back to Home</button>
                
                <div class="section-header" style="text-align: left; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px;">
                    <div>
                        <p style="color: var(--primary); font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Live AI News Aggregator</p>
                        <h1 class="text-gradient" style="font-size: 3.5rem;">Tech Pulse<span>.</span></h1>
                        <p style="font-size: 1.2rem; margin-top: 10px; color: var(--text-muted);">Neural engine scanning 100+ global sources...</p>
                    </div>
                    <div id="ai-status" style="background: rgba(0,255,255,0.05); border: 1px solid rgba(0,255,255,0.2); padding: 10px 20px; border-radius: 12px; display: flex; align-items: center; gap: 10px;">
                        <span class="pulse" style="width: 10px; height: 10px; background: #00ffff; margin: 0;"></span>
                        <span style="font-family: monospace; font-size: 0.8rem; color: #00ffff;">AI SYNC: ACTIVE</span>
                    </div>
                </div>

                <div id="news-feed" class="news-grid">
                    <div class="news-loader">
                        <div class="pulse"></div>
                        <p>Aggregating latest tech intelligence...</p>
                    </div>
                </div>
            </div>
        `;

        this.postRender();
        
        try {
            // Using a free CORS-friendly news aggregator API
            const response = await fetch('https://ok.surf/api/v1/cors/news-feed');
            const data = await response.json();
            
            // Extract 'Technology' category
            const techNews = data.Technology || [];

            const feed = document.getElementById('news-feed');
            if (techNews.length === 0) throw new Error("No news found");

            feed.innerHTML = techNews.slice(0, 12).map(news => `
                <div class="news-card glitch-hover" onclick="window.open('${news.link}', '_blank')" style="content-visibility: auto;">
                    <img src="${news.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800'}" 
                         alt="${news.title}" 
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800'">
                    <div class="news-content">
                        <span class="news-tag">${news.source}</span>
                        <h3 class="news-title">${news.title}</h3>
                        <p class="news-desc">Processed via CODEX Neural Interface. Source: ${news.source}</p>
                        <div class="read-more">Analyze Insights →</div>
                    </div>
                </div>
            `).join('');

            // Update AI status
            document.getElementById('ai-status').innerHTML = `
                <span class="pulse" style="width: 10px; height: 10px; background: #00ff62; margin: 0; box-shadow: 0 0 10px #00ff62;"></span>
                <span style="font-family: monospace; font-size: 0.8rem; color: #00ff62;">NEURAL SYNC: COMPLETED [${techNews.length} ARTICLES]</span>
            `;

        } catch (error) {
            console.error("AI Sync Error:", error);
            document.getElementById('news-feed').innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 50px;">
                    <h2 style="color: var(--primary);">Neural Engine Offline</h2>
                    <p style="color: var(--text-muted); margin-top: 10px;">The AI could not reach the news frequency. Check your neural connection (Internet).</p>
                    <button class="btn btn-primary" style="margin-top: 20px;" onclick="AppEngine.renderNewsPage()">Retry AI Sync</button>
                </div>
            `;
        }
    },

    injectGlobalStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .reveal { opacity: 1 !important; transform: translateY(0) !important; }
            .btn-sm { padding: 8px 16px; font-size: 0.85rem; }
            .modal-overlay {
                position: fixed;
                top: 0; left: 0;
                width: 100%; height: 100%;
                background: rgba(0,0,0,0.85);
                backdrop-filter: blur(10px);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .modal-content {
                background: var(--bg-card);
                border: 1px solid var(--primary-glow);
                padding: 40px;
                border-radius: 24px;
                max-width: 500px;
                width: 90%;
                position: relative;
                box-shadow: 0 0 50px rgba(255,0,60,0.1);
            }
            .modal-close {
                position: absolute;
                top: 20px; right: 20px;
                background: none; border: none;
                color: var(--text-muted);
                font-size: 2rem;
                cursor: pointer;
            }
            .modal-close:hover { color: var(--primary); }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

            .resource-item {
                display: block;
                padding: 15px;
                background: rgba(255,255,255,0.03);
                border-radius: 12px;
                margin-bottom: 10px;
                border: 1px solid rgba(255,255,255,0.05);
                transition: all 0.3s ease;
                color: var(--text-main);
            }
            .resource-item:hover {
                background: rgba(255,0,60,0.1);
                border-color: var(--primary);
                transform: translateX(10px);
            }
            .resource-item.secondary:hover {
                background: rgba(255,77,0,0.1);
                border-color: var(--secondary);
            }
            .resource-item span { color: var(--primary); margin-right: 10px; }
            .resource-item.secondary span { color: var(--secondary); }
        `;
        document.head.appendChild(style);
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => AppEngine.init());
