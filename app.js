// NutriPlan - Planejador Alimentar em Vanilla JavaScript

const STORAGE_KEY = 'nutriplan_data_v1';
const THEME_KEY = 'nutriplan_theme';

const DAYS = [
  { id: 'segunda', label: 'Segunda-feira', short: 'Seg' },
  { id: 'terca', label: 'Terça-feira', short: 'Ter' },
  { id: 'quarta', label: 'Quarta-feira', short: 'Qua' },
  { id: 'quinta', label: 'Quinta-feira', short: 'Qui' },
  { id: 'sexta', label: 'Sexta-feira', short: 'Sex' },
  { id: 'sabado', label: 'Sábado', short: 'Sáb' },
  { id: 'domingo', label: 'Domingo', short: 'Dom' },
];

const MEALS_CONFIG = [
  { id: 'cafe', title: 'Café da Manhã', icon: 'sunrise', time: '07:30' },
  { id: 'lanche_manha', title: 'Lanche da Manhã', icon: 'apple', time: '10:00' },
  { id: 'almoco', title: 'Almoço', icon: 'salad', time: '12:30' },
  { id: 'lanche_tarde', title: 'Lanche da Tarde', icon: 'sandwich', time: '16:00' },
  { id: 'jantar', title: 'Jantar', icon: 'soup', time: '19:30' },
  { id: 'ceia', title: 'Ceia', icon: 'moon', time: '22:00' },
];

// Dados Iniciais de Demonstração
const DEFAULT_DATA = {
  targetKcal: 2000,
  waterByDay: {
    segunda: 1500,
    terca: 1750,
    quarta: 2000,
    quinta: 1250,
    sexta: 2000,
    sabado: 1000,
    domingo: 1500
  },
  days: {
    segunda: {
      cafe: [
        { id: 1, name: 'Ovos mexidos', portion: '2 unidades', kcal: 160, protein: 12 },
        { id: 2, name: 'Pão integral', portion: '2 fatias', kcal: 130, protein: 6 },
        { id: 3, name: 'Café preto s/ açúcar', portion: '1 xícara', kcal: 5, protein: 0 }
      ],
      lanche_manha: [
        { id: 4, name: 'Maçã gala', portion: '1 média', kcal: 72, protein: 0.5 },
        { id: 5, name: 'Castanha-do-pará', portion: '2 unidades', kcal: 65, protein: 1.5 }
      ],
      almoco: [
        { id: 6, name: 'Peito de frango grelhado', portion: '150g', kcal: 240, protein: 46 },
        { id: 7, name: 'Arroz integral cozido', portion: '100g', kcal: 120, protein: 3 },
        { id: 8, name: 'Feijão preto', portion: '1 concha (100g)', kcal: 90, protein: 6 },
        { id: 9, name: 'Salada mista com azeite', portion: '1 prato', kcal: 70, protein: 2 }
      ],
      lanche_tarde: [
        { id: 10, name: 'Iogurte natural desnatado', portion: '1 pote (170g)', kcal: 85, protein: 8 },
        { id: 11, name: 'Aveia em flocos', portion: '2 colheres (30g)', kcal: 110, protein: 4 }
      ],
      jantar: [
        { id: 12, name: 'Filé de tilápia grelhada', portion: '160g', kcal: 180, protein: 34 },
        { id: 13, name: 'Batata doce assada', portion: '120g', kcal: 105, protein: 2 },
        { id: 14, name: 'Brócolis e cenoura no vapor', portion: '150g', kcal: 55, protein: 3 }
      ],
      ceia: [
        { id: 15, name: 'Chá de camomila', portion: '1 xícara', kcal: 2, protein: 0 }
      ]
    },
    terca: {
      cafe: [
        { id: 16, name: 'Vitamina de banana com aveia e leite', portion: '300ml', kcal: 260, protein: 11 },
        { id: 17, name: 'Torrada integral com queijo branco', portion: '2 un', kcal: 140, protein: 9 }
      ],
      lanche_manha: [
        { id: 18, name: 'Iogurte grego', portion: '100g', kcal: 95, protein: 7 }
      ],
      almoco: [
        { id: 19, name: 'Patinho moído refogado', portion: '140g', kcal: 240, protein: 38 },
        { id: 20, name: 'Purê de abóbora cabotiá', portion: '120g', kcal: 60, protein: 1.5 },
        { id: 21, name: 'Salada de folhas verdes', portion: '1 prato', kcal: 30, protein: 1 }
      ],
      lanche_tarde: [
        { id: 22, name: 'Banana prata com canela', portion: '1 unidade', kcal: 90, protein: 1 }
      ],
      jantar: [
        { id: 23, name: 'Omelete de 3 claras e 1 gema com espinafre', portion: '1 unidade', kcal: 150, protein: 18 },
        { id: 24, name: 'Salada de tomate e pepino', portion: '1 porção', kcal: 45, protein: 1 }
      ],
      ceia: [
        { id: 25, name: 'Chá de hortelã', portion: '1 xícara', kcal: 2, protein: 0 }
      ]
    },
    quarta: { cafe: [], lanche_manha: [], almoco: [], lanche_tarde: [], jantar: [], ceia: [] },
    quinta: { cafe: [], lanche_manha: [], almoco: [], lanche_tarde: [], jantar: [], ceia: [] },
    sexta: { cafe: [], lanche_manha: [], almoco: [], lanche_tarde: [], jantar: [], ceia: [] },
    sabado: { cafe: [], lanche_manha: [], almoco: [], lanche_tarde: [], jantar: [], ceia: [] },
    domingo: { cafe: [], lanche_manha: [], almoco: [], lanche_tarde: [], jantar: [], ceia: [] }
  }
};

