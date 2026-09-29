import type { Presentation } from '../types/presentation.js';
import type { Slide } from '../types/slide.js';

function generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}

function createDefaultSlide(name: string): Slide {
    return {
        id: generateId(),
        name,
        background: { type: 'none' },
        objects: [],
    };
}

function createPresentation(name: string): Presentation {
    const firstSlide = createDefaultSlide('Слайд 1');
    return {
        id: generateId(),
        name,
        slides: [firstSlide],
        activeSlideId: firstSlide.id,
    };
}

function updatePresentationName(presentation: Presentation, name: string): Presentation {
    return {
        ...presentation,
        name,
    };
}

function savePresentation(presentation: Presentation): string {
    return JSON.stringify(presentation, null, 2);
}

function loadPresentation(json: string): Presentation {
    return JSON.parse(json) as Presentation;
}

export {
    createPresentation,
    updatePresentationName,
    savePresentation,
    loadPresentation,
};