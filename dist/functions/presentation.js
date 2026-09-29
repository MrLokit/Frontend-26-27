function generateId() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}
function createDefaultSlide(name) {
    return {
        id: generateId(),
        name,
        background: { type: 'none' },
        objects: [],
    };
}
function createPresentation(name) {
    const firstSlide = createDefaultSlide('Слайд 1');
    return {
        id: generateId(),
        name,
        slides: [firstSlide],
        activeSlideId: firstSlide.id,
    };
}
function updatePresentationName(presentation, name) {
    return {
        ...presentation,
        name,
    };
}
function savePresentation(presentation) {
    return JSON.stringify(presentation, null, 2);
}
function loadPresentation(json) {
    return JSON.parse(json);
}
export { createPresentation, updatePresentationName, savePresentation, loadPresentation, };