// Estado da Aplicação
let appState = {
  activeDay: 'segunda',
  data: loadData()
};

// Funções de Armazenamento
function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Erro ao ler do localStorage', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.data));
  } catch (e) {
    console.error('Erro ao salvar no localStorage', e);
  }
}

// Funções de Tema (Modo Claro / Modo Escuro)
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
  applyTheme(isDark);
}

function applyTheme(isDark) {
  const html = document.documentElement;
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  if (isDark) {
    html.classList.add('dark');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', 'sun');
      themeIcon.className = 'w-4 h-4 text-amber-300';
    }
    if (themeLabel) themeLabel.textContent = 'Claro';
  } else {
    html.classList.remove('dark');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', 'moon');
      themeIcon.className = 'w-4 h-4 text-amber-200';
    }
    if (themeLabel) themeLabel.textContent = 'Escuro';
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  const newTheme = !isDark;
  localStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light');
  applyTheme(newTheme);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupDayTabs();
  setupEventListeners();
  render();
});

// Configuração das Abas de Dias
function setupDayTabs() {
  const container = document.getElementById('day-tabs');
  container.innerHTML = '';

  DAYS.forEach(day => {
    const btn = document.createElement('button');
    btn.className = `day-tab px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap flex items-center gap-1.5 ${
      day.id === appState.activeDay
        ? 'bg-emerald-600 text-white shadow-sm font-semibold'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white'
    }`;
    btn.dataset.day = day.id;
    btn.innerHTML = `<span>${day.label}</span>`;
    btn.addEventListener('click', () => {
      appState.activeDay = day.id;
      setupDayTabs();
      render();
    });
    container.appendChild(btn);
  });
}

