import { createRoot } from 'react-dom/client';
import { App } from './components/App.js';
import { addEditorChangeHandler, setInitialState, getState } from './editor.js';
import { createTestPresentation } from './data.js';

// 1. Создаём тестовую презентацию из данных и устанавливаем начально состояние
const initialData = createTestPresentation();
setInitialState(initialData);

// 2. Находим корневой DOM-элемент (он есть в index.html)
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found');
}
const root = createRoot(rootElement);

function renderApp(): void {
// 3. Функция рендера всего приложения
    const state = getState();
    if (!state) return;
    root.render(<App presentation={state} />);
}
// 4. Первичный рендер
renderApp();

// 5. Подписываемся на изменения кода. Как только кто-то вызовет dispatch(), renderApp() вызовется заново
addEditorChangeHandler(() => {
    renderApp();
});