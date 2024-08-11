export type NewImageData = {
    name: string;
    url: string;
    blobUrl: string;
    has_watermark: boolean;
    belongs_to: number[];
    file: File;
}