/**
 * 应用常量定义
 */

// 模型配置
export const MODELS = {
  QWEN: 'Qwen',
  KIMI: 'Kimi',
  DEEPSEEK: 'DeepSeek'
}

export const MODEL_CONFIG = {
  [MODELS.QWEN]: {
    name: 'Qwen',
    description: '全能处理，深度思考'
  },
  [MODELS.KIMI]: {
    name: 'Kimi',
    description: '适合深度思考'
  },
  [MODELS.DEEPSEEK]: {
    name: 'DeepSeek',
    description: '高效推理，代码专家'
  }
}

// 颜色常量
export const COLORS = {
  primary: '#0066ff',
  primaryDark: '#0052cc',
  success: '#22c55e',
  successHover: '#16a34a',
  background: '#ffffff',
  backgroundLight: '#f5f5f5',
  backgroundGray: '#f9fafb',
  border: '#e5e7eb',
  text: '#1f2937',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  hover: '#f3f4f6',
  hoverDark: '#e5e7eb',
  disabled: '#d1d5db',
  white: '#ffffff',
  black: '#000000'
}

// 尺寸常量
export const SIZES = {
  sidebarWidth: '260px',
  borderRadius: {
    sm: '6px',
    md: '8px',
    lg: '12px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '40px'
  }
}

// 建议卡片配置
export const SUGGESTION_CARDS = [
  {
    id: 'example1',
    title: '示例问题1',
    subtitle: '这是一个示例问题',
    prompt: '示例问题1'
  },
  {
    id: 'example2',
    title: '示例问题2',
    subtitle: '这是另一个示例问题',
    prompt: '示例问题2'
  },
  {
    id: 'example3',
    title: '示例问题3',
    subtitle: '更多示例问题',
    prompt: '示例问题3'
  }
]

// 导航项配置
export const NAV_ITEMS = []

// 文件类型支持
export const SUPPORTED_FILE_TYPES = [
  'jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif',
  'pdf', 'xls', 'xlsx', 'ppt', 'pptx', 'doc', 'docx',
  'txt', 'csv', 'text', 'bat', 'c', 'cpp', 'cs', 'css',
  'go', 'h', 'hpp', 'ini', 'java', 'js', 'json', 'log',
  'lua', 'md', 'php', 'pl', 'py', 'rb', 'sh', 'sql',
  'swift', 'tex', 'toml', 'vue', 'yaml', 'yml', 'xml', 'html'
]
