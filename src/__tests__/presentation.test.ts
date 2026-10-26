import { describe, it, expect } from 'vitest';
import {
    createPresentation,
    updatePresentationName,
    savePresentation,
    loadPresentation,
} from '../functions/presentation.js';
import { addSlide } from '../functions/slide.js';

describe('createPresentation', () => {
    it('создаёт презентацию с переданным именем', () => {
        const presentation = createPresentation('Моя презентация');
        expect(presentation.name).toBe('Моя презентация');
    });

    it('создаёт один дефолтный слайд', () => {
        const presentation = createPresentation('Тест');
        expect(presentation.slides.length).toBe(1);
        expect(presentation.slides[0].name).toBe('Слайд 1');
    });

    it('генерирует уникальный айди', () => {
        const first = createPresentation('A');
        const second = createPresentation('B');
        expect(first.id).not.toBe(second.id);
    });
});

describe('updatePresentationName', () => {
    it('меняет название', () => {
        const original = createPresentation('Старое');
        const updated = updatePresentationName(original, 'Новое');
        expect(updated.name).toBe('Новое');
    });

    it('не мутирует исходный объект', () => {
        const original = createPresentation('Старое');
        updatePresentationName(original, 'Новое');
        expect(original.name).toBe('Старое');
    });

    it('сохраняет остальные поля', () => {
        const original = createPresentation('Старое');
        const updated = updatePresentationName(original, 'Новое');
        expect(updated.id).toBe(original.id);
        expect(updated.slides).toEqual(original.slides);
    });
});

describe('savePresentation и loadPresentation', () => {
    it('сохраняет презентацию в JSON-строку', () => {
        const presentation = createPresentation('Тест');
        const json = savePresentation(presentation);
        expect(typeof json).toBe('string');
        expect(json).toContain('"name": "Тест"');
    });

    it('восстанавливает презентацию из JSON', () => {
        const presentation = createPresentation('Тест');
        const json = savePresentation(presentation);
        const restored = loadPresentation(json);
        expect(restored).toEqual(presentation);
    });

    it('проходит полный цикл save → load без потерь', () => {
        let presentation = createPresentation('Цикл');
        presentation = addSlide(presentation, 'Второй');
        const restored = loadPresentation(savePresentation(presentation));
        expect(restored.slides.length).toBe(2);
        expect(restored.name).toBe('Цикл');
    });
});