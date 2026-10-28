window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
// ===== Android：状态栏配色跟随页面（白） =====
(function () {
  // 1) 设置状态栏颜色为白色（Android 会据此着色，并自动切换图标深浅）
  let theme = document.querySelector('meta[name="theme-color"]');
  if (!theme) {
    theme = document.createElement('meta');
    theme.name = 'theme-color';
    document.head.appendChild(theme);
  }
  theme.content = '#ffffff'; // 与页面一致的白色

  // 2) 让页面可延伸到系统栏下方（需 App 开启沉浸式/不保留安全区域才生效）
  let vp = document.querySelector('meta[name="viewport"]');
  if (vp) {
    if (!/viewport-fit/.test(vp.content)) vp.content += ', viewport-fit=cover';
  } else {
    vp = document.createElement('meta');
    vp.name = 'viewport';
    vp.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
    document.head.appendChild(vp);
  }

  // 3) 页面上下背景设为白，延伸到系统栏时颜色统一
  const s = document.createElement('style');
  s.textContent = `
    html, body { background:#ffffff !important; }
    body { padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }
  `;
  document.head.appendChild(s);
})();

