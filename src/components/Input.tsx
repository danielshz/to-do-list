import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className={styles.container}>
            <input {...props} />
        </div>
    );
}