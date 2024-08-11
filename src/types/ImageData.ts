export type ImageData = {
    id: number;
    name: string;
    url: string;
    uploaded: Date;
    has_watermark: boolean;
    belongs_to: number[];
}