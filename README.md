# の豹网 - AI助手前端

基于 Vue 3 Composition API 的简洁AI助手前端项目。

## 📋 项目简介

这是一个轻量级的AI助手前端项目，采用 Vue 3 Composition API 开发，代码简洁清晰，易于定制和扩展。

## 🛠️ 技术栈

- **Vue 3** (3.4.15) - Composition API
- **Vite** (5.0.8) - 构建工具

## 📁 项目结构

```
site/
├── src/
│   ├── components/          # Vue组件
│   │   ├── Sidebar.vue     # 侧边栏
│   │   ├── Header.vue      # 顶部栏
│   │   ├── ChatArea.vue    # 聊天区域
│   │   ├── InputArea.vue   # 输入区域
│   │   ├── ModelSelector.vue  # 模型选择器
│   │   ├── SuggestionCards.vue # 建议卡片
│   │   └── DragOverlay.vue  # 拖拽覆盖层
│   ├── composables/        # 组合式函数
│   │   ├── useClickOutside.js
│   │   └── useDragAndDrop.js
│   ├── constants/          # 常量定义
│   │   └── index.js
│   ├── services/           # API服务
│   │   ├── api.js          # 后端API调用
│   │   └── storage.js      # 本地存储服务
│   ├── utils/              # 工具函数
│   │   └── fileHandler.js  # 文件处理工具
│   ├── App.vue             # 根组件
│   ├── main.js             # 入口文件
│   └── index.css           # 全局样式
├── index.html              # HTML模板
├── vite.config.js          # Vite配置
└── package.json            # 项目配置
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发

```bash
npm run dev
```

访问 `http://localhost:5173`

### 构建

```bash
npm run build
```

## 💡 核心功能

- ✅ 聊天界面（消息列表）
- ✅ 模型选择
- ✅ 示例问题卡片
- ✅ **文件上传**（拖拽上传、图片/文档/联网文档）
- ✅ 响应式布局
- ✅ **聊天记录持久化**（localStorage + 后端数据库）
- ✅ **多设备同步**（自动同步到服务器）

## 🔨 后端API接入

### 配置API地址和模型（必填）

**重要：所有配置必须通过环境变量设置，代码中不包含任何硬编码的默认值。**

1. 在项目根目录创建 `.env` 文件（参考 `.env.example`）：
```bash
# API配置（必填）
VITE_API_BASE_URL=https://chatback--debaocpc.replit.app

# 模型配置（必填，对应阿里云百炼API的模型名）
VITE_MODEL_QWEN=qwen-plus
VITE_MODEL_KIMI=qwen-max
VITE_MODEL_DEEPSEEK=deepseek-v3.2
```

2. 配置说明：
   - `VITE_API_BASE_URL`: 后端API地址（**必填**）
   - `VITE_MODEL_QWEN`: Qwen模型名称（**必填**）
   - `VITE_MODEL_KIMI`: Kimi模型名称（**必填**）
   - `VITE_MODEL_DEEPSEEK`: DeepSeek模型名称（**必填**）

3. **重要**：
   - `.env` 文件不会被提交到仓库（已在 `.gitignore` 中）
   - 如果缺少任何环境变量，应用启动时会抛出错误
   - 可以复制 `.env.example` 文件并重命名为 `.env`，然后修改配置值

### 启动后端服务

后端项目位于 `/home/10355407/下载/baode-resume/chatback`：

```bash
cd /home/10355407/下载/baode-resume/chatback
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### API接口说明

前端已集成后端API，通过 `src/services/api.js` 调用：

- **POST /api/chat**: 发送聊天消息
- **GET /health**: 健康检查

前端会自动将消息发送到后端，并显示AI回复。支持错误处理和加载状态显示。

### 聊天记录持久化

项目实现了**混合持久化方案**：

1. **前端 localStorage**（已实现）
   - 自动保存聊天记录到浏览器本地存储
   - 页面刷新后自动恢复
   - 离线可用

2. **后端数据库**（已实现）
   - 使用 SQLite 存储聊天记录
   - 支持多设备同步
   - 自动后台同步到服务器

**工作流程：**
- 聊天记录变化时，先保存到 localStorage（快速）
- 后台自动同步到服务器数据库（2秒防抖）
- 页面加载时，尝试从服务器加载最新数据
- 删除聊天时，同时删除本地和服务器记录

**API端点：**
- `POST /api/chat/save` - 保存聊天记录
- `GET /api/chat/sessions` - 获取所有聊天会话
- `GET /api/chat/session/{session_id}` - 获取聊天详情
- `DELETE /api/chat/session/{session_id}` - 删除聊天会话

## 📝 自定义

- **修改模型**：编辑 `src/constants/index.js` 中的 `MODELS` 和 `MODEL_CONFIG`
- **修改建议卡片**：编辑 `src/constants/index.js` 中的 `SUGGESTION_CARDS`
- **修改导航**：编辑 `src/constants/index.js` 中的 `NAV_ITEMS`
- **修改颜色**：编辑 `src/constants/index.js` 中的 `COLORS`

## 📎 文件上传功能

项目支持多种文件上传方式：

1. **拖拽上传**
   - 直接拖拽文件到聊天区域
   - 支持图片、文档等多种格式

2. **附件按钮上传**
   - 点击输入框右侧的 "+" 按钮
   - 选择上传类型：
     - **图片**：上传本地图片文件
     - **本地文件**：上传各种格式的文件
     - **联网文档**：输入文档URL进行分析

3. **支持的文件类型**
   - 图片：jpg, png, webp, gif 等
   - 文档：pdf, doc, docx, txt, md 等
   - 代码文件：js, py, java, cpp 等
   - 其他常见文件格式

4. **文件处理**
   - 图片自动转换为Base64显示
   - 小文档（<1MB）自动读取文本内容
   - 文件信息自动添加到消息中

## 📄 License

MIT