// Configurar ouvintes de eventos globais
function setupEventListeners() {
  // Alternador de tema (Modo Escuro / Claro)
  const themeBtn = document.getElementById('btn-theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
  // Input de meta calórica
  const targetKcalInput = document.getElementById('input-target-kcal');
  targetKcalInput.value = appState.data.targetKcal || 2000;
  targetKcalInput.addEventListener('change', (e) => {
    const val = parseInt(e.target.value) || 2000;
    appState.data.targetKcal = Math.max(500, Math.min(10000, val));
    saveData();
    renderStats();
  });

  // Botões de água
  document.getElementById('btn-add-water').addEventListener('click', () => updateWater(250));
  document.getElementById('btn-sub-water').addEventListener('click', () => updateWater(-250));
  document.getElementById('btn-water').addEventListener('click', () => updateWater(250));

  // Botão de Imprimir
  document.getElementById('btn-print').addEventListener('click', () => {
    const activeDayObj = DAYS.find(d => d.id === appState.activeDay);
    document.getElementById('print-date').textContent = `${activeDayObj ? activeDayObj.label : ''} • Atualizado em ${new Date().toLocaleDateString('pt-BR')}`;
    window.print();
  });

  // Dropdown Mais Opções
  const moreBtn = document.getElementById('btn-more-options');
  const dropdown = document.getElementById('dropdown-menu');
  moreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });
  document.addEventListener('click', () => {
    dropdown.classList.add('hidden');
  });

  // Exportar JSON
  document.getElementById('btn-export').addEventListener('click', exportData);

  // Importar JSON
  document.getElementById('input-import').addEventListener('change', importData);

  // Restaurar Exemplo
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Tem certeza que deseja restaurar os dados de exemplo? Suas alterações serão substituídas.')) {
      appState.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
      saveData();
      render();
      alert('Plano restaurado com sucesso!');
    }
  });

  // Modal Lista de Compras
  const modalShopping = document.getElementById('modal-shopping-list');
  document.getElementById('btn-shopping-list').addEventListener('click', () => {
    openShoppingList();
  });
  document.getElementById('btn-close-modal').addEventListener('click', () => {
    modalShopping.classList.add('hidden');
  });
  document.getElementById('btn-close-shopping-btn').addEventListener('click', () => {
    modalShopping.classList.add('hidden');
  });
  document.getElementById('btn-copy-shopping').addEventListener('click', copyShoppingList);
}

// Atualizar Água
function updateWater(delta) {
  const current = appState.data.waterByDay[appState.activeDay] || 0;
  const updated = Math.max(0, current + delta);
  appState.data.waterByDay[appState.activeDay] = updated;
  saveData();
  renderWater();
}

