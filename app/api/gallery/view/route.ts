import { getRequestContext } from '@cloudflare/next-on-pages'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

interface CloudflareEnv {
    portfolio: R2Bucket
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key) return new Response('Missing key', { status: 400 })

    try {
        const context = getRequestContext()

        if (!context?.env) {
            return new Response(
                'R2 not available. Only works deployed on Cloudflare.',
                { status: 500 },
            )
        }

        const { env } = context as unknown as { env: CloudflareEnv }
        const bucket = env.portfolio

        if (!bucket) return new Response('R2 bucket not bound', { status: 500 })

        const object = await bucket.get(key)

        if (!object) return new Response('Not found', { status: 404 })

        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        headers.set('Cache-Control', 'public, max-age=31536000')

        return new Response(object.body, { headers })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return new Response(message, { status: 500 })
    }
}
