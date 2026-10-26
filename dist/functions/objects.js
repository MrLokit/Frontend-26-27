function generateId() {
    /* Генерирует "случайный" айди */
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}
function addTextBox(slide, data) {
    const newObject = {
        ...data,
        id: generateId(),
        type: 'text',
    };
    return {
        ...slide,
        objects: [...slide.objects, newObject],
    };
}
function addImageObject(slide, data) {
    const newObject = {
        ...data,
        id: generateId(),
        type: 'image',
    };
    return {
        ...slide,
        objects: [...slide.objects, newObject],
    };
}
function removeObject(slide, objectId) {
    return {
        ...slide,
        objects: slide.objects.filter((obj) => obj.id !== objectId),
    };
}
function moveObject(slide, objectId, newX, newY) {
    return {
        ...slide,
        objects: slide.objects.map((obj) => obj.id === objectId ? { ...obj, x: newX, y: newY } : obj),
    };
}
function resizeObject(slide, objectId, newWidth, newHeight) {
    return {
        ...slide,
        objects: slide.objects.map((obj) => obj.id === objectId ? { ...obj, width: newWidth, height: newHeight } : obj),
    };
}
function updateTextBoxStyle(slide, objectId, fontFamily, fontSize, fontColor) {
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
