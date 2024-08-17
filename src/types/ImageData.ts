export type ImageData = {
    id?: number;
    name: string;
    extension?: string;
    url?: string;
    blobUrl?: string;
    has_watermark: boolean;
    belongs_to: number[];
    file?: File;
    uploaded?: Date;
}