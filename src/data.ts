import type { Presentation } from './index.js';
import { createPresentation } from './functions/presentation.js';
import { addSlide, setSlideBackgroundColor } from './functions/slide.js';
import { addTextBox } from './functions/objects.js';

function createTestPresentation(): Presentation {
/* Создаёт тестовую презентацию с несколькими слайдами и объектами.
   Используется для начальной загрузки приложения. */
    let presentation = createPresentation('Тестовая презентация');

    // Первый слайд
    let slide1 = presentation.slides[0];
    slide1 = setSlideBackgroundColor(slide1, '#f0f0f0');
    slide1 = addTextBox(slide1, {
        content: 'Добро пожаловать!',
        x: 50,
        y: 50,
        width: 400,
        height: 60,
        fontFamily: 'Arial',
        fontSize: 32,
        fontColor: '#333333',
    });
    slide1 = addTextBox(slide1, {
        content: 'Лабораторная работа #2',
        x: 50,
        y: 120,
        width: 400,
        height: 40,
        fontFamily: 'Arial',
        fontSize: 20,
        fontColor: '#666666',
    });
    // Сохраняем обновлённый первый слайд 
    presentation = { ...presentation, slides: [slide1] };

    // Второй слайд
    presentation = addSlide(presentation, 'Список');
    let slide2 = presentation.slides[1];
    slide2 = setSlideBackgroundColor(slide2, '#ffffff');
    slide2 = addTextBox(slide2, {
        content: 'Список задач:',
        x: 50,
        y: 50,
        width: 300,
        height: 40,
        fontFamily: 'Arial',
        fontSize: 24,
        fontColor: '#000000',
    });
    slide2 = addTextBox(slide2, {
        content: '1. Разработать интерфейс',
        x: 50,
        y: 100,
        width: 300,
        height: 30,
        fontFamily: 'Arial',
        fontSize: 18,
        fontColor: '#333333',
    });
    slide2 = addTextBox(slide2, {
        content: '2. Добавить интерактивность',
        x: 50,
        y: 140,
        width: 300,
        height: 30,
        fontFamily: 'Arial',
        fontSize: 18,
        fontColor: '#333333',
    });
    slide2 = addTextBox(slide2, {
        content: '3. Выделить общие компоненты',
        x: 50,
        y: 180,
        width: 300,
        height: 30,
        fontFamily: 'Arial',
        fontSize: 18,
        fontColor: '#333333',
    });
    // Сохраняем второй слайд
    presentation = { ...presentation, slides: [...presentation.slides.slice(0, 1), slide2] };

    // Третий слайд
    presentation = addSlide(presentation, 'Итоги');
    let slide3 = presentation.slides[2];
    slide3 = setSlideBackgroundColor(slide3, '#e8f5e9');
    slide3 = addTextBox(slide3, {
        content: 'Итоги работы:',
        x: 50,
        y: 50,
        width: 300,
        height: 40,
        fontFamily: 'Arial',
        fontSize: 24,
        fontColor: '#2e7d32',
    });
    slide3 = addTextBox(slide3, {
        content: 'Готово!',
        x: 50,
        y: 120,
        width: 200,
        height: 60,
        fontFamily: 'Arial',
        fontSize: 36,
        fontColor: '#4caf50',
    });
    // Сохраняем третий слайд
    presentation = { ...presentation, slides: [...presentation.slides.slice(0, 2), slide3] };

    return presentation;
}

export {
    createTestPresentation,
};