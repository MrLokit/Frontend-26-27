import type { Slide } from '../types/slide.js';
import type { TextObject, ImageObject } from '../types/objects.js';

function generateId(): string {
/* Генерирует "случайный" айди */
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}

function addTextBox(
/* Добавляет новый текст на слайд */
    slide: Slide,
    content: string,
    x: number,
    y: number,
    width: number,
    height: number,
    fontFamily: string,
    fontSize: number,
    fontColor: string
): Slide {
/* Обьект - надпись */
    const newObject: TextObject = {
        id: generateId(),
        type: 'text',
        content,
        x,
        y,
        width,
        height,
        fontFamily,
        fontSize,
        fontColor,
    };
    return {
        ...slide,
        objects: [...slide.objects, newObject],
    };
}

function addImageObject(
/* Добавляет картинку на слайд */
    slide: Slide,
    imageUrl: string,
    x: number,
    y: number,
    width: number,
    height: number
): Slide {
/* Объект - изображение */
    const newObject: ImageObject = {
        id: generateId(),
        type: 'image',
        url: imageUrl,
        x,
        y,
        width,
        height,
    };
    return {
        ...slide,
        objects: [...slide.objects, newObject],
    };
}

function removeObject(slide: Slide, objectId: string): Slide {
/* Удаляем объект по айди */
    return {
        ...slide,
        objects: slide.objects.filter((obj) => obj.id !== objectId),
    };
}

function moveObject(slide: Slide, objectId: string, newX: number, newY: number): Slide {
/* Меняет координаты объекта по айди, Х и Y */
    return {
        ...slide,
        objects: slide.objects.map((obj) =>
            obj.id === objectId ? { ...obj, x: newX, y: newY } : obj
        ),
    };
}

function resizeObject(slide: Slide, objectId: string, newWidth: number, newHeight: number): Slide {
/* Меняет размер объекта */
    return {
        ...slide,
        objects: slide.objects.map((obj) =>
            obj.id === objectId ? { ...obj, width: newWidth, height: newHeight } : obj
        ),
    };
}

function updateTextBoxStyle(
/* Меняет стиль текста */
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