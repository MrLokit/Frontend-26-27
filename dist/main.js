import { createPresentation, addSlide } from './index.js';
let presentation = createPresentation('Моя презентация');
presentation = addSlide(presentation, 'Второй слайд');
console.log(presentation.name);
console.log(presentation.slides.length);
console.log(presentation.slides.map((s) => s.name));
