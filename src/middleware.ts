import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const response = await next()
    if (!context.request.url.includes('/api/upload')) {
        response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=24400')
    }
    return response
});