// Левая колонка с миниатюрами
import type { Presentation } from '../index.js';
import { setActiveSlideId, getActiveSlideId, dispatch } from '../editor.js';
import { removeSlides } from '../functions/slide.js';
import { SlidePreview } from './SlidePreview.js';
import styles from './SlideList.module.css';

interface SlideListProps {
    presentation: Presentation;
}

function SlideList({ presentation }: SlideListProps) {
    const activeId = getActiveSlideId();

    // Обработчик правого клика
    const handleContextMenu = (e: React.MouseEvent, slideId: string) => {
        // Отменяем стандартное контекстное меню браузера
        e.preventDefault();

        const isConfirmed = window.confirm('Удалить этот слайд?');
        
        if (isConfirmed) {
            // Если удаляем текущий активный слайд, то переключаемся на первый оставшийся
            if (activeId === slideId) {
                const remainingSlides = presentation.slides.filter(s => s.id !== slideId);
                if (remainingSlides.length > 0) {
                    setActiveSlideId(remainingSlides[0].id);
                }
            }
            
            dispatch(removeSlides, [slideId]);
        }
    };

    return (
        <div className={styles.sidebar}>
            <h3 className={styles.title}>Слайды</h3>
            <div className={styles.list}>
                {presentation.slides.map((slide, index) => {
                    const isActive = slide.id === activeId;

                    return (
                        <div 
                            key={slide.id} 
                            className={`${styles.slideItem} ${isActive ? styles.active : ''}`}
                            onClick={() => setActiveSlideId(slide.id)}
                            onContextMenu={(e) => handleContextMenu(e, slide.id)} 
                        >
                            <span className={styles.slideNumber}>{index + 1}</span>
                            <SlidePreview slide={slide} isThumbnail={true} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export { SlideList };