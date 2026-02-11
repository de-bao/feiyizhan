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
      {/* 顶部固定导航栏 - 完全照抄HTML */}
      <div className="yb-nav-fixed yb-nav-fixed--pc-ctx">
        <div className="yb-common-nav__trigger yb-common-nav__trigger--grey" data-desc="unfold">
          <span style={{ fontSize: '20px' }} className="yb-icon iconfont-yb icon-yb-ic_sidebar_20">☰</span>
        </div>
        <div className="yb-common-nav__trigger">
          <div>
            <span className="yb-icon iconfont-yb icon-yb-ic_temporary_20" style={{ fontSize: '20px' }}>📝</span>
          </div>
        </div>
      </div>

      {/* 左侧导航栏 - 完全照抄HTML结构 */}
      <div className="yb-nav yb-common-nav yb-nav--overlay yb-nav--pc-ctx yb-nav--floating">
        <div className="yb-nav__mask"></div>
        <div className="yb-nav__content-wrapper" style={{ width: '260px' }}>
          <div className="yb-nav__header yb-common-nav__hd">
            <div className="yb-common-nav__trigger" data-desc="fold">
              <span style={{ fontSize: '20px' }} className="yb-icon iconfont-yb icon-yb-ic_sidebar_20">☰</span>
            </div>
            <div style={{ margin: '0px 8px' }} className="yb-common-nav__trigger" data-desc="new-chat">
              <span style={{ fontSize: '20px' }} className="yb-icon iconfont-yb icon-yb-ic_newchat_20">➕</span>
            </div>
          </div>
          <div dt-exposure="OnPageMod" dt-page-id="SlidePage" dt-mod-id="main_agent_mod" dt-button-id="search_bar" dt-ext1="pc" className="yb-common-nav__tool">
            <span style={{ fontSize: '20px' }} className="yb-icon iconfont-yb icon-yb-ic_search_20 yb-common-nav__tool-icon">🔍</span>
            <p className="yb-common-nav__tool-word">搜索</p>
          </div>
          <div className="yb-nav__content"></div>
          <div className="yb-nav__footer">
            <div className="index_pc_download__A+Izz yb__pc_download">
              <div className="index_content__Ya5lt">
                <span className="yb-icon iconfont-yb icon-yb-ic_download_16">⬇</span>
                <div className="index_text__0Xay5">前往下载中心</div>
              </div>
            </div>
            <div className="yb-nav__user">
              <div className="yb-nav__user-skeleton yb-nav__user-skeleton--hide">
                <div className="t-skeleton__row">
                  <div className="t-skeleton__col t-skeleton--type-text t-skeleton--animation-gradient"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域 - 完全照抄HTML结构 */}
      <div className="yb-layout__content agent-layout__content">
        <div className="agent-dialogue">
          <div className="agent-dialogue__content-wrapper">
            <div className="agent-dialogue__content">
              <div className="SplitPane agent-dialogue__content-split-pane vertical" style={{ 
                display: 'flex', 
                flex: '1 1 0%', 
                height: '100%', 
                position: 'absolute', 
                outline: 'none', 
                overflow: 'hidden', 
                userSelect: 'text', 
                flexDirection: 'row', 
                left: '0px', 
                right: '0px' 
              }}>
                <div className="Pane vertical Pane1" style={{ flex: '0 0 auto', position: 'relative', outline: 'none', width: '400px' }}>
                  <div className="agent-dialogue__content--common agent-dialogue__content--common-not-speaking">
                    <div className="agent-dialogue__content--common__header" style={{ paddingLeft: '82px' }}>
                      <div className="agent-dialogue__content--common__split"></div>
                      <div className="ybc-model-select-container">
                        <div>
                          <div dt-exposure="OnView" dt-page-id="YuanAgentPage" dt-mod-id="main_mod" dt-button-id="model_switch" dt-agent-id="naQivTmsDa" dt-model-id="hunyuan_t1" dt-ext1="hunyuan_t1" dt-ext2="1" dt-ext3="3" type="button" className="ybc-model-select-button ybc-model-select-button-normal t-button t-button--theme-default t-button--variant-text">
                            <span className="t-button__text">Hunyuan</span>
                            <span className="t-button__suffix">
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="agent-dialogue__content--common__content" id="chat-content" ref={mainContainerRef} style={{
                      flex: 1,
                      overflowY: 'auto',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                      {!isChatMode ? (
                        <div className="agent-dialogue__content--common__homepage">
                          <div className="agent-chat__conv--agent-homepage-v2 agent-chat__conv--agent-homepage-center">
                            <div className="say-hi_say-hi__2TUvz say-hi_align-center__dbw-X say-hi_size-medium__IqDo8 say-hi_theme-auto__dcNax say-hi_animation-none__f5iIv agent-chat__conv--agent-homepage-v2-sayhi" aria-label="Hi，">
                              <h1 className="say-hi_title__-GN0J">Hi，</h1>
                            </div>
                          </div>
                          <div className="agent-dialogue__content--common__input agent-chat__input-box">
                            <div className="agent-dialogue__content--common__input__content">
                              <div className="agent-dialogue__content--common__line agent-dialogue__content-input-guide"></div>
                              <div id="searchbar-editor" style={{ width: '100%' }}>
                                <div className="input-guide-v2 input-guide-v2--visible">
                                  <div className="input-guide-v2-item InputGuideV2_skillDialogNonePadding__B6eac" data-item-index="0" data-item-report-now-internet-search-status="3" data-item-banner-id="91001953" data-item-cms-id="91001953" data-item-target-model="" data-item-report-internet-search="3" data-hy-exposured="1">
                                    <div className="InputGuideV2_newYearWrap__MYuZw InputGuideV2_newYearWrap__MYuZw">
                                      <img draggable="false" className="InputGuideV2_fullImg___Wg_P" src="/yuanbao_files/NzFkYzk2NzYtNGM4Mi00Y2U4LWI1NzYtZmRmM2FlMmYwNmYx_compress.webp" alt="" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                                    </div>
                                    <span className="input-guide-v2-item__subtitle"></span>
                                  </div>
                                  <div className="input-guide-v2-item" data-item-title="下载元宝电脑版" data-item-sub-title="快速启动，划词问答，多格式全能处理" data-item-index="1" data-item-report-now-internet-search-status="3" data-item-banner-id="91001955" data-item-cms-id="91001955" data-item-target-model="" data-item-report-internet-search="3" data-hy-exposured="1" onClick={() => handleExampleQuestion('下载元宝电脑版')}>
                                    <div className="input-guide-v2-item__title-wrap">
                                      <img className="input-guide-v2-item__title-logo" src="/yuanbao_files/NjZlZDhiNDQtM2Q2Ni00MmViLTgzZDQtM2RjM2RjZjFlZmVh.png" alt="下载元宝电脑版" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                                      <span>下载元宝电脑版</span>
                                      <div className="ybc-icon input-guide-v2-item__title-arrow">
                                        <svg className="ybc-icon-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path id="Vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M1.37413 0.531815C1.52807 0.393268 1.76518 0.405747 1.90372 0.559688L4.99999 3.99998L8.09625 0.559689C8.2348 0.405747 8.47191 0.393268 8.62585 0.531815C8.77979 0.670362 8.79227 0.907471 8.65372 1.06141L5.27872 4.81141C5.20761 4.89043 5.1063 4.93555 4.99999 4.93555C4.89368 4.93555 4.79237 4.89043 4.72125 4.81141L1.34625 1.06141C1.20771 0.907471 1.22018 0.670362 1.37413 0.531815Z" fill="#666666" stroke="#666666"></path>
                                        </svg>
                                      </div>
                                    </div>
                                    <span className="input-guide-v2-item__subtitle">快速启动，划词问答，多格式全能处理</span>
                                  </div>
                                  <div className="input-guide-v2-item" data-item-title="国画创作" data-item-sub-title="工笔荷花" data-item-index="2" data-item-skill-id="12-new" data-item-report-now-internet-search-status="3" data-item-banner-id="10651" data-item-cms-id="10651" data-item-target-model="deep_seek_v3" data-item-report-internet-search="2" data-hy-exposured="1" onClick={() => handleExampleQuestion('国画创作')}>
                                    <div className="input-guide-v2-item__title-wrap">
                                      <span>国画创作</span>
                                    </div>
                                    <span className="input-guide-v2-item__subtitle">工笔荷花</span>
                                  </div>
                                  <div className="input-guide-v2-item" data-item-title="识图求知" data-item-sub-title="结合财报数据计算毛利率" data-item-index="3" data-item-skill-id="unique-skill-ai-generate-text" data-item-report-now-internet-search-status="3" data-item-banner-id="10482" data-item-cms-id="10482" data-item-target-model="deep_seek" data-item-report-internet-search="2" data-hy-exposured="1" onClick={() => handleExampleQuestion('识图求知')}>
                                    <div className="input-guide-v2-item__title-wrap">
                                      <span>识图求知</span>
                                    </div>
                                    <span className="input-guide-v2-item__subtitle">结合财报数据计算毛利率</span>
                                  </div>
                                  <div className="input-guide-v2-item" data-item-title="好奇发现" data-item-sub-title="如果地球没有风" data-item-index="4" data-item-skill-id="unique-skill-aisearch" data-item-report-now-internet-search-status="3" data-item-banner-id="10580" data-item-cms-id="10580" data-item-target-model="deep_seek" data-item-report-internet-search="3" data-hy-exposured="1" onClick={() => handleExampleQuestion('好奇发现')}>
                                    <div className="input-guide-v2-item__title-wrap">
                                      <span>好奇发现</span>
                                    </div>
                                    <span className="input-guide-v2-item__subtitle">如果地球没有风</span>
                                  </div>
                                </div>
                                <div className="input-guide-v2__reach-right">
                                  <div>
                                    <span className="yb-icon iconfont-yb icon-yb-right">→</span>
                                  </div>
                                </div>
                                <div style={{ '--yb-background': 'var(--background-page_background_web)' }}></div>
                                <div className="agent-dialogue__content--common__input-box">
                                  <div>
                                    <div className="style__text-area___JRVgQ yb-input-box-textarea style__text-area--pc___H5tSZ style__text-area--empty___PwLBH agent-input-text-area style__text-area-show-switch-model___TEeRO" id="searchbar-editor">
                                      <div></div>
                                      <div className="style__text-area__wrapper___v8PgB">
                                        <div className="style__text-area__attachment___Ek2Kp"></div>
                                        <div className="style__text-area__start___B3hfY style__text-area__start--placeholder___TuTF8 style__tooltipLiteBox___GYilv">
                                          <div>
                                            <div className="style__text-area__edit___BKkcb">
                                              <div id="search-bar" style={{ position: 'relative', flex: '1 1 0%', paddingLeft: '5px', display: 'flex' }}>
                                                <div className="chat-input-editor InputTextArea_hightLightTextAreaNew__aKxTD style__text-area__edit__content___HVSts ql-container" style={{ flex: '1 1 0%' }}>
                                                  <div className="ql-editor ql-blank" contentEditable="true" data-placeholder="有问题，尽管问，shift+enter换行" spellCheck="false" autoComplete="off" autoCorrect="off" autoCapitalize="off" enterKeyHint="send" style={{
                                                    minHeight: '24px',
                                                    fontSize: '14px',
                                                    lineHeight: '1.5',
                                                    outline: 'none'
                                                  }}
                                                  onInput={(e) => {
                                                    setInputValue(e.target.textContent || '')
                                                    e.target.style.height = 'auto'
                                                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
                                                  }}
                                                  onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                      e.preventDefault()
                                                      handleSend()
                                                    }
                                                  }}
                                                  ></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="style__text-area__end___ow95N">
                                          <div className="style__btn-start___X9oIb">
                                            <div className="InputToolbar_iconListLeft__Ggvh_" style={{ '--input-toolbar-font-size': '14px' }}>
                                              <div className="ThinkSelector_iconContainer__5HMzp ThinkSelector_allIcon__Ndq_t ThinkSelector_selected__YUTmh ThinkSelector_iconDeepThinkAll__sFxNq" dt-button-id="deep_think" dt-model-id="hunyuan_t1">
                                                <div className="ThinkSelector_iconButton__ikmxD">
                                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.74121 3.17676C9.89642 1.88502 11.9715 1.59281 13.001 2.62207L13.1289 2.76465C14.002 3.83505 13.6794 5.82083 12.4443 7.88086C13.7358 10.0358 14.0282 12.1093 12.999 13.1387L12.8574 13.2676C11.7872 14.1405 9.8019 13.8175 7.74219 12.583C5.68184 13.8185 3.69561 14.1417 2.625 13.2686L2.4834 13.1396C1.45403 12.1102 1.74622 10.0361 3.03809 7.88086C1.80268 5.82062 1.48033 3.83423 2.35352 2.76367L2.48145 2.62207C3.51103 1.59274 5.58588 1.88478 7.74121 3.17676ZM3.78906 8.99121C3.5844 9.38197 3.42119 9.76094 3.30176 10.1191C2.87109 11.4111 3.10053 12.0594 3.33203 12.291C3.56382 12.5224 4.21138 12.7508 5.50293 12.3203C5.86105 12.2009 6.23914 12.0365 6.62988 11.832C6.11465 11.4433 5.6037 11.0011 5.11133 10.5088C4.61932 10.0168 4.17756 9.50607 3.78906 8.99121ZM11.6924 8.99121C11.3038 9.50628 10.8623 10.0176 10.3701 10.5098C9.8781 11.0017 9.36738 11.4436 8.85254 11.832C9.2432 12.0365 9.62148 12.2 9.97949 12.3193C11.2712 12.7499 11.9187 12.5215 12.1504 12.29C12.3818 12.0584 12.6111 11.4106 12.1807 10.1191C12.0613 9.76095 11.8971 9.382 11.6924 8.99121ZM7.74121 4.60449C7.14654 5.0171 6.54395 5.51762 5.96094 6.10059C5.37795 6.68359 4.87738 7.28626 4.46484 7.88086C4.87711 8.47532 5.37627 9.07839 5.95898 9.66113C6.54239 10.2445 7.146 10.7446 7.74121 11.1572C8.33603 10.7448 8.93937 10.2452 9.52246 9.66211C10.1055 9.07907 10.6051 8.4757 11.0176 7.88086C10.6049 7.28598 10.1047 6.68284 9.52148 6.09961C8.93871 5.5169 8.33558 5.01691 7.74121 4.60449ZM5.50195 3.44043C4.21021 3.00992 3.56173 3.23924 3.33008 3.4707C3.09874 3.70267 2.87149 4.35064 3.30176 5.6416C3.4212 5.99984 3.58447 6.37866 3.78906 6.76953C4.17759 6.25456 4.62021 5.74407 5.1123 5.25195C5.60467 4.75963 6.11561 4.31738 6.63086 3.92871C6.23967 3.72379 5.86052 3.55995 5.50195 3.44043ZM12.1523 3.4707C11.9207 3.23922 11.2723 3.01086 9.98047 3.44141C9.62227 3.5608 9.24333 3.72405 8.85254 3.92871C9.36727 4.31709 9.87822 4.75913 10.3701 5.25098C10.8623 5.74319 11.3038 6.25444 11.6924 6.76953C11.897 6.37858 12.0612 5.99986 12.1807 5.6416C12.611 4.35025 12.3838 3.70236 12.1523 3.4707Z" fill="currentColor" fillOpacity="0.9"></path>
                                                  </svg>
                                                </div>
                                                深度思考
                                              </div>
                                              <div>
                                                <div className="index_v2_active__mMizI index_v2_selectArrowButtonWrapper__ggyIU index_v2_selectArrowButtonWrapperAuto__55tFN" dt-button-id="internet_search" dt-internet-search="autoInternetSearch">
                                                  <div className="index_v2_mainSection__SNIvs">
                                                    <div className="index_v2_contentIcon__7r1jf">
                                                      <div className="index_v2_stillIcon__YzNea">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <path fillRule="evenodd" clipRule="evenodd" d="M8.0019 13.1391C10.8399 13.1391 13.1405 10.8384 13.1405 8.00044C13.1405 5.16245 10.8399 2.86182 8.0019 2.86182C5.16392 2.86182 2.86328 5.16245 2.86328 8.00044C2.86328 10.8384 5.16392 13.1391 8.0019 13.1391Z" stroke="currentColor" strokeLinecap="round"></path>
                                                          <path fillRule="evenodd" clipRule="evenodd" d="M8.00076 13.1391C9.13596 13.1391 10.0562 10.8384 10.0562 8.00044C10.0562 5.16245 9.13596 2.86182 8.00076 2.86182C6.86556 2.86182 5.94531 5.16245 5.94531 8.00044C5.94531 10.8384 6.86556 13.1391 8.00076 13.1391Z" stroke="currentColor" strokeLinecap="round"></path>
                                                          <path d="M1.38478 6.22949C1.13962 6.75405 1 7.35789 1 8.0005C1 8.6431 1.13962 9.24694 1.38478 9.7715" stroke="currentColor" strokeLinecap="round"></path>
                                                          <path d="M14.6152 6.22949C14.8604 6.75405 15 7.35789 15 8.0005C15 8.6431 14.8604 9.24694 14.6152 9.7715" stroke="currentColor" strokeLinecap="round"></path>
                                                          <path d="M2.86328 8H13.1405" stroke="currentColor" strokeLinecap="round"></path>
                                                        </svg>
                                                      </div>
                                                    </div>
                                                    <div className="index_v2_contentText__bscyr">自动搜索</div>
                                                  </div>
                                                  <div className="index_v2_actionSection__ih7td yb-internet-search-btn-switch-icon" dt-button-id="internet_search_switch">
                                                    <div id="searchBar-auto-search-for-tips" className="input_searchBar-auto-search-for-tips__e_jTl index_v2_arrowIconWrapper__JGU6g">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                                        <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                      </svg>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="ybc-atomSelect-tools-wrapper">
                                                <button type="button" className="ybc-atomSelect-tools t-button t-button--theme-default t-button--variant-text">
                                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_2524_43861)">
                                                      <path d="M4.49609 8.79297C6.01297 8.79297 7.24299 10.0223 7.24316 11.5391C7.24303 13.0558 6.013 14.2861 4.49609 14.2861C2.97927 14.286 1.75013 13.0558 1.75 11.5391C1.75018 10.0224 2.9793 8.79307 4.49609 8.79297ZM11.2432 8.79297C12.7599 8.79309 13.9891 10.0224 13.9893 11.5391C13.9891 13.0558 12.76 14.286 11.2432 14.2861C9.72626 14.2861 8.49622 13.0558 8.49609 11.5391C8.49627 10.0223 9.72629 8.79297 11.2432 8.79297ZM4.49609 9.99219C3.64214 9.99229 2.9494 10.685 2.94922 11.5391C2.94935 12.3931 3.64211 13.0858 4.49609 13.0859C5.35016 13.0859 6.04284 12.3932 6.04297 11.5391C6.04279 10.685 5.35013 9.99219 4.49609 9.99219ZM11.2432 9.99219C10.3891 9.99219 9.69647 10.685 9.69629 11.5391C9.69642 12.3932 10.3891 13.0859 11.2432 13.0859C12.0971 13.0858 12.7899 12.3931 12.79 11.5391C12.7899 10.685 12.0971 9.99231 11.2432 9.99219ZM4.49609 2.0459C6.01298 2.0459 7.24299 3.27525 7.24316 4.79199C7.24303 6.30877 6.013 7.53906 4.49609 7.53906C2.97927 7.53896 1.75013 6.30871 1.75 4.79199C1.75017 3.27531 2.97929 2.046 4.49609 2.0459ZM10.9385 2.31738C11.0476 2.03155 11.4524 2.03156 11.5615 2.31738L11.958 3.3584C12.0979 3.72561 12.3928 4.01276 12.7637 4.14258L13.6016 4.43555C13.8987 4.53987 13.8986 4.96004 13.6016 5.06445L12.7637 5.3584C12.3929 5.48819 12.0979 5.77451 11.958 6.1416L11.5615 7.18262C11.4525 7.46885 11.0475 7.46885 10.9385 7.18262L10.542 6.1416C10.4021 5.77451 10.1071 5.48819 9.73633 5.3584L8.89844 5.06445C8.60143 4.96003 8.60134 4.53987 8.89844 4.43555L9.73633 4.14258C10.1072 4.01276 10.4021 3.72561 10.542 3.3584L10.9385 2.31738ZM4.49609 3.24512C3.64213 3.24522 2.94939 3.93795 2.94922 4.79199C2.94935 5.64607 3.64211 6.33877 4.49609 6.33887C5.35016 6.33887 6.04284 5.64613 6.04297 4.79199C6.0428 3.93789 5.35014 3.24512 4.49609 3.24512Z" fill="currentColor" fillOpacity="0.9"></path>
                                                    </g>
                                                    <defs>
                                                      <clipPath id="clip0_2524_43861">
                                                        <rect width="16" height="16" fill="currentColor"></rect>
                                                      </clipPath>
                                                    </defs>
                                                  </svg>
                                                  <span className="t-button__text">工具</span>
                                                  <span className="t-button__suffix">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                                      <path d="M3.5 5.00024L6.5 8.00024L9.5 5.00024" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </svg>
                                                  </span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="style__text-area__actions___S50n4" data-for-debug="1">
                                          <div className="style__text-area__toolbar___yAF6v">
                                            <div id="toolbar-btn-wrapper">
                                              <div data-testid="upload-file-selector">
                                                <div className="UploadFileSelector_iconContainer__6Wpsp UploadFileSelector_hoverWidth4Cirle__mtbDC">
                                                  <div className="UploadFileSelector_iconButton__LEwqk">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="UploadFileSelector_plusIcon__EiP7b">
                                                      <path d="M10.002 3.06055C10.4161 3.06065 10.752 3.39639 10.752 3.81055V9.25H16.1914C16.6056 9.25 16.9414 9.58579 16.9414 10C16.9414 10.4142 16.6056 10.75 16.1914 10.75H10.752V16.1895C10.752 16.6036 10.4161 16.9394 10.002 16.9395C9.58774 16.9395 9.25195 16.6037 9.25195 16.1895V10.75H3.8125C3.39829 10.75 3.0625 10.4142 3.0625 10C3.0625 9.58579 3.39829 9.25 3.8125 9.25H9.25195V3.81055C9.25195 3.39633 9.58774 3.06055 10.002 3.06055Z"></path>
                                                    </svg>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <a id="yuanbao-send-btn" className={`style__send-btn___RwTm5 ${!inputValue.trim() || isLoading ? 'style__send-btn--disabled___mhfdQ' : ''}`} onClick={handleSend}>
                                              <span className="hyc-common-icon iconfont icon-send" style={{ fontSize: '16px' }}>📤</span>
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
                  </div>
                </div>
              </div>
              <span role="presentation" className="Resizer vertical"></span>
              <div className="Pane vertical Pane2" style={{ flex: '1 1 0%', position: 'relative', outline: 'none' }}>
                <div className="agent-dialogue__content-split-pane__code">
                  <div id="yuanbao-canvas-container" className="agent-dialogue__content-split-pane__code"></div>
                </div>
              </div>
            </div>
            <div className="agent-dialogue__content-copyright">
              <div className="copyright-wp">
                <div className="copyright">
                  <div className="copyright__item">内容由AI生成，仅供参考</div>
                </div>
              </div>
            </div>
            <div className="agent-drag-file">
              <div className="agent-drag-file__content">
                <div className="agent-drag-file__logo">
                  <span className="icon iconfont icon-upload" style={{ fontSize: '30px' }}>📎</span>
                </div>
                <div className="agent-drag-file__name">文件拖动到此处即可上传</div>
                <div className="agent-drag-file__tip">支持文件格式：、jpg、jpeg、png、webp、bmp、gif、pdf、xls、xlsx、ppt、pptx、doc、docx、txt、csv、text、bat、c、cpp、cs、css、go、h、hpp、ini、java、js、json、log、lua、md、php、pl、py、rb、sh、sql、swift、tex、toml、vue、yaml、yml、xml、html</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS样式 - 完全照抄官网样式 */}
      <style>{`
        .yb-layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: var(--background-page_background_web, #f5f5f5);
        }
        .yb-nav-fixed {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          padding: 12px 16px;
        }
        .yb-nav {
          position: fixed;
          left: 0;
          top: 0;
          width: 260px;
          height: 100vh;
          background: white;
          border-right: 1px solid #e5e7eb;
          z-index: 999;
          display: flex;
          flex-direction: column;
        }
        .yb-nav__content-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .yb-nav__header {
          padding: 12px 16px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .yb-common-nav__trigger {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 6px;
          transition: background-color 0.2s;
        }
        .yb-common-nav__trigger:hover {
          background-color: #f3f4f6;
        }
        .yb-common-nav__tool {
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: #6b7280;
          transition: background-color 0.2s;
        }
        .yb-common-nav__tool:hover {
          background-color: #f3f4f6;
        }
        .yb-nav__footer {
          padding: 12px 16px;
          border-top: 1px solid #e5e7eb;
          margin-top: auto;
        }
        .yb-layout__content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          margin-left: 260px;
        }
        .agent-dialogue {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .agent-dialogue__content-wrapper {
          flex: 1;
          overflow: hidden;
        }
        .agent-dialogue__content--common {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .agent-dialogue__content--common__content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .say-hi_say-hi__2TUvz {
          text-align: center;
          margin-top: 40px;
        }
        .say-hi_title__-GN0J {
          font-size: 32px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }
        .input-guide-v2 {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-top: 32px;
        }
        .input-guide-v2-item {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 200px;
          flex: 1 1 auto;
          max-width: 300px;
        }
        .input-guide-v2-item:hover {
          border-color: #0066ff;
          box-shadow: 0 2px 8px rgba(0, 102, 255, 0.1);
        }
        .input-guide-v2-item__title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }
        .input-guide-v2-item__title-wrap span {
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
        }
        .input-guide-v2-item__subtitle {
          font-size: 12px;
          color: #6b7280;
        }
        .agent-dialogue__content--common__input {
          padding: 16px 24px;
          background: white;
          border-top: 1px solid #e5e7eb;
        }
        .agent-dialogue__content--common__input__content {
          max-width: 800px;
          margin: 0 auto;
        }
        .style__text-area__start___B3hfY {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          padding-left: 4px;
        }
        .ThinkSelector_iconContainer__5HMzp {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .ThinkSelector_iconContainer__5HMzp:hover {
          background-color: #f3f4f6;
        }
        .ThinkSelector_iconButton__ikmxD {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .index_v2_selectArrowButtonWrapper__ggyIU {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
          background-color: #e5e7eb;
        }
        .index_v2_selectArrowButtonWrapper__ggyIU:hover {
          background-color: #d1d5db;
        }
        .index_v2_mainSection__SNIvs {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .index_v2_contentIcon__7r1jf {
          display: flex;
          align-items: center;
        }
        .index_v2_contentText__bscyr {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.9);
        }
        .ybc-atomSelect-tools {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.9);
          transition: background-color 0.2s;
        }
        .ybc-atomSelect-tools:hover {
          background-color: #f3f4f6;
        }
        .agent-dialogue__content--common__input-box {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 12px;
          display: flex;
          align-items: flex-end;
          gap: 12px;
        }
        .ql-editor {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 14px;
          font-family: inherit;
          resize: none;
          min-height: 24px;
          max-height: 120px;
          overflow-y: auto;
          outline: none;
          color: #1f2937;
          line-height: 1.5;
        }
        .style__send-btn___RwTm5 {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
          flex-shrink: 0;
          background: #0066ff;
          color: white;
        }
        .style__send-btn___RwTm5:hover:not(.style__send-btn--disabled___mhfdQ) {
          background: #0052cc;
        }
        .style__send-btn--disabled___mhfdQ {
          background: #d1d5db;
          cursor: not-allowed;
        }
        .agent-dialogue__content-copyright {
          padding: 8px 24px;
          text-align: center;
        }
        .copyright__item {
          font-size: 12px;
          color: #9ca3af;
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  )
}

export default App
