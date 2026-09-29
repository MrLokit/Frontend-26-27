import { describe, it, expect } from 'vitest';
import {
    addSlide,
    removeSlides,
    moveSlide,
    setActiveSlide,
    duplicateSlide,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    clearSlideBackground,
} from '../functions/slide.js';
import { createPresentation } from '../functions/presentation.js';

describe('addSlide', () => {
    it('добавляет слайд в конец', () => {
        const presentation = createPresentation('Тест');
        const updated = addSlide(presentation);
        expect(updated.slides.length).toBe(2);
        expect(updated.slides[1].name).toBe('Слайд 2');
    });

    it('принимает кастомное имя', () => {
        const presentation = createPresentation('Тест');
        const updated = addSlide(presentation, 'Финал');
        expect(updated.slides[1].name).toBe('Финал');
    });

    it('не мутирует исходную презентацию', () => {
        const original = createPresentation('Тест');
        addSlide(original, 'Новый');
        expect(original.slides.length).toBe(1);
    });
});

describe('removeSlides', () => {
    it('удаляет один слайд', () => {
        let p = createPresentation('Тест');
        p = addSlide(p, 'Второй');
        p = addSlide(p, 'Третий');
        const secondId = p.slides[1].id;
        const updated = removeSlides(p, [secondId]);
        expect(updated.slides.length).toBe(2);
        expect(updated.slides.find((s) => s.id === secondId)).toBeUndefined();
    });

    it('удаляет несколько слайдов сразу', () => {
        let p = createPresentation('Тест');
        p = addSlide(p, 'Второй');
        p = addSlide(p, 'Третий');
        const ids = [p.slides[1].id, p.slides[2].id];
        const updated = removeSlides(p, ids);
        expect(updated.slides.length).toBe(1);
    });

    it('не мутирует исходный объект', () => {
        let p = createPresentation('Тест');
        p = addSlide(p, 'Второй');
        removeSlides(p, [p.slides[0].id]);
        expect(p.slides.length).toBe(2);
    });
});

describe('moveSlide', () => {
    it('перемещает слайд в конец', () => {
        let p = createPresentation('Тест');
        p = addSlide(p, 'Второй');
        p = addSlide(p, 'Третий');
        const firstId = p.slides[0].id;
        const updated = moveSlide(p, firstId, 2);
        expect(updated.slides[2].id).toBe(firstId);
    });

    it('перемещает слайд в начало', () => {
        let p = createPresentation('Тест');
        p = addSlide(p, 'Второй');
        p = addSlide(p, 'Третий');
        const lastId = p.slides[2].id;
        const updated = moveSlide(p, lastId, 0);
        expect(updated.slides[0].id).toBe(lastId);
    });

    it('перемещает слайд в середину', () => {
        let p = createPresentation('Тест');
        p = addSlide(p, 'Второй');
        p = addSlide(p, 'Третий');
        const firstId = p.slides[0].id;
        const updated = moveSlide(p, firstId, 1);
        expect(updated.slides[1].id).toBe(firstId);
    });

    it('возвращает ту же презентацию, если айди не найден', () => {
        const p = createPresentation('Тест');
        const updated = moveSlide(p, 'unknown', 0);
        expect(updated).toEqual(p);
    });
});

describe('setActiveSlide', () => {
    it('меняет активный слайд', () => {
        let p = createPresentation('Тест');
        p = addSlide(p, 'Второй');
        const secondId = p.slides[1].id;
        const updated = setActiveSlide(p, secondId);
        expect(updated.activeSlideId).toBe(secondId);
    });

    it('не мутирует оригинал', () => {
        let p = createPresentation('Тест');
        p = addSlide(p, 'Второй');
        const oldActive = p.activeSlideId;
        setActiveSlide(p, p.slides[1].id);
        expect(p.activeSlideId).toBe(oldActive);
    });
});

describe('duplicateSlide', () => {
    it('создаёт копию слайда сразу после оригинала', () => {
        let p = createPresentation('Тест');
        p = addSlide(p, 'Второй');
        const firstId = p.slides[0].id;
        const updated = duplicateSlide(p, firstId);
        expect(updated.slides.length).toBe(3);
        expect(updated.slides[1].name).toBe(p.slides[0].name);
    });

    it('копия имеет новый айди', () => {
        const p = createPresentation('Тест');
        const originalId = p.slides[0].id;
        const updated = duplicateSlide(p, originalId);
        expect(updated.slides[1].id).not.toBe(originalId);
    });

    it('возвращает ту же презентацию, если айди не найден', () => {
        const p = createPresentation('Тест');
        const updated = duplicateSlide(p, 'unknown');
        expect(updated).toEqual(p);
    });
});

describe('Фоны слайда', () => {
    it('setSlideBackgroundColor устанавливает цвет', () => {
        const p = createPresentation('Тест');
        const slide = setSlideBackgroundColor(p.slides[0], '#ff0000');
        expect(slide.background).toEqual({ type: 'color', color: '#ff0000' });
    });

    it('setSlideBackgroundImage устанавливает картинку', () => {
        const p = createPresentation('Тест');
        const slide = setSlideBackgroundImage(p.slides[0], '/img/bg.png');
        expect(slide.background).toEqual({ type: 'image', url: '/img/bg.png' });
    });

    it('setSlideBackgroundGradient устанавливает градиент с углом по умолчанию', () => {
        const p = createPresentation('Тест');
        const slide = setSlideBackgroundGradient(p.slides[0], ['#fff', '#000']);
        expect(slide.background).toEqual({
            type: 'gradient',
            colors: ['#fff', '#000'],
            angle: 0,
        });
    });

    it('setSlideBackgroundGradient принимает кастомный угол', () => {
        const p = createPresentation('Тест');
        const slide = setSlideBackgroundGradient(p.slides[0], ['#fff', '#000'], 90);
        expect(slide.background).toEqual({
            type: 'gradient',
            colors: ['#fff', '#000'],
            angle: 90,
        });
    });

    it('clearSlideBackground сбрасывает фон в none', () => {
        const p = createPresentation('Тест');
        const withColor = setSlideBackgroundColor(p.slides[0], '#000');
        const cleared = clearSlideBackground(withColor);
        expect(cleared.background).toEqual({ type: 'none' });
    });

    it('фон не мутирует исходный слайд', () => {
        const p = createPresentation('Тест');
        const original = p.slides[0];
        setSlideBackgroundColor(original, '#000');
        expect(original.background).toEqual({ type: 'none' });
    });
});