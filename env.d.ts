interface CloudflareEnv {
    PORTFOLIO: R2Bucket
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends CloudflareEnv {}
    }
}

export {}
