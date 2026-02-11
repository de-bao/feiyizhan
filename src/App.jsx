import { useState, useRef, useEffect } from 'react'

function App() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChatMode, setIsChatMode] = useState(false)
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
  }, [messages, isLoading])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const content = inputValue.trim()

    if (!isChatMode) {
      setIsChatMode(true)
    }

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

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
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      {/* 顶部导航栏 - 完全模仿元宝样式 */}
      <header className="bg-white border-b" style={{ borderColor: '#e5e7eb', padding: '12px 24px' }}>
        <div className="flex items-center justify-between" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div style={{ 
                width: '28px', 
                height: '28px', 
                background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                元
              </div>
              <span style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937' }}>元宝</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              fontSize: '14px',
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '6px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.target.style.background = '#f3f4f6'; e.target.style.color = '#374151' }}
            onMouseLeave={(e) => { e.target.style.background = 'none'; e.target.style.color = '#6b7280' }}
            >
              搜索
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              fontSize: '14px',
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '6px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.target.style.background = '#f3f4f6'; e.target.style.color = '#374151' }}
            onMouseLeave={(e) => { e.target.style.background = 'none'; e.target.style.color = '#6b7280' }}
            >
              前往下载中心
            </button>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-y-auto" ref={mainContainerRef} style={{ padding: '24px' }}>
        <div className="flex flex-col gap-8" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          {/* 欢迎卡片 - 只在非聊天模式显示 */}
          {!isChatMode && (
            <>
              {/* 欢迎消息卡片1 */}
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div className="flex items-start gap-3">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    flexShrink: 0
                  }}>
                    元
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>
                      Hi~ 我是元宝
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                      你身边的智能助手，可以为你答疑解惑、精读文档、尽情创作，让元宝助你轻松工作，多点生活
                    </div>
                  </div>
                </div>
              </div>

              {/* 欢迎消息卡片2 */}
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div className="flex items-start gap-3">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    flexShrink: 0
                  }}>
                    元
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '8px' }}>
                      Hi~ 我是元宝
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                      你身边的智能助手，可以为你答疑解惑、尽情创作，快来点击以下任一功能体验吧～
                    </div>
                  </div>
                </div>
              </div>

              {/* 功能提示卡片 */}
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '16px' }}>
                  你可以这样问
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px'
                }}>
                  {['帮我写一份工作总结', '解释一下量子计算的基本原理', '帮我分析一下这个文档的主要内容', '写一首关于春天的诗'].map((text, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExampleQuestion(text)}
                      style={{
                        background: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '14px',
                        color: '#374151',
                        textAlign: 'left',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#f3f4f6'
                        e.target.style.borderColor = '#0066ff'
                        e.target.style.color = '#0066ff'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#f9fafb'
                        e.target.style.borderColor = '#e5e7eb'
                        e.target.style.color = '#374151'
                      }}
                    >
                      {text}
                    </button>
                  ))}
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
                  style={{ alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 500,
                    background: message.role === 'user' 
                      ? '#0066ff' 
                      : 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)'
                  }}>
                    {message.role === 'user' ? '我' : '元'}
                  </div>
                  <div style={{
                    maxWidth: '70%',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    background: message.role === 'user' ? '#0066ff' : 'white',
                    color: message.role === 'user' ? 'white' : '#1f2937',
                    border: message.role === 'user' ? 'none' : '1px solid #e5e7eb'
                  }}>
                    {message.content}
                  </div>
                </div>
              ))}

              {/* 加载动画 */}
              {isLoading && (
                <div className="flex gap-3" style={{ alignItems: 'flex-start' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 500,
                    flexShrink: 0
                  }}>
                    元
                  </div>
                  <div style={{
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out',
                      animationDelay: '0ms'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out',
                      animationDelay: '150ms'
                    }}></div>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1.4s infinite ease-in-out',
                      animationDelay: '300ms'
                    }}></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 输入区域 - 完全模仿元宝样式 */}
      <div className="bg-white border-t" style={{ borderColor: '#e5e7eb', padding: '16px 24px', position: 'sticky', bottom: 0 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-end',
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '12px'
          }}>
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
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'none',
                minHeight: '24px',
                maxHeight: '120px',
                overflowY: 'auto',
                outline: 'none',
                color: '#1f2937'
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              style={{
                width: '32px',
                height: '32px',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.2s',
                flexShrink: 0,
                background: inputValue.trim() && !isLoading ? '#0066ff' : '#d1d5db',
                color: 'white'
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim() && !isLoading) {
                  e.target.style.background = '#0052cc'
                }
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim() && !isLoading) {
                  e.target.style.background = '#0066ff'
                }
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
            内容由AI生成，仅供参考
          </p>
        </div>
      </div>

      {/* 添加加载动画的CSS */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}

export default App
