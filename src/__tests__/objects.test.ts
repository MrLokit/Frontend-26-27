import { describe, it, expect } from 'vitest';
import {
    addTextBox,
    addImageObject,
    removeObject,
    moveObject,
    resizeObject,
    updateTextBoxStyle,
} from '../functions/objects.js';
import { createPresentation } from '../functions/presentation.js';

describe('addTextBox', () => {
    it('добавляет текстовый объект', () => {
        const p = createPresentation('Тест');
        const slide = addTextBox(p.slides[0], 'Привет', 10, 20, 100, 50, 'Arial', 16, '#000');
        expect(slide.objects.length).toBe(1);
        expect(slide.objects[0].type).toBe('text');
    });

    it('сохраняет все параметры текста', () => {
        const p = createPresentation('Тест');
        const slide = addTextBox(p.slides[0], 'Привет', 10, 20, 100, 50, 'Arial', 16, '#000');
        const obj = slide.objects[0];
        expect(obj).toMatchObject({
            content: 'Привет',
            x: 10,
            y: 20,
            width: 100,
            height: 50,
            fontFamily: 'Arial',
            fontSize: 16,
            fontColor: '#000',
        });
    });

    it('не мутирует исходный слайд', () => {
        const p = createPresentation('Тест');
        addTextBox(p.slides[0], 'Текст', 0, 0, 10, 10, 'Arial', 12, '#000');
        expect(p.slides[0].objects.length).toBe(0);
    });
});

describe('addImageObject', () => {
    it('добавляет изображение', () => {
        const p = createPresentation('Тест');
        const slide = addImageObject(p.slides[0], '/img/photo.png', 0, 0, 200, 150);
        expect(slide.objects.length).toBe(1);
        expect(slide.objects[0].type).toBe('image');
    });

    it('сохраняет url и размеры', () => {
        const p = createPresentation('Тест');
        const slide = addImageObject(p.slides[0], '/img/photo.png', 5, 5, 200, 150);
        expect(slide.objects[0]).toMatchObject({
            url: '/img/photo.png',
            x: 5,
            y: 5,
            width: 200,
            height: 150,
        });
    });
});

describe('removeObject', () => {
    it('удаляет объект по id', () => {
        let p = createPresentation('Тест');
        let slide = addTextBox(p.slides[0], 'A', 0, 0, 10, 10, 'Arial', 12, '#000');
        slide = addTextBox(slide, 'B', 0, 0, 10, 10, 'Arial', 12, '#000');
        const firstId = slide.objects[0].id;
        const updated = removeObject(slide, firstId);
        expect(updated.objects.length).toBe(1);
        expect(updated.objects[0].content).toBe('B');
    });

    it('ничего не делает, если id не найден', () => {
        const p = createPresentation('Тест');
        const slide = addTextBox(p.slides[0], 'A', 0, 0, 10, 10, 'Arial', 12, '#000');
        const updated = removeObject(slide, 'unknown');
        expect(updated.objects.length).toBe(1);
    });
});

describe('moveObject', () => {
    it('меняет координаты', () => {
        const p = createPresentation('Тест');
        let slide = addTextBox(p.slides[0], 'A', 0, 0, 10, 10, 'Arial', 12, '#000');
        const id = slide.objects[0].id;
        slide = moveObject(slide, id, 100, 200);
        expect(slide.objects[0].x).toBe(100);
        expect(slide.objects[0].y).toBe(200);
    });

    it('не трогает другие объекты', () => {
        const p = createPresentation('Тест');
        let slide = addTextBox(p.slides[0], 'A', 0, 0, 10, 10, 'Arial', 12, '#000');
        slide = addTextBox(slide, 'B', 5, 5, 10, 10, 'Arial', 12, '#000');
        const firstId = slide.objects[0].id;
        slide = moveObject(slide, firstId, 100, 200);
        expect(slide.objects[1].x).toBe(5);
        expect(slide.objects[1].y).toBe(5);
    });
});

describe('resizeObject', () => {
    it('меняет размеры', () => {
        const p = createPresentation('Тест');
        let slide = addImageObject(p.slides[0], '/img/a.png', 0, 0, 100, 100);
        const id = slide.objects[0].id;
        slide = resizeObject(slide, id, 300, 200);
        expect(slide.objects[0].width).toBe(300);
        expect(slide.objects[0].height).toBe(200);
    });
});

describe('updateTextBoxStyle', () => {
    it('меняет стиль текста', () => {
        const p = createPresentation('Тест');
        let slide = addTextBox(p.slides[0], 'A', 0, 0, 10, 10, 'Arial', 12, '#000');
        const id = slide.objects[0].id;
        slide = updateTextBoxStyle(slide, id, 'Times', 20, '#fff');
        const obj = slide.objects[0];
        expect(obj).toMatchObject({
            fontFamily: 'Times',
            fontSize: 20,
            fontColor: '#fff',
        });
    });

    it('не меняет стиль изображения', () => {
        const p = createPresentation('Тест');
        const slide = addImageObject(p.slides[0], '/img/a.png', 0, 0, 100, 100);
        const id = slide.objects[0].id;
        const updated = updateTextBoxStyle(slide, id, 'Times', 20, '#fff');
        expect(updated.objects[0]).toEqual(slide.objects[0]);
    });
});