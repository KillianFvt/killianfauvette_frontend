export type NewImageData = {
    name: string;
    extension: string;
    blobUrl: string;
    has_watermark: boolean;
    belongs_to: number[];
    file: File;
}