import type { Presentation } from '../index.js';
import { getActiveSlideId } from '../editor.js'; // <-- импорт
import { SlidePreview } from './SlidePreview.js';
import { SlideProperties } from './SlideProperties.js';
import styles from './Workspace.module.css';

interface WorkspaceProps {
    presentation: Presentation;
}

function Workspace({ presentation }: WorkspaceProps) {
    // Получаем ID активного слайда
    const activeId = getActiveSlideId();
    
    // Ищем нужный слайд в массиве
    const activeSlide = presentation.slides.find(s => s.id === activeId) || presentation.slides[0];

    if (!activeSlide) {
        return <div className={styles.empty}>Нет слайдов</div>;
    }

    return (
        <div className={styles.workspace}>
            <div className={styles.canvasArea}>
                <SlidePreview slide={activeSlide} />
            </div>
            <SlideProperties slide={activeSlide} />
        </div>
    );
}

export { Workspace };