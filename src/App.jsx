import { useState, useRef, useEffect } from 'react'

function App() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChatMode, setIsChatMode] = useState(false)
  const messagesEndRef = useRef(null)
  const mainContainerRef = useRef(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      if (mainContainerRef.current) {
        mainContainerRef.current.scrollTop = mainContainerRef.current.scrollHeight
      }
    }, 100)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const content = inputValue.trim()

    // 切换到聊天模式
    if (!isChatMode) {
      setIsChatMode(true)
    }

    // 添加用户消息
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // 模拟AI回复（实际项目中应该调用API）
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '这是一个模拟回复。在实际项目中，这里会调用AI API来生成回复。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleExampleQuestion = (text) => {
    setInputValue(text)
    setTimeout(() => {
      handleSend()
    }, 100)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-700 rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-bold">元</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">元宝</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700 text-sm px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
              搜索
            </button>
            <button className="text-gray-500 hover:text-gray-700 text-sm px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
              前往下载中心
            </button>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-y-auto px-6 py-6" ref={mainContainerRef}>
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* 欢迎卡片 - 只在非聊天模式显示 */}
          {!isChatMode && (
            <>
              {/* 欢迎消息卡片1 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-base">元</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-semibold text-gray-900 mb-2">Hi~ 我是元宝</div>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      你身边的智能助手，可以为你答疑解惑、精读文档、尽情创作，让元宝助你轻松工作，多点生活
                    </div>
                  </div>
                </div>
              </div>

              {/* 欢迎消息卡片2 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-base">元</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-semibold text-gray-900 mb-2">Hi~ 我是元宝</div>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      你身边的智能助手，可以为你答疑解惑、尽情创作，快来点击以下任一功能体验吧～
                    </div>
                  </div>
                </div>
              </div>

              {/* 功能提示卡片 */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-base font-semibold text-gray-900 mb-4">你可以这样问</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleExampleQuestion('帮我写一份工作总结')}
                    className="bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-blue-500 rounded-lg px-4 py-3 text-sm text-gray-700 hover:text-blue-600 transition-all text-left"
                  >
                    帮我写一份工作总结
                  </button>
                  <button
                    onClick={() => handleExampleQuestion('解释一下量子计算的基本原理')}
                    className="bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-blue-500 rounded-lg px-4 py-3 text-sm text-gray-700 hover:text-blue-600 transition-all text-left"
                  >
                    解释一下量子计算的基本原理
                  </button>
                  <button
                    onClick={() => handleExampleQuestion('帮我分析一下这个文档的主要内容')}
                    className="bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-blue-500 rounded-lg px-4 py-3 text-sm text-gray-700 hover:text-blue-600 transition-all text-left"
                  >
                    帮我分析一下这个文档的主要内容
                  </button>
                  <button
                    onClick={() => handleExampleQuestion('写一首关于春天的诗')}
                    className="bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-blue-500 rounded-lg px-4 py-3 text-sm text-gray-700 hover:text-blue-600 transition-all text-left"
                  >
                    写一首关于春天的诗
                  </button>
                </div>
              </div>
            </>
          )}

          {/* 聊天消息区域 */}
          {isChatMode && (
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium text-white ${
                      message.role === 'user'
                        ? 'bg-blue-600'
                        : 'bg-gradient-to-br from-blue-600 to-blue-700'
                    }`}
                  >
                    {message.role === 'user' ? '我' : '元'}
                  </div>
                  <div
                    className={`max-w-[70%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {/* 加载动画 */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 text-xs font-medium text-white">
                    元
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 输入区域 */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-end bg-gray-50 border border-gray-200 rounded-xl p-3">
            <textarea
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
              }}
              onKeyDown={handleKeyPress}
              placeholder="输入消息..."
              rows={1}
              className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-gray-900 placeholder-gray-400 max-h-[120px] overflow-y-auto"
              style={{ minHeight: '24px' }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                inputValue.trim() && !isLoading
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-400 cursor-not-allowed'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">内容由AI生成，仅供参考</p>
        </div>
      </div>
    </div>
  )
}

export default App
