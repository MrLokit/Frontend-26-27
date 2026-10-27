import type { Presentation } from '../index.js';
import { getPreviewSlideIndex, setPreviewSlideIndex } from '../editor.js';
import { SlidePreview } from './SlidePreview.js';
import styles from './PreviewOverlay.module.css';

interface PreviewOverlayProps {
    presentation: Presentation;
    onClose: () => void;
}

function PreviewOverlay({ presentation, onClose }: PreviewOverlayProps) {
    const currentIndex = getPreviewSlideIndex();
    const totalSlides = presentation.slides.length;
    const currentSlide = presentation.slides[currentIndex];

    if (!currentSlide) {
        return null;
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setPreviewSlideIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < totalSlides - 1) {
            setPreviewSlideIndex(currentIndex + 1);
        }
    };

    return (
        <div 
            className={styles.overlay} 
            tabIndex={0} 
            onKeyDown={(e) => {
                if (e.key === 'Escape') onClose();
                if (e.key === 'ArrowLeft') handlePrev();
                if (e.key === 'ArrowRight') handleNext();
            }}
        >
            <div className={styles.topBar}>
                <span className={styles.counter}>
                    {currentIndex + 1} / {totalSlides}
                </span>
                <button className={styles.closeBtn} onClick={onClose}>
                    Закрыть (Esc)
                </button>
            </div>

            <div className={styles.content}>
                <button 
                    className={styles.navBtn} 
                    onClick={handlePrev} 
                    disabled={currentIndex === 0}
                >
                    Назад
                </button>

                <div className={styles.slideWrapper}>
                    <SlidePreview slide={currentSlide} />
                </div>

                <button 
                    className={styles.navBtn} 
                    onClick={handleNext} 
                    disabled={currentIndex === totalSlides - 1}
                >
                    Далее
                </button>
            </div>
        </div>
    );
}

export { PreviewOverlay };