import type { Slide } from '../index.js';
import { SlideObject } from './SlideObject.js';
import styles from './SlidePreview.module.css';

interface SlidePreviewProps {
    slide: Slide;
    isThumbnail?: boolean;
}

function SlidePreview({ slide, isThumbnail = false }: SlidePreviewProps) {
    // Динамически формируем стили для фона
    const backgroundStyles: React.CSSProperties = {};

    // Обрабатываем все варианты фона из union-типа
    if (slide.background.type === 'color') {
        backgroundStyles.backgroundColor = slide.background.color;
    } else if (slide.background.type === 'image') {
        backgroundStyles.backgroundImage = `url(${slide.background.url})`;
        backgroundStyles.backgroundSize = 'cover';
        backgroundStyles.backgroundPosition = 'center';
    }

    return (
        <div 
            className={`${styles.slide} ${isThumbnail ? styles.thumbnail : ''}`} 
            style={backgroundStyles}
        >
            {slide.objects.map((obj) => (
                <SlideObject key={obj.id} object={obj} />
            ))}
        </div>
    );
}

export { SlidePreview };