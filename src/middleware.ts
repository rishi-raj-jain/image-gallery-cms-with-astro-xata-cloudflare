import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const response = await next();
    const html = await response.text();
    return new Response(html, {
        status: response.status,
        headers: response.headers
    });
});