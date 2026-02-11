import { useEffect } from 'react'

const ClustrMap = () => {
  useEffect(() => {
    // Load ClustrMaps script
    const script = document.createElement('script')
    script.id = 'clustrmaps'
    script.src = '/index_files/map_v2.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.getElementById('clustrmaps')
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="mb-8">
      <hr className="my-6 border-t border-gray-300" />
      <div className="flex justify-center">
        <a
          target="_top"
          href="http://clustrmaps.com/site/1bdys"
          title="ClustrMaps People Search"
          id="clustrmaps-widget-v2"
          className="clustrmaps-map-control"
          style={{ width: '350px', display: 'block' }}
        >
          <div
            className="clustrmaps-map-container"
            style={{ backgroundColor: 'rgb(255, 255, 255)' }}
          >
            <div
              className="clstm clustrmaps-visitors"
              style={{
                fontSize: '12px',
                lineHeight: '16px',
                color: 'rgb(128, 128, 128)',
              }}
            >
              128,256 Total Pageviews
            </div>
            <div
              className="clstm clustrmaps-date"
              style={{
                display: 'none',
                fontSize: '12px',
                lineHeight: '16px',
                color: 'rgb(128, 128, 128)',
              }}
            >
              &nbsp;
            </div>
            <div
              className="clustrmaps-map liveDotsReady"
              style={{
                width: '350px',
                height: '171.569px',
                backgroundImage:
                  'url("//clustrmaps.com/generated_content/backs/bg-w_350-co_ffffff-cl_080808.png")',
              }}
            >
              <div
                className="jvectormap-container"
                style={{ backgroundColor: 'transparent' }}
              ></div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default ClustrMap
