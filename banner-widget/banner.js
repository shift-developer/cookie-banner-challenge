(async function WidgetBanner() {
    try {
        const curScriptElement = document.currentScript;
        const domainId = curScriptElement.getAttribute('domain-id');
        const cookieConsent = localStorage.getItem('cookie-consent-'+domainId)
        if(cookieConsent) return;
        const domainFullURL = curScriptElement.src;
        const bannerOrigin = domainFullURL.split('/widget/banner.js')[0];
        const response = await fetch(bannerOrigin+'/api/domains/'+domainId)
        const resJson = await response.json()
        if(!response.ok) throw new Error(resJson.message||'No domain data')
        const { bckColor, primaryColor, fontColor } = resJson.data
        const normalizeCss = 'margin:0;padding:0'
        const normalizeButton = '-webkit-appearance: none;-moz-appearance: none;appearance: none;text-decoration: none;border: 0px solid #000;'
        const bannerHtml = document.createElement('div')
        bannerHtml.style.cssText = 'width:100%;height:100%;background-color:rgba(107,114,128,0.75);position:fixed;top:0;bottom:0;right:0;left:0;z-index:30;display:flex;justify-content:center;align-items:start'
        bannerHtml.innerHTML = `
        <div style="background: ${bckColor};display:flex;align-items:center;justify-content:space-between;line-height:1rem;width:80%;height:10vh;border-radius:1rem;padding:15px 30px 15px 30px;margin:20px 0 0 0">
            <p style="${normalizeCss};color:${fontColor};font-size:14px;margin-right:5px;font-family:sans-serif">We use cookies to optimize our website and collect statistic on usage.</p>
            <button id="button${domainId}" style="${normalizeCss};${normalizeButton}color:${bckColor};background:${primaryColor};padding:12px 24px 12px 24px;max-height:40px;display:flex;justify-content:center;cursor:pointer;border-radius:0.375rem"><p style="${normalizeCss};font-size:14px;font-family:sans-serif">Accept</p></button>
        </div>`
        document.body.appendChild(bannerHtml);
        const buttonAccept = document.querySelector('#button'+domainId);
        buttonAccept.addEventListener('click', () => {
            localStorage.setItem('cookie-consent-'+domainId,'true')
            bannerHtml.style.display = 'none'
        })
    } catch(e) {
    }
})()

