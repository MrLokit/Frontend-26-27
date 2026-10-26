import type { Presentation } from './index.js';

/* Текущее состояние презентации.
   Хранится в модуле, чтобы быть доступным из любого места приложения. */
let currentPresentation: Presentation | null = null;

/* Обработчик, который вызывается при любом изменении состояния.
   React будет подписываться на него для перерисовки. */
let editorChangeHandler: (() => void) | null = null;

/* Функция-модификатор, которая принимает текущую модель и параметры,
   а возвращает новую модель (иммутабельно). */
type Modifier<P = any> = (model: Presentation, params: P) => Presentation;

function setInitialState(presentation: Presentation): void {
/* Устанавливает начальное состояние презентации. */
    currentPresentation = presentation;
    if (presentation.slides.length > 0) {
        activeSlideId = presentation.slides[0].id; // <-- добавили
    }
}

function getState(): Presentation | null {
/* Возвращает актуальное состояние презентации. */
    return currentPresentation;
}

function dispatch(modifier: Modifier, params: any = null): void {
/* Изменяет модель приложения.
   Принимает функцию-модификатор и параметры для неё. */
    if (!currentPresentation) {
        console.error('State is not initialized! Call setInitialState first.');
        return;
    }

    currentPresentation = modifier(currentPresentation, params);

    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

function addEditorChangeHandler(handler: () => void): void {
/* Добавляет обработчик изменения модели редактора (подписка).
   Вызывается при каждом изменении состояния. */
    editorChangeHandler = handler;
}

let isPreviewMode = false;
let previewSlideIndex = 0;

function setPreviewMode(mode: boolean): void {
    isPreviewMode = mode;
    if (mode) {
        previewSlideIndex = 0; // При открытии всегда начинаем с первого
    }
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

function getPreviewMode(): boolean {
    return isPreviewMode;
}

function setPreviewSlideIndex(index: number): void {
    previewSlideIndex = index;
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

function getPreviewSlideIndex(): number {
    return previewSlideIndex;
}

let activeSlideId: string | null = null;

function setActiveSlideId(id: string): void {
    activeSlideId = id;
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

function getActiveSlideId(): string | null {
    return activeSlideId;
}

export {
    setInitialState,
    getState,
    dispatch,
    addEditorChangeHandler,
    setPreviewMode, 
    getPreviewMode,
    setActiveSlideId,
    getActiveSlideId,
    setPreviewSlideIndex, // <-- новое
    getPreviewSlideIndex, // <-- новое
};