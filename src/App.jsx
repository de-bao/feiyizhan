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
    <div className="yb-layout agent-layout layout-pc yb-layout--pc-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      backgroundColor: 'var(--background-page_background_web, #f5f5f5)'
    }}>
      {/* 顶部固定导航栏 */}
      <div className="yb-nav-fixed yb-nav-fixed--pc-ctx" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        padding: '12px 16px'
      }}>
        <div className="yb-common-nav__trigger yb-common-nav__trigger--grey" style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          borderRadius: '6px',
          backgroundColor: '#f3f4f6'
        }}>
          <span style={{ fontSize: '20px', color: '#666' }}>☰</span>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="yb-layout__content agent-layout__content" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        marginLeft: '260px'
      }}>
        {/* 聊天内容区域 */}
        <div className="agent-dialogue" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div className="agent-dialogue__content-wrapper" style={{ flex: 1, overflow: 'hidden' }}>
            <div className="agent-dialogue__content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* 聊天消息区域 */}
              <div className="agent-dialogue__content--common agent-dialogue__content--common-not-speaking" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
              }}>
                <div className="agent-dialogue__content--common__content" id="chat-content" style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }} ref={mainContainerRef}>
                  {!isChatMode ? (
                    <div className="agent-dialogue__content--common__homepage" style={{
                      width: '100%',
                      maxWidth: '800px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '32px'
                    }}>
                      {/* Hi，我是元宝标题 */}
                      <div className="say-hi_say-hi__2TUvz say-hi_align-center__dbw-X say-hi_size-medium__IqDo8" style={{
                        textAlign: 'center',
                        marginTop: '40px'
                      }}>
                        <h1 className="say-hi_title__-GN0J" style={{
                          fontSize: '32px',
                          fontWeight: 600,
                          color: '#1f2937',
                          margin: 0
                        }}>Hi，我是元宝</h1>
                      </div>

                      {/* 输入引导项 */}
                      <div className="input-guide-v2" style={{
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px',
                        justifyContent: 'center'
                      }}>
                        {[
                          { title: '下载元宝电脑版', subtitle: '快速启动，划词问答，多格式全能处理' },
                          { title: '国画创作', subtitle: '工笔荷花' },
                          { title: '识图求知', subtitle: '结合财报数据计算毛利率' },
                          { title: '好奇发现', subtitle: '如果地球没有风' }
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="input-guide-v2-item"
                            onClick={() => handleExampleQuestion(item.title)}
                            style={{
                              background: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              padding: '12px 16px',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              minWidth: '200px',
                              flex: '1 1 auto',
                              maxWidth: '300px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#0066ff'
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 102, 255, 0.1)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#e5e7eb'
                              e.currentTarget.style.boxShadow = 'none'
                            }}
                          >
                            <div className="input-guide-v2-item__title-wrap" style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              marginBottom: '4px'
                            }}>
                              <span style={{ fontSize: '14px', fontWeight: 500, color: '#1f2937' }}>{item.title}</span>
                            </div>
                            <span className="input-guide-v2-item__subtitle" style={{
                              fontSize: '12px',
                              color: '#6b7280'
                            }}>{item.subtitle}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          style={{
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'flex-start',
                            flexDirection: message.role === 'user' ? 'row-reverse' : 'row'
                          }}
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

                      {isLoading && (
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
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

                {/* 输入框区域 */}
                <div className="agent-dialogue__content--common__input agent-chat__input-box" style={{
                  padding: '16px 24px',
                  background: 'white',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <div className="agent-dialogue__content--common__input__content" style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                  }}>
                    <div className="agent-dialogue__content--common__input-box" style={{
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: '12px'
                    }}>
                      <textarea
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value)
                          e.target.style.height = 'auto'
                          e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
                        }}
                        onKeyDown={handleKeyPress}
                        placeholder="有问题，尽管问，shift+enter换行"
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
                          color: '#1f2937',
                          lineHeight: '1.5'
                        }}
                      />
                      <button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isLoading}
                        className="style__send-btn___RwTm5"
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
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="agent-dialogue__content-copyright" style={{
            padding: '8px 24px',
            textAlign: 'center'
          }}>
            <div className="copyright-wp">
              <div className="copyright">
                <div className="copyright__item" style={{
                  fontSize: '12px',
                  color: '#9ca3af'
                }}>内容由AI生成，仅供参考</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 左侧导航栏（简化版） */}
      <div className="yb-nav yb-common-nav yb-nav--overlay yb-nav--pc-ctx yb-nav--floating" style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '260px',
        height: '100vh',
        background: 'white',
        borderRight: '1px solid #e5e7eb',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="yb-nav__header yb-common-nav__hd" style={{
          padding: '12px 16px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div className="yb-common-nav__trigger" style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            borderRadius: '6px'
          }}>
            <span style={{ fontSize: '20px' }}>☰</span>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#1f2937' }}>元宝</div>
        </div>
        <div className="yb-common-nav__tool" style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: '#6b7280'
        }}>
          <span style={{ fontSize: '20px' }}>🔍</span>
          <p style={{ margin: 0, fontSize: '14px' }}>搜索</p>
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="yb-nav__footer" style={{
          padding: '12px 16px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div className="index_pc_download__A+Izz yb__pc_download" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: '#6b7280',
            fontSize: '14px'
          }}>
            <span>⬇</span>
            <div>前往下载中心</div>
          </div>
        </div>
      </div>

      {/* 加载动画CSS */}
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
