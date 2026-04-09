import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { clientsClaim } from 'workbox-core'
import { NetworkFirst } from 'workbox-strategies'
;(self as any).skipWaiting()
clientsClaim()
const manifest = (self as any).__WB_MANIFEST

if (manifest?.length) {
  // PROD_MODE
  precacheAndRoute(manifest)
  registerRoute(
    ({ request }) => request.mode === 'navigate',
    createHandlerBoundToURL('/index.html')
  )
} else {
  ;(self as any).__WB_DISABLE_DEV_LOGS = true
  // DEV_MODE
  registerRoute(
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst({
      cacheName: 'pages',
      networkTimeoutSeconds: 5,
    })
  )
}

registerRoute(
  ({ request }) =>
    ['style', 'script', 'worker', 'image', 'font'].includes(request.destination),
  new NetworkFirst({
    cacheName: 'assets',
    networkTimeoutSeconds: 5,
  })
)

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') (self as any).skipWaiting()
})
