function generateId() {
    /* Генерирует "случайный" айди */
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}
function addTextBox(
/* Добавляет новый текст на слайд */
slide, content, x, y, width, height, fontFamily, fontSize, fontColor) {
    /* Обьект - надпись */
    const newObject = {
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
slide, imageUrl, x, y, width, height) {
    /* Объект - изображение */
    const newObject = {
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
function removeObject(slide, objectId) {
    /* Удаляем объект по айди */
    return {
        ...slide,
        objects: slide.objects.filter((obj) => obj.id !== objectId),
    };
}
function moveObject(slide, objectId, newX, newY) {
    /* Меняет координаты объекта по айди, Х и Y */
    return {
        ...slide,
        objects: slide.objects.map((obj) => obj.id === objectId ? { ...obj, x: newX, y: newY } : obj),
    };
}
function resizeObject(slide, objectId, newWidth, newHeight) {
    /* Меняет размер объекта */
    return {
        ...slide,
        objects: slide.objects.map((obj) => obj.id === objectId ? { ...obj, width: newWidth, height: newHeight } : obj),
    };
}
function updateTextBoxStyle(
/* Меняет стиль текста */
slide, objectId, fontFamily, fontSize, fontColor) {
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
export { addTextBox, addImageObject, removeObject, moveObject, resizeObject, updateTextBoxStyle, };
