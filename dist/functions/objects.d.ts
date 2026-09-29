import type { Slide } from '../types/slide.js';
declare function addTextBox(slide: Slide, content: string, x: number, y: number, width: number, height: number, fontFamily: string, fontSize: number, fontColor: string): Slide;
declare function addImageObject(slide: Slide, imageUrl: string, x: number, y: number, width: number, height: number): Slide;
declare function removeObject(slide: Slide, objectId: string): Slide;
declare function moveObject(slide: Slide, objectId: string, newX: number, newY: number): Slide;
declare function resizeObject(slide: Slide, objectId: string, newWidth: number, newHeight: number): Slide;
declare function updateTextBoxStyle(slide: Slide, objectId: string, fontFamily: string, fontSize: number, fontColor: string): Slide;
export { addTextBox, addImageObject, removeObject, moveObject, resizeObject, updateTextBoxStyle, };
