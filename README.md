# 🥗 NutriPlan - Planejador de Plano Alimentar Semanal

Uma ferramenta simples, ágil e visual em **JavaScript Vanilla**, **HTML5** e **Tailwind CSS** para organizar refeições, acompanhar calorias diárias, hidratação e gerar listas de compras automaticamente.

---

## ✨ Funcionalidades

- 📅 **Planejamento por Dia da Semana**: Organize o cardápio de Segunda a Domingo.
- 🍽️ **6 Refeições Estruturadas**:
  - Café da Manhã
  - Lanche da Manhã
  - Almoço
  - Lanche da Tarde
  - Jantar
  - Ceia
- ⚡ **Cálculo Automático**: Total de calorias (kcal) e proteínas (g) calculados em tempo real com barra de progresso em relação à sua meta.
- 💧 **Controle de Hidratação**: Registrador rápido de consumo diário de água (+250ml / -250ml).
- 🛒 **Gerador de Lista de Compras**: Consolida automaticamente os alimentos de toda a semana em uma lista com caixas de marcação (checklists) e botão para copiar.
- 🖨️ **Impressão e PDF Limpos**: Layout dedicado para impressão (`@media print`) que oculta botões e gera uma ficha estética para pendurar na geladeira ou levar ao consultório.
- 💾 **Salvamento Automático Local**: Os dados ficam salvos no seu próprio navegador via `localStorage` (sem necessidade de servidor).
- 🔄 **Backup (Exportar e Importar)**: Exporte seu plano para arquivo `.json` ou restaure em outro computador/navegador.

---

## 🚀 Como Testar Localmente

Basta abrir o arquivo `index.html` diretamente em qualquer navegador moderno (Chrome, Edge, Firefox, Safari):

1. Clone ou baixe os arquivos da pasta:
   ```bash
   git clone https://github.com/SEU-USUARIO/plano-alimentar.git
   cd plano-alimentar
   ```
2. Dê um duplo clique no arquivo `index.html` ou abra pelo terminal:
   - **Windows**: `start index.html`
   - **Linux**: `xdg-open index.html`
   - **macOS**: `open index.html`

Não é necessário instalar Node.js, compilar ou rodar servidores adicionais!

---

## 📦 Como Publicar este Repositório no GitHub

Siga o passo a passo abaixo para criar e subir o projeto para a sua conta no GitHub:

### 1. Criar o Repositório no GitHub
1. Acesse [github.com/new](https://github.com/new).
2. Dê um nome ao repositório (por exemplo: `plano-alimentar`).
3. Escolha **Public** (Público).
4. Deixe desmarcadas as opções de adicionar README ou .gitignore (pois já criamos localmente).
5. Clique em **Create repository**.

### 2. Conectar e Enviar pelo Terminal
Na pasta do projeto, execute os comandos:

```bash
# Inicializar o repositório git (se ainda não fez)
git init

# Adicionar todos os arquivos
git add .

# Criar o primeiro commit
git commit -m "feat: versão inicial do NutriPlan"

# Renomear a branch principal para main
git branch -M main

# Vincular ao seu repositório no GitHub (substitua pelo link do seu repo)
git remote add origin https://github.com/SEU-USUARIO/plano-alimentar.git

# Enviar os arquivos
git push -u origin main
```

---

## 🌐 Como Ativar o Site Grátis com GitHub Pages

Depois de subir para o GitHub, você pode disponibilizar a ferramenta online gratuitamente:

1. No seu repositório no GitHub, clique na aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Em **Build and deployment** > **Branch**:
   - Selecione a branch `main` e a pasta `/ (root)`.
4. Clique em **Save**.
5. Aguarde cerca de 1 minuto e a URL da sua aplicação estará disponível no topo da página (ex: `https://seu-usuario.github.io/plano-alimentar/`).

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**
- **JavaScript (ES6+) Vanilla** (Sem frameworks pesados)
- **Tailwind CSS** (via CDN)
- **Lucide Icons** (Ícones limpos e modernos)
- **LocalStorage API**

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para customizar, clonar e usar para sua rotina alimentar ou consultório!
