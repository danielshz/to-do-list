import { Check } from 'phosphor-react';
import styles from './Checkbox.module.css';

interface CheckBoxProps {
    id: string;
    isDone: boolean;
    onChangeTaskStatus: (id: string) => void;
}

export function Checkbox({ id, isDone, onChangeTaskStatus }: CheckBoxProps) {
    function handleClick() {
        onChangeTaskStatus(id);
    }

    return (
        <>
            {isDone ? (
                <button onClick={handleClick} className={styles.doneCheckbox}>
                    <Check weight="bold" /> 
                </button>
            ) : (
                <button onClick={handleClick} className={styles.checkbox} />
            )}
        </>
    );
}