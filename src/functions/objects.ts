import type { Slide } from '../types/slide.js';
import type { TextObject, ImageObject, TextObjectData, ImageObjectData } from '../types/objects.js';

function generateId(): string {
/* Генерирует "случайный" айди */
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}

function addTextBox(slide: Slide, data: TextObjectData): Slide {
    const newObject: TextObject = {
        ...data,
        id: generateId(),
        type: 'text',
    };
    return {
        ...slide,
        objects: [...slide.objects, newObject],
    };
}

function addImageObject(slide: Slide, data: ImageObjectData): Slide {
    const newObject: ImageObject = {
        ...data,
        id: generateId(),
        type: 'image',
    };
    return {
        ...slide,
        objects: [...slide.objects, newObject],
    };
}

function removeObject(slide: Slide, objectId: string): Slide {
    return {
        ...slide,
        objects: slide.objects.filter((obj) => obj.id !== objectId),
    };
}

function moveObject(slide: Slide, objectId: string, newX: number, newY: number): Slide {
    return {
        ...slide,
        objects: slide.objects.map((obj) =>
            obj.id === objectId ? { ...obj, x: newX, y: newY } : obj
        ),
    };
}

function resizeObject(slide: Slide, objectId: string, newWidth: number, newHeight: number): Slide {
    return {
        ...slide,
        objects: slide.objects.map((obj) =>
            obj.id === objectId ? { ...obj, width: newWidth, height: newHeight } : obj
        ),
    };
}

function updateTextBoxStyle(
    slide: Slide,
    objectId: string,
    fontFamily: string,
    fontSize: number,
    fontColor: string
): Slide {
    return {
        ...slide,
        objects: slide.objects.map((obj) => {
            if (obj.id === objectId && obj.type === 'text') {
                return { ...obj, fontFamily, fontSize, fontColor };
            }
            return obj;
        }),
    };
}

export {
    addTextBox,
    addImageObject,
    removeObject,
    moveObject,
    resizeObject,
    updateTextBoxStyle,
};