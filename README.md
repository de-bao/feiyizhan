# Index - Resume

现代化的个人简历页面，使用 React + Vite + Tailwind CSS 构建。

## 技术栈

- **React 18** - 现代化的 UI 框架
- **Vite** - 快速的构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **GitHub Pages** - 自动部署

## 开发

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录。

### 预览生产构建

```bash
npm run preview
```

## 部署

### 首次部署设置

1. **添加 GitHub Actions Workflow**：
   - 由于 token 权限限制，需要手动在 GitHub 网页上添加 workflow 文件
   - 访问 https://github.com/de-bao/site
   - 点击 "Add file" -> "Create new file"
   - 文件路径：`.github/workflows/deploy.yml`
   - 内容参考项目根目录的 `.github/workflows/deploy.yml` 文件
   - 或者直接通过 GitHub 网页界面创建该文件

2. **启用 GitHub Pages**：
   - 访问 https://github.com/de-bao/site/settings/pages
   - 在 "Source" 下选择 "GitHub Actions"
   - 保存设置

3. **自动部署**：
   - 推送到 `main` 分支后，GitHub Actions 会自动构建并部署
   - 访问 `https://debaosite.dpdns.org` 或 `https://de-bao.github.io/site`

### 手动部署（如果需要）

```bash
npm run build
# 然后将 dist/ 目录的内容推送到 gh-pages 分支
```

## 项目结构

```
site/
├── src/
│   ├── components/     # React 组件
│   ├── App.jsx         # 主应用组件
│   ├── main.jsx        # 入口文件
│   └── index.css       # 全局样式
├── index.html          # HTML 模板
├── vite.config.js      # Vite 配置
├── tailwind.config.js  # Tailwind 配置
└── package.json        # 项目依赖
```
