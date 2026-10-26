function generateId() {
    /* Генерирует "случайный" айди */
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}
function createDefaultSlide() {
    /* Создает пустой слайд с заранее заданным именем */
    return {
        id: generateId(),
        name: 'Слайд 1',
        background: { type: 'none' },
        objects: [],
    };
}
function createPresentation(name) {
    /* Создает презентацию с первым дефолт слайдом */
    const firstSlide = createDefaultSlide();
    return {
        id: generateId(),
        name,
        slides: [firstSlide],
    };
}
function updatePresentationName(presentation, name) {
    return {
        ...presentation,
        name,
    };
}
function savePresentation(presentation) {
    /* Превращает презентацию в строку JSON для сохранения */
    return JSON.stringify(presentation, null, 2);
}
function loadPresentation(json) {
    /* Превращает JSON строку снова в обьект */
    return JSON.parse(json);
}
export { createPresentation, updatePresentationName, savePresentation, loadPresentation, };
