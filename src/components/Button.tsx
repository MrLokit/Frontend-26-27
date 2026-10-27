import styles from './Button.module.css';

interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

function Button({ text, onClick, className = '' }: ButtonProps) {
    const buttonClassName = `${styles.button} ${className}`.trim();

    return (
        <button className={buttonClassName} onClick={onClick}>
            {text}
        </button>
    );
}

export { Button };