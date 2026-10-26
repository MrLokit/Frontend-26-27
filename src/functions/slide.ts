import type { Presentation } from '../types/presentation.js';
import type { Slide } from '../types/slide.js';

function generateId(): string {
/* Генерирует "случайный" айди */
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}

function createDefaultSlide(slideName: string): Slide {
/* Создает пустой слайд с передаваемым именем */
    return {
        id: generateId(),
        name: slideName,
        background: { type: 'none' },
        objects: [],
    };
}

function addSlide(presentation: Presentation, slideName?: string): Presentation {
/* Добавление нового слайда. Имя не обязательно передавать */
    const newSlide = createDefaultSlide(slideName || `Слайд ${presentation.slides.length + 1}`);
    return {
        ...presentation,
        slides: [...presentation.slides, newSlide],
    };
} 

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.filter((slide) => !slideIds.includes(slide.id)),
    };
}

function moveSlide(presentation: Presentation, slideId: string, newIndex: number): Presentation {
    const currentIndex = presentation.slides.findIndex((slide) => slide.id === slideId);
    if (currentIndex === -1) {
        return presentation;
    }
    const slidesCopy = [...presentation.slides];
    const [removed] = slidesCopy.splice(currentIndex, 1);
    slidesCopy.splice(newIndex, 0, removed);
    return {
        ...presentation,
        slides: slidesCopy,
    };
}

function duplicateSlide(presentation: Presentation, slideId: string): Presentation {
/* Дублируем слайд сразу после выбранного */
    const slide = presentation.slides.find((item) => item.id === slideId);
    if (!slide) {
        return presentation;
    }
    const clonedSlide: Slide = {
        ...slide,
        id: generateId(),
        objects: slide.objects.map((obj) => ({ ...obj, id: generateId() })),
    };
    const index = presentation.slides.findIndex((item) => item.id === slideId);
    const slidesCopy = [...presentation.slides];
    slidesCopy.splice(index + 1, 0, clonedSlide);
    return {
        ...presentation,
        slides: slidesCopy,
    };
}

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
    return {
        ...slide,
        background: { type: 'color', color },
    };
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
    return {
        ...slide,
        background: { type: 'image', url: imageUrl },
    };
}

function setSlideBackgroundGradient(slide: Slide, colors: string[], angle: number = 0): Slide {
    return {
        ...slide,
        background: { type: 'gradient', colors, angle },
    };
}

function clearSlideBackground(slide: Slide): Slide {
    return {
        ...slide,
        background: { type: 'none' },
    };
}

export {
    addSlide,
    removeSlides,
    moveSlide,
    duplicateSlide,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    clearSlideBackground,
};