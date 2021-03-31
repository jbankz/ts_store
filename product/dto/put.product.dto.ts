export interface PutProductDto {
    id: string;
    name: string;
    description: string;
    quantity?: number;
    expirationDate?: string;
    permissionLevel?: number;
}