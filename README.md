# Layout Column Ruler Web Extension



## Baixar a extensão

### Pré-requisitos

- Node.js (v18 ou superior)
- npm (ou yarn/pnpm)

### No terminal do seu computador:

1. Clone o repositório e navegue até a pasta do projeto:
   ```bash
   git clone https://github.com/LeonardoSouzaBento/Layout_Column_Ruler-web_extension
   cd Layout_Column_Ruler-web_extension
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Execute o build:
   ```bash
   npm run build
   ```

### Instalação da extensão no navegador

Abra o seu navegador (Brave, Chrome ou Edge).
Vá para a página de extensões digitando na barra de endereço: chrome://extensions
Ative o Modo do desenvolvedor (chave seletora no canto superior direito).
Clique no botão Carregar sem compactação (ou Load unpacked).
Na janela que abrir, navegue até a pasta do seu projeto, entre em .output e selecione a pasta chrome-mv3.

### Project Structure

```
layout-column-ruler-web-extension/
├── src/
│   ├── components/        # React components
│   ├── content/           # Content scripts (injected into web pages)
│   ├── pages/             # Extension pages (settings, etc.)
│   ├── scripts/           # Background scripts and utilities
│   ├── styles/            # Stylesheets
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Entry point
│   └── ...
├── public/                # Static assets
├── wxt.config.ts          # WXT configuration
├── package.json           # Project dependencies
└── ...
```
## License

[MIT](LICENSE)
