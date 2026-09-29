import type { SlideObject } from './objects.js';
type Background = {
    type: 'none';
} | {
    type: 'color';
    color: string;
} | {
    type: 'image';
    url: string;
} | {
    type: 'gradient';
    colors: string[];
    angle?: number;
};
type Slide = {
    id: string;
    name: string;
    background: Background;
    objects: SlideObject[];
};
export { Slide, Background };