// Renderizar todo o painel
function render() {
  const activeDayObj = DAYS.find(d => d.id === appState.activeDay) || DAYS[0];
  document.getElementById('current-day-title').textContent = activeDayObj.label;

  renderMeals();
  renderStats();
  renderWater();

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Renderizar Estatísticas do Dia
function renderStats() {
  const dayData = appState.data.days[appState.activeDay] || {};
  let totalKcal = 0;
  let totalProtein = 0;

  Object.values(dayData).forEach(mealItems => {
    if (Array.isArray(mealItems)) {
      mealItems.forEach(item => {
        totalKcal += Number(item.kcal) || 0;
        totalProtein += Number(item.protein) || 0;
      });
    }
  });

  const targetKcal = appState.data.targetKcal || 2000;
  document.getElementById('total-kcal').textContent = Math.round(totalKcal);
  document.getElementById('total-protein').textContent = Math.round(totalProtein);
  document.getElementById('target-kcal-display').textContent = targetKcal;

  const percent = Math.min(100, Math.round((totalKcal / targetKcal) * 100));
  document.getElementById('progress-percent').textContent = `${percent}%`;
  
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = `${percent}%`;
  if (percent > 100) {
    progressBar.className = 'bg-amber-500 h-full rounded-full transition-all duration-300';
  } else {
    progressBar.className = 'bg-emerald-500 h-full rounded-full transition-all duration-300';
  }
}

// Renderizar Água
function renderWater() {
  const water = appState.data.waterByDay[appState.activeDay] || 0;
  document.getElementById('daily-water').textContent = water;
  document.getElementById('water-counter').textContent = `${water} / 2000 ml`;
}

// Renderizar Refeições
function renderMeals() {
  const container = document.getElementById('meals-container');
  container.innerHTML = '';

  const dayData = appState.data.days[appState.activeDay] || {};

  MEALS_CONFIG.forEach(meal => {
    if (!dayData[meal.id]) {
      dayData[meal.id] = [];
    }
    const items = dayData[meal.id];

    let mealKcal = 0;
    let mealProtein = 0;
    items.forEach(i => {
      mealKcal += Number(i.kcal) || 0;
      mealProtein += Number(i.protein) || 0;
    });

    const card = document.createElement('div');
    card.className = 'meal-card bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between transition-colors duration-200';

    // Header da refeição
    let itemsHtml = '';
    if (items.length === 0) {
      itemsHtml = `<p class="text-sm text-slate-400 dark:text-slate-500 italic py-2">Nenhum alimento cadastrado nesta refeição.</p>`;
    } else {
      itemsHtml = items.map(item => `
        <div class="meal-item flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/80 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-700/40 rounded-lg px-1 transition">
          <div class="flex-1 pr-2">
            <span class="font-medium text-sm text-slate-800 dark:text-slate-100">${escapeHtml(item.name)}</span>
            <span class="text-xs text-slate-500 dark:text-slate-400 block">${escapeHtml(item.portion || '')}</span>
          </div>
          <div class="flex items-center gap-3 text-right">
            <div class="text-xs">
              <span class="font-semibold text-slate-700 dark:text-slate-200">${item.kcal || 0} kcal</span>
              <span class="text-slate-400 dark:text-slate-400 block">${item.protein || 0}g prot</span>
            </div>
            <button class="btn-remove-food text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-1 rounded transition print:hidden" 
                    title="Remover" data-meal="${meal.id}" data-id="${item.id}">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `).join('');
    }

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-3 mb-3">
          <div class="flex items-center gap-2.5">
            <div class="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-xl">
              <i data-lucide="${meal.icon}" class="w-5 h-5"></i>
            </div>
            <div>
              <h3 class="font-bold text-slate-800 dark:text-slate-100">${meal.title}</h3>
              <span class="text-xs text-slate-400 dark:text-slate-400">${meal.time}</span>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full">
              ${Math.round(mealKcal)} kcal
            </span>
          </div>
        </div>

        <div class="space-y-1 mb-4">
          ${itemsHtml}
        </div>
      </div>

      <!-- Formulário de adicionar item -->
      <form class="meal-add-form pt-3 border-t border-slate-100 dark:border-slate-700/80 print:hidden" data-meal="${meal.id}">
        <div class="grid grid-cols-12 gap-2 mb-2">
          <input type="text" placeholder="Ex: Tapioca c/ queijo" required
                 class="input-name col-span-6 px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:border-emerald-500">
          <input type="text" placeholder="Porção (ex: 1 un)"
                 class="input-portion col-span-6 px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:border-emerald-500">
        </div>
        <div class="grid grid-cols-12 gap-2">
          <input type="number" placeholder="Kcal" min="0" step="1"
                 class="input-kcal col-span-5 px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:border-emerald-500">
          <input type="number" placeholder="Prot (g)" min="0" step="0.5"
                 class="input-protein col-span-4 px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:border-emerald-500">
          <button type="submit" 
                  class="col-span-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add
          </button>
        </div>
      </form>
    `;

    // Eventos do formulário
    const form = card.querySelector('.meal-add-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('.input-name').value.trim();
      const portion = form.querySelector('.input-portion').value.trim();
      const kcal = parseFloat(form.querySelector('.input-kcal').value) || 0;
      const protein = parseFloat(form.querySelector('.input-protein').value) || 0;

      if (!name) return;

      const newItem = {
        id: Date.now() + Math.random(),
        name,
        portion,
        kcal,
        protein
      };

      appState.data.days[appState.activeDay][meal.id].push(newItem);
      saveData();
      render();
    });

    // Eventos de exclusão
    card.querySelectorAll('.btn-remove-food').forEach(btn => {
      btn.addEventListener('click', () => {
        const foodId = parseFloat(btn.dataset.id);
        const mealKey = btn.dataset.meal;
        appState.data.days[appState.activeDay][mealKey] = appState.data.days[appState.activeDay][mealKey].filter(item => item.id !== foodId);
        saveData();
        render();
      });
    });

    container.appendChild(card);
  });
}

// Abrir e Popular Lista de Compras
function openShoppingList() {
  const modal = document.getElementById('modal-shopping-list');
  const listContainer = document.getElementById('shopping-list-items');
  listContainer.innerHTML = '';

  const itemMap = new Map();

  Object.values(appState.data.days).forEach(day => {
    Object.values(day).forEach(meals => {
      if (Array.isArray(meals)) {
        meals.forEach(item => {
          if (!item.name) return;
          const cleanName = item.name.trim();
          const key = cleanName.toLowerCase();
          if (itemMap.has(key)) {
            const existing = itemMap.get(key);
            existing.count += 1;
            if (item.portion && !existing.portions.includes(item.portion)) {
              existing.portions.push(item.portion);
            }
          } else {
            itemMap.set(key, {
              name: cleanName,
              count: 1,
              portions: item.portion ? [item.portion] : []
            });
          }
        });
      }
    });
  });

  if (itemMap.size === 0) {
    listContainer.innerHTML = `<li class="text-slate-400 dark:text-slate-500 text-sm italic">Nenhum item encontrado no plano alimentar.</li>`;
  } else {
    Array.from(itemMap.values())
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(entry => {
        const li = document.createElement('li');
        li.className = 'flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-700/50 rounded-xl text-sm border border-slate-100 dark:border-slate-700';
        li.innerHTML = `
          <div class="flex items-center gap-2">
            <input type="checkbox" class="w-4 h-4 text-emerald-600 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-emerald-500">
            <span class="font-medium text-slate-800 dark:text-slate-100">${escapeHtml(entry.name)}</span>
          </div>
          <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">
            ${entry.count > 1 ? `x${entry.count}` : ''} ${entry.portions.length > 0 ? `(${escapeHtml(entry.portions.join(', '))})` : ''}
          </span>
        `;
        listContainer.appendChild(li);
      });
  }

  modal.classList.remove('hidden');
}

// Copiar Lista de Compras para Área de Transferência
function copyShoppingList() {
  const items = document.querySelectorAll('#shopping-list-items li');
  if (items.length === 0) return;

  const lines = ['🛒 Minha Lista de Compras (NutriPlan):'];
  items.forEach(li => {
    const name = li.querySelector('span.font-medium').textContent;
    const detail = li.querySelector('span.text-xs').textContent.trim();
    lines.push(`- [ ] ${name} ${detail}`);
  });

  navigator.clipboard.writeText(lines.join('\n')).then(() => {
    alert('Lista de compras copiada para a área de transferência!');
  }).catch(() => {
    alert('Não foi possível copiar automaticamente.');
  });
}

// Exportar Dados como Arquivo JSON
function exportData() {
  const jsonStr = JSON.stringify(appState.data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `meu-plano-alimentar-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Importar Dados a partir de Arquivo JSON
function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && parsed.days) {
        appState.data = parsed;
        saveData();
        render();
        alert('Plano alimentar importado com sucesso!');
      } else {
        alert('Formato de arquivo inválido. Verifique o arquivo JSON.');
      }
    } catch (err) {
      alert('Erro ao processar o arquivo JSON.');
    }
  };
  reader.readAsText(file);
}

// Utilitário para evitar injeção de HTML
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
