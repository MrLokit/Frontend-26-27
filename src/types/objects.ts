type BaseSlideObject = {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

type TextObject = BaseSlideObject & {
    type: 'text';
    content: string;
    fontFamily: string;
    fontSize: number;
    fontColor: string;
};

type ImageObject = BaseSlideObject & {
    type: 'image';
    url: string;
};

type SlideObject = TextObject | ImageObject;

type TextObjectData = Omit<TextObject, 'id' | 'type'>;
type ImageObjectData = Omit<ImageObject, 'id' | 'type'>;

export type {
    BaseSlideObject,
    TextObject,
    ImageObject,
    SlideObject,
    TextObjectData,
    ImageObjectData,
};