interface VaultRequest {
    path: string
    file: Buffer
}

export interface MobileVaultRequest {
    path: string
    file: string
}

export default VaultRequest;