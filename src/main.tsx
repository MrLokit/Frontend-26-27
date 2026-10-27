import { createRoot } from 'react-dom/client';
import { App } from './components/App.js';
import { addEditorChangeHandler, setInitialState, getState } from './editor.js';
import { createTestPresentation } from './data.js';

// Создаём тестовую презентацию из данных и устанавливаем начально состояние
const initialData = createTestPresentation();
setInitialState(initialData);

// Находим корневой элемент (в index.html)
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found');
}
const root = createRoot(rootElement);

function renderApp(): void {
// Функция рендера всего приложения
    const state = getState();
    if (!state) return;
    root.render(<App presentation={state} />);
}
// Первичный рендер
renderApp();

// Подписываемся на изменения кода
addEditorChangeHandler(() => { renderApp(); });