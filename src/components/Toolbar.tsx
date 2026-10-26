import type { Presentation } from '../index.js';
import { dispatch, setPreviewMode } from '../editor.js'; // <-- добавили setPreviewMode
import { updatePresentationName } from '../functions/presentation.js';
import { Button } from './Button.js';
import { TextInput } from './TextInput.js';
import styles from './Toolbar.module.css';

interface ToolbarProps {
    presentation: Presentation;
}

function Toolbar({ presentation }: ToolbarProps) {
    const handleNameChange = (newName: string) => {
        dispatch(updatePresentationName, newName);
    };

    return (
        <div className={styles.toolbar}>
            <div className={styles.left}>
                <span className={styles.logo}>Presentation Maker</span>
            </div>
            <div className={styles.center}>
                <TextInput 
                    value={presentation.name} 
                    className={styles.nameInput} 
                    onChange={handleNameChange} 
                />
            </div>
            <div className={styles.right}>
                <Button text="+ Слайд" onClick={() => {}} />
                <Button text="Сохранить" onClick={() => {}} />
                {/* Включаем предпросмотр */}
                <Button text="Просмотр" onClick={() => setPreviewMode(true)} /> 
            </div>
        </div>
    );
}

export { Toolbar };