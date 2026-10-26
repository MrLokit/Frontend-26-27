import type { Slide } from '../types/slide.js';
import type { TextObjectData, ImageObjectData } from '../types/objects.js';
declare function addTextBox(slide: Slide, data: TextObjectData): Slide;
declare function addImageObject(slide: Slide, data: ImageObjectData): Slide;
declare function removeObject(slide: Slide, objectId: string): Slide;
declare function moveObject(slide: Slide, objectId: string, newX: number, newY: number): Slide;
declare function resizeObject(slide: Slide, objectId: string, newWidth: number, newHeight: number): Slide;
declare function updateTextBoxStyle(slide: Slide, objectId: string, fontFamily: string, fontSize: number, fontColor: string): Slide;
export { addTextBox, addImageObject, removeObject, moveObject, resizeObject, updateTextBoxStyle, };
