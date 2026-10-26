import type { Slide } from '../index.js';
import styles from './SlideProperties.module.css';

interface SlidePropertiesProps {
    slide: Slide;
}

function SlideProperties({ slide }: SlidePropertiesProps) {
    return (
        <div className={styles.properties}>
            <h3 className={styles.title}>Свойства слайда</h3>
            <div className={styles.field}>
                <label>Фон:</label>
                <span>{slide.background.type}</span>
            </div>
            <div className={styles.field}>
                <label>Объектов:</label>
                <span>{slide.objects.length}</span>
            </div>
        </div>
    );
}

export { SlideProperties };