import type { Presentation } from '../types/presentation.js';
import type { Slide } from '../types/slide.js';

function generateId(): string {
/* Генерирует "случайный" айди */
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}

function createDefaultSlide(): Slide {
/* Создает пустой слайд с заранее заданным именем */
    return {
        id: generateId(),
        name: 'Слайд 1',
        background: { type: 'none' },
        objects: [],
    };
}

function createPresentation(name: string): Presentation {
/* Создает презентацию с первым дефолт слайдом */
    const firstSlide = createDefaultSlide();
    return {
        id: generateId(),
        name,
        slides: [firstSlide],
        activeSlideId: firstSlide.id,
    };
}

function updatePresentationName(presentation: Presentation, name: string): Presentation {
/* Переименование презентации */
    return {
        ...presentation,
        name,
    };
}

function savePresentation(presentation: Presentation): string {
/* Превращает презентацию в строку JSON для сохранения */
    return JSON.stringify(presentation, null, 2);
}

function loadPresentation(json: string): Presentation {
/* Превращает JSON строку снова в обьект */
    return JSON.parse(json) as Presentation;
}

export {
    createPresentation,
    updatePresentationName,
    savePresentation,
    loadPresentation,
};