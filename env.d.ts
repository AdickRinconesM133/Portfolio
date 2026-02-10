interface CloudflareEnv {
    portfolio: R2Bucket
}

declare global {
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface ProcessEnv extends CloudflareEnv {}
    }
}

export {}
