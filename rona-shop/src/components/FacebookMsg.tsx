'use client'

import { useEffect } from 'react'

export default function FacebookMsg() {
  useEffect(() => {
    // Inject FB SDK
    const script = document.createElement('script')
    script.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js"
    script.defer = true
    script.async = true
    document.body.appendChild(script)

    // Set FB root
    let fbRoot = document.getElementById('fb-root')
    if (!fbRoot) {
      fbRoot = document.createElement('div')
      fbRoot.id = 'fb-root'
      document.body.prepend(fbRoot)
    }

    // Initialize FB
    window.fbAsyncInit = function() {
      // @ts-ignore
      FB.init({
        xfbml            : true,
        version          : 'v18.0'
      });
    };
  }, [])

  return (
    <>
      <div id="fb-root"></div>
      {/* 
        Replace 'page_id' with your actual Facebook Page ID.
        You can find it in your Page Settings > About.
      */}
      <div 
        className="fb-customerchat"
        // @ts-ignore
        attribution="biz_inbox"
        page_id="61566804074851" 
      >
      </div>
    </>
  )
}
