// Рисует слайд
import type { Slide } from '../index.js';
import { SlideObject } from './SlideObject.js';
import styles from './SlidePreview.module.css';

interface SlidePreviewProps {
    slide: Slide;
    isThumbnail?: boolean;
}

function SlidePreview({ slide, isThumbnail = false }: SlidePreviewProps) {
    const backgroundStyles: React.CSSProperties = {};

    if (slide.background.type === 'color') {
        backgroundStyles.backgroundColor = slide.background.color;
    } else if (slide.background.type === 'image') {
        backgroundStyles.backgroundImage = `url(${slide.background.url})`;
        backgroundStyles.backgroundSize = 'cover';
        backgroundStyles.backgroundPosition = 'center';
    }

    const innerStyles: React.CSSProperties = isThumbnail 
        ? { transform: 'scale(0.2)', transformOrigin: 'top left', width: '800px', height: '450px' } 
        : {};


    return (
        <div 
            className={`${styles.slide} ${isThumbnail ? styles.thumbnail : ''}`} 
            style={backgroundStyles}
        >
            <div style={innerStyles}>
                {slide.objects.map((obj) => (
                    <SlideObject key={obj.id} object={obj} />
                ))}
            </div>
        </div>
    );
}

export { SlidePreview };