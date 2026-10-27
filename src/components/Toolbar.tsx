// Верхняя панель
import type { Presentation } from '../index.js';
import { dispatch, setPreviewMode } from '../editor.js';
import { updatePresentationName, savePresentation } from '../functions/presentation.js';
import { addSlide } from '../functions/slide.js';
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

    const handleSave = () => {
        const jsonString = savePresentation(presentation);
        
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${presentation.name || 'presentation'}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
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
                <Button text="+ Слайд" onClick={() => dispatch(addSlide)} />
                <Button text="Сохранить" onClick={handleSave} />
                <Button text="Просмотр" onClick={() => setPreviewMode(true)} /> 
            </div>
        </div>
    );
}

export { Toolbar };