import type { Presentation } from '../types/presentation.js';
declare function createPresentation(name: string): Presentation;
declare function updatePresentationName(presentation: Presentation, name: string): Presentation;
declare function savePresentation(presentation: Presentation): string;
declare function loadPresentation(json: string): Presentation;
export { createPresentation, updatePresentationName, savePresentation, loadPresentation, };
