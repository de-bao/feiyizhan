# 元宝聊天助手

基于腾讯元宝官网样式的AI聊天助手页面，使用 React + Vite + Tailwind CSS 构建。

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

## 部署到 GitHub Pages

### 方法1：使用 GitHub Actions（推荐）

1. **创建 GitHub Actions 工作流文件**：
   在 `.github/workflows/deploy.yml` 创建文件（如果不存在）

2. **启用 GitHub Pages**：
   - 访问仓库的 Settings > Pages
   - 在 "Source" 下选择 "GitHub Actions"
   - 保存设置

3. **推送代码**：
   ```bash
   git add .
   git commit -m "初始化元宝聊天页面"
   git push origin main
   ```

4. **自动部署**：
   - GitHub Actions 会自动构建并部署
   - 访问 `https://你的用户名.github.io/仓库名`

### 方法2：手动部署

```bash
# 构建项目
npm run build

# 将 dist/ 目录的内容推送到 gh-pages 分支
# 或者使用 gh-pages 工具
npm install -g gh-pages
gh-pages -d dist
```

## 项目结构

```
site/
├── src/
│   ├── App.jsx         # 主应用组件
│   ├── main.jsx        # 入口文件
│   └── index.css       # 全局样式
├── public/
│   └── yuanbao_files/  # 元宝静态资源（图片、CSS、JS等）
├── index.html          # HTML 模板
├── vite.config.js      # Vite 配置
├── tailwind.config.js  # Tailwind 配置
├── package.json        # 项目依赖
└── README.md           # 项目说明
```

## 功能说明

- **欢迎界面**：显示元宝的介绍和功能说明
- **示例问题**：点击示例问题快速开始对话
- **聊天功能**：支持发送消息和接收AI回复
- **响应式布局**：适配桌面和移动设备

## 后续开发

如需接入真实AI API，可以修改 `src/App.jsx` 中的 `handleSend` 函数，将模拟回复替换为实际的API调用。

## 注意事项

- 当前版本使用模拟回复，实际项目中需要接入真实的AI API
- 页面样式完全参考腾讯元宝官网设计
