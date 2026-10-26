import styles from './TextInput.module.css';

interface TextInputProps {
    value: string;
    placeholder?: string;
    type?: 'text' | 'color' | 'number';
    onChange?: (value: string) => void;
    className?: string;
}

function TextInput({ 
    value, 
    placeholder = '', 
    type = 'text', 
    onChange, 
    className = '' 
}: TextInputProps) {
    // Обработчик изменения значения
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const inputClassName = `${styles.input} ${className}`.trim();

    return (
        <input
            type={type}
            className={inputClassName}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
}

export { TextInput };