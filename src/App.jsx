import { useState, useRef, useEffect } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState([])
  const [isChatMode, setIsChatMode] = useState(false)
  const [selectedModel, setSelectedModel] = useState('Hunyuan')
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const modelDropdownRef = useRef(null)

  const handleSend = () => {
    if (!inputValue.trim()) return
    setIsChatMode(true)
    setMessages([...messages, { role: 'user', content: inputValue }])
    setInputValue('')
  }

  const handleExampleClick = (text) => {
    setInputValue(text)
    setTimeout(() => handleSend(), 100)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target)) {
        setShowModelDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      backgroundColor: '#ffffff'
    }}>
      {/* 左侧导航栏 */}
      <div style={{
        width: '260px',
        backgroundColor: '#f5f5f5',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* 顶部按钮 */}
        <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '6px' }}>☰</div>
          <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '6px' }}>➕</div>
        </div>

        {/* 搜索框 */}
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <span>🔍</span>
            <input type="text" placeholder="Q 搜索" style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }} />
          </div>
        </div>

        {/* 导航项 */}
        <div style={{ padding: '8px', flex: 1, overflow: 'auto' }}>
          <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', borderRadius: '6px', marginBottom: '4px' }}>
            <span style={{ color: '#10b981' }}>S</span>
            <span style={{ fontSize: '14px', color: '#1f2937' }}>元宝</span>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', borderRadius: '6px', marginBottom: '4px' }}>
            <span>⛰️</span>
            <span style={{ fontSize: '14px', color: '#1f2937' }}>灵感图库</span>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', borderRadius: '6px', marginBottom: '4px' }}>
            <span>⊞</span>
            <span style={{ fontSize: '14px', color: '#1f2937' }}>全部应用</span>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', borderRadius: '6px', marginBottom: '4px' }}>
            <span>⭐</span>
            <span style={{ fontSize: '14px', color: '#1f2937' }}>全部收藏</span>
          </div>

          <div style={{ marginTop: '16px', marginBottom: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>分组</span>
            <span style={{ cursor: 'pointer' }}>➕</span>
          </div>
          <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', borderRadius: '6px' }}>
            <span>📄</span>
            <span style={{ fontSize: '14px', color: '#1f2937' }}>分组示例</span>
          </div>

          <div style={{ marginTop: '16px', marginBottom: '8px', padding: '8px 12px' }}>
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>聊天</span>
          </div>
          <div style={{ padding: '8px 12px', fontSize: '14px', color: '#1f2937', cursor: 'pointer', borderRadius: '6px', marginBottom: '2px' }}>0112新对话</div>
          <div style={{ padding: '8px 12px', fontSize: '14px', color: '#1f2937', cursor: 'pointer', borderRadius: '6px', marginBottom: '2px' }}>11月纳税增多因税率跳档</div>
          <div style={{ padding: '8px 12px', fontSize: '14px', color: '#1f2937', cursor: 'pointer', borderRadius: '6px', marginBottom: '2px' }}>体验DeepSeek新技能</div>
          <div style={{ padding: '8px 12px', fontSize: '14px', color: '#1f2937', cursor: 'pointer', borderRadius: '6px', marginBottom: '2px' }}>中国AI势力分类与变迁分析</div>
        </div>

        {/* 底部 */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#6b7280', marginBottom: '12px' }}>
            <span>⬇</span>
            <span style={{ fontSize: '14px' }}>前往下载中心</span>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e5e7eb' }}></div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        position: 'relative'
      }}>
        {/* 顶部模型选择器 */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div ref={modelDropdownRef} style={{ position: 'relative' }}>
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '6px'
              }}
              onClick={() => setShowModelDropdown(!showModelDropdown)}
            >
              <span style={{ fontSize: '14px', color: '#1f2937', fontWeight: 500 }}>{selectedModel}</span>
              <span style={{ fontSize: '12px' }}>{showModelDropdown ? '▲' : '▼'}</span>
            </div>
            {showModelDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '8px',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                minWidth: '240px',
                zIndex: 1000
              }}>
                <div style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #e5e7eb',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>Hunyuan</span>
                  <span>▲</span>
                </div>
                <div 
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    position: 'relative'
                  }}
                  onClick={() => {
                    setSelectedModel('Hunyuan')
                    setShowModelDropdown(false)
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1f2937' }}>Hunyuan</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>全能处理，深度思考</div>
                  {selectedModel === 'Hunyuan' && (
                    <div style={{ position: 'absolute', right: '16px', top: '12px', fontSize: '16px', color: '#1f2937' }}>✓</div>
                  )}
                </div>
                <div 
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    position: 'relative'
                  }}
                  onClick={() => {
                    setSelectedModel('DeepSeek')
                    setShowModelDropdown(false)
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#1f2937' }}>DeepSeek</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>适合深度思考</div>
                  {selectedModel === 'DeepSeek' && (
                    <div style={{ position: 'absolute', right: '16px', top: '12px', fontSize: '16px', color: '#1f2937' }}>✓</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button style={{
            padding: '6px 16px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            安装电脑版
            <span>▼</span>
          </button>
        </div>

        {/* 主内容 */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 24px 200px',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          {!isChatMode ? (
            <>
              {/* 问候语 */}
              <h1 style={{ fontSize: '48px', fontWeight: '600', color: '#1f2937', margin: '40px 0 24px' }}>Hi，</h1>

              {/* 分隔线 */}
              <div style={{ width: '100%', height: '1px', backgroundColor: '#e5e7eb', marginBottom: '32px' }}></div>

              {/* 建议卡片 */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                justifyContent: 'flex-start',
                width: '100%'
              }}>
                {/* 红色促销卡片 */}
                <div style={{
                  flex: '0 0 228px',
                  maxWidth: '228px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}>
                  <img src="/yuanbao_files/NzFkYzk2NzYtNGM4Mi00Y2U4LWI1NzYtZmRmM2FlMmYwNmYx_compress.webp" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>

                {/* 下载元宝电脑版 */}
                <div style={{
                  background: '#f0f9ff',
                  border: '1px solid #0ea5e9',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  minWidth: '200px',
                  flex: '0 0 auto',
                  transition: 'all 0.2s'
                }}
                onClick={() => handleExampleClick('下载元宝电脑版')}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 102, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <img src="/yuanbao_files/NjZlZDhiNDQtM2Q2Ni00MmViLTgzZDQtM2RjM2RjZjFlZmVh.png" alt="" style={{ width: '16px', height: '16px' }} />
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>下载元宝电脑版</span>
                    <span style={{ marginLeft: 'auto' }}>▶</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>快速启动，划词问答，多格式全能处理</div>
                </div>

                {/* 国画创作 */}
                <div style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  minWidth: '144px',
                  flex: '0 0 auto',
                  transition: 'all 0.2s'
                }}
                onClick={() => handleExampleClick('国画创作')}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0066ff'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                >
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>国画创作</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>工笔荷花</div>
                </div>

                {/* 识图求知 */}
                <div style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  minWidth: '144px',
                  flex: '0 0 auto',
                  transition: 'all 0.2s'
                }}
                onClick={() => handleExampleClick('识图求知')}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0066ff'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                >
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>识图求知</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>结合财报数据计算毛利率</div>
                </div>

                {/* 好奇发现 */}
                <div style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  minWidth: '144px',
                  flex: '0 0 auto',
                  transition: 'all 0.2s'
                }}
                onClick={() => handleExampleClick('好奇发现')}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#0066ff'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                >
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', marginBottom: '4px' }}>好奇发现</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>如果地球没有风</div>
                </div>
              </div>
            </>
          ) : (
            <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: msg.role === 'user' ? '#0066ff' : 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 500,
                    flexShrink: 0
                  }}>
                    {msg.role === 'user' ? '我' : '元'}
                  </div>
                  <div style={{
                    maxWidth: '70%',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    background: msg.role === 'user' ? '#0066ff' : 'white',
                    color: msg.role === 'user' ? 'white' : '#1f2937',
                    border: msg.role === 'user' ? 'none' : '1px solid #e5e7eb'
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 底部输入框 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 24px',
          backgroundColor: 'white',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '12px'
            }}>
              {/* 左侧工具栏 */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
                  <span>🧠</span>
                  <span>深度思考</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '6px', backgroundColor: '#e5e7eb', cursor: 'pointer', fontSize: '14px' }}>
                  <span>🌐</span>
                  <span>自动搜索</span>
                  <span>▼</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>
                  <span>🔧</span>
                  <span>工具</span>
                  <span>▼</span>
                </div>
              </div>

              {/* 输入框 */}
              <div style={{ flex: 1 }}>
                <div
                  contentEditable
                  style={{
                    minHeight: '24px',
                    maxHeight: '120px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    outline: 'none',
                    overflowY: 'auto'
                  }}
                  onInput={(e) => setInputValue(e.target.textContent || '')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  data-placeholder="有问题，尽管问，shift+enter换行"
                ></div>
              </div>

              {/* 右侧按钮 */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '8px' }}>➕</div>
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: inputValue.trim() ? '#0066ff' : '#d1d5db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✈️
                </button>
              </div>
            </div>

            {/* 版权信息 */}
            <div style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#9ca3af',
              marginTop: '8px'
            }}>
              内容由AI生成，仅供参考
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
