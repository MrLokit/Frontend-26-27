export type { Presentation } from './types/presentation.js';
export type { Slide, Background } from './types/slide.js';
export type { BaseSlideObject, TextObject, ImageObject, SlideObject, TextObjectData, ImageObjectData, } from './types/objects.js';
export { createPresentation, updatePresentationName, savePresentation, loadPresentation, } from './functions/presentation.js';
export { addSlide, removeSlides, moveSlide, duplicateSlide, setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundGradient, clearSlideBackground, } from './functions/slide.js';
export { addTextBox, addImageObject, removeObject, moveObject, resizeObject, updateTextBoxStyle, } from './functions/objects.js';
