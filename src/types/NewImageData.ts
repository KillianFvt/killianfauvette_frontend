export type NewImageData = {
    name: string;
    url: string;
    has_watermark: boolean;
    belongs_to: number[];
    file: File;
}