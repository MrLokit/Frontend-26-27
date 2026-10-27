import type { Presentation } from '../index.js';
import { getPreviewMode, setPreviewMode } from '../editor.js';
import { Toolbar } from './Toolbar.js';
import { SlideList } from './SlideList.js';
import { Workspace } from './Workspace.js';
import { PreviewOverlay } from './PreviewOverlay.js';
import styles from './App.module.css';

interface AppProps {
    presentation: Presentation;
}

function App({ presentation }: AppProps) {
    if (getPreviewMode()) {
        return (
            <PreviewOverlay 
                presentation={presentation} 
                onClose={() => setPreviewMode(false)} 
            />
        );
    }

    return (
        <div className={styles.appContainer}>
            <Toolbar presentation={presentation} />
            <div className={styles.mainArea}>
                <SlideList presentation={presentation} />
                <Workspace presentation={presentation} />
            </div>
        </div>
    );
}

export { App };