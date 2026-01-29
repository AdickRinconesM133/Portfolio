import { getRequestContext } from '@cloudflare/next-on-pages'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const IMAGE_EXTENSIONS = /\.(webp|jpg|jpeg|png|avif|gif)$/i
const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i

interface CloudflareEnv {
    portfolio: any
}

interface GalleryItem {
    type: 'image' | 'video'
    url: string
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get('folder')

    if (!folder) return NextResponse.json({ error: 'Missing folder' }, { status: 400 })

    try {
        const context = getRequestContext()

        if (!context?.env) {
            return NextResponse.json({
                error: 'R2 not available. Only works deployed on Cloudflare.',
                isLocal: true,
            }, { status: 500 })
        }

        const { env } = context as unknown as { env: CloudflareEnv }
        const bucket = env.portfolio

        if (!bucket) return NextResponse.json({ error: 'R2 bucket not bound' }, { status: 500 })

        const listing = await bucket.list({ prefix: `${folder}/` })

        const items: GalleryItem[] = listing.objects
            .map((obj: any) => {
                const key = obj.key as string
                const filename = key.split('/').pop() ?? ''

                if (IMAGE_EXTENSIONS.test(filename)) {
                    return {
                        type: 'image' as const,
                        url: `/api/gallery/view?key=${encodeURIComponent(key)}`,
                    }
                }

                if (VIDEO_EXTENSIONS.test(filename)) {
                    return {
                        type: 'video' as const,
                        url: `/api/gallery/view?key=${encodeURIComponent(key)}`,
                    }
                }

                return null
            })
            .filter((item: GalleryItem | null): item is GalleryItem => item !== null)

        return NextResponse.json({ items })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
