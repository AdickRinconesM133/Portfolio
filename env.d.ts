interface CloudflareEnv {
    portfolio: R2Bucket
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends CloudflareEnv {}
    }
}

export {}
