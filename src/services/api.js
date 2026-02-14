/**
 * API服务 - 与后端FastAPI通信
 */

// API基础URL - 必须从环境变量配置
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL 环境变量未配置，请在 .env 文件中设置')
}

// 模型映射：前端模型名 -> 后端模型名
// 必须从环境变量读取
const MODEL_MAP = {
  'Qwen': import.meta.env.VITE_MODEL_QWEN,
  'Kimi': import.meta.env.VITE_MODEL_KIMI,
  'DeepSeek': import.meta.env.VITE_MODEL_DEEPSEEK
}

// 验证模型配置
const missingModels = Object.entries(MODEL_MAP)
  .filter(([key, value]) => !value)
  .map(([key]) => key)

if (missingModels.length > 0) {
  throw new Error(`以下模型环境变量未配置: ${missingModels.join(', ')}。请在 .env 文件中设置 VITE_MODEL_${missingModels.join(', VITE_MODEL_')}`)
}

/**
 * 发送聊天消息
 * @param {Array} messages - 消息列表，格式: [{role: 'user'|'assistant', content: string}]
 * @param {string} model - 模型名称（前端模型名）
 * @returns {Promise<{role: string, content: string}>} AI回复
 */
export async function sendChatMessage(messages, model = 'Qwen') {
  try {
    // 将前端模型名映射到后端模型名
    const backendModel = MODEL_MAP[model]
    if (!backendModel) {
      throw new Error(`模型 "${model}" 未配置，请在 .env 文件中设置 VITE_MODEL_${model.toUpperCase()}`)
    }
    
    // 构建请求体
    const requestBody = {
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    }
    
    // 只有在模型映射存在时才添加model参数
    // 如果不传model，后端会使用默认模型
    if (backendModel) {
      requestBody.model = backendModel
    }
    
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: '请求失败' }))
      
      // 解析后端返回的错误信息
      let errorMessage = errorData.detail || `HTTP error! status: ${response.status}`
      
      // 如果后端返回了OpenAI API的错误信息，提取更详细的错误
      if (errorData.detail && typeof errorData.detail === 'string') {
        // 尝试从错误信息中提取模型名和错误消息
        // 格式可能是: "Error calling OpenAI API: Error code: 404 - {'error': {'message': '...', ...}}"
        const modelMatch = errorMessage.match(/model `([^`]+)` does not exist/i)
        if (modelMatch) {
          const modelName = modelMatch[1]
          errorMessage = `模型 "${modelName}" 不存在\n\n可能的原因：\n1. API服务器上没有该模型\n2. 模型名称配置错误\n3. 请检查后端配置或联系管理员`
        } else if (errorMessage.includes('does not exist')) {
          // 提取错误消息中的关键信息
          const messageMatch = errorMessage.match(/message['"]:\s*['"]([^'"]+)['"]/i)
          if (messageMatch) {
            errorMessage = messageMatch[1]
          }
        }
      }
      
      // 根据错误类型提供更友好的提示
      if (errorMessage.includes('Connection error') || errorMessage.includes('连接')) {
        throw new Error('无法连接到AI服务，请检查：\n1. 后端服务是否正常运行\n2. 网络连接是否正常\n3. OpenAI API服务器是否可访问')
      }
      
      // 模型不存在的错误（更通用的匹配）
      if (errorMessage.includes('does not exist') || (errorMessage.includes('model') && errorMessage.includes('404'))) {
        if (!errorMessage.includes('可能的原因')) {
          errorMessage = `模型不存在\n\n${errorMessage}\n\n请检查：\n1. 后端配置的模型名称是否正确\n2. API服务器上是否有该模型\n3. 模型映射配置是否正确`
        }
      }
      
      throw new Error(errorMessage)
    }

    const data = await response.json()
    return {
      role: data.role || 'assistant',
      content: data.content || ''
    }
  } catch (error) {
    console.error('API调用失败:', error)
    throw error
  }
}

/**
 * 健康检查
 * @returns {Promise<{status: string}>}
 */
export async function healthCheck() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('健康检查失败:', error)
    throw error
  }
}

/**
 * 保存聊天记录到服务器
 * @param {number|null} sessionId - 会话ID，null表示新建
 * @param {string} name - 聊天名称
 * @param {Array} messages - 消息列表
 * @returns {Promise<{session_id: number, message: string}>}
 */
export async function saveChatToServer(sessionId, name, messages) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId || null,
        name,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: '保存失败' }))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('保存聊天到服务器失败:', error)
    throw error
  }
}

/**
 * 从服务器获取所有聊天会话
 * @returns {Promise<Array<{id: number, name: string, created_at: string, updated_at: string}>>}
 */
export async function loadChatsFromServer() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/sessions`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('从服务器加载聊天列表失败:', error)
    throw error
  }
}

/**
 * 从服务器获取聊天会话详情
 * @param {number} sessionId - 会话ID
 * @returns {Promise<{id: number, name: string, messages: Array, created_at: string, updated_at: string}>}
 */
export async function loadChatFromServer(sessionId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/session/${sessionId}`)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('聊天会话不存在')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('从服务器加载聊天详情失败:', error)
    throw error
  }
}

/**
 * 从服务器删除聊天会话
 * @param {number} sessionId - 会话ID
 * @returns {Promise<{message: string}>}
 */
export async function deleteChatFromServer(sessionId) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/session/${sessionId}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: '删除失败' }))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('从服务器删除聊天失败:', error)
    throw error
  }
}
