// Рисует конкретный текст или картинку на слайде
import type { SlideObject as SlideObjectType } from '../index.js';
import styles from './SlideObject.module.css';

interface SlideObjectProps {
    object: SlideObjectType;
}

function SlideObject({ object }: SlideObjectProps) {
    const baseStyles: React.CSSProperties = {
        position: 'absolute',
        left: object.x,
        top: object.y,
        width: object.width,
        height: object.height,
    };

    if (object.type === 'text') {
        return (
            <div
                className={styles.textObject}
                style={{
                    ...baseStyles,
                    fontFamily: object.fontFamily,
                    fontSize: object.fontSize,
                    color: object.fontColor,
                }}
            >
                {object.content}
            </div>
        );
    }

    return (
        <img
            className={styles.imageObject}
            src={object.url}
            alt="Slide object"
            style={baseStyles}
        />
    );
}

export { SlideObject };