export interface CreateProductDto {
    id: string;
    name: string;
    description: string;
    quantity?: number;
    expirationDate?: string;
    permissionLevel?: number;
}