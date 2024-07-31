import { Trash } from "phosphor-react";
import { Checkbox } from "./Checkbox";

import styles from './Task.module.css';

export interface TaskType {
    id: string;
    text: string;
    isDone: boolean;
}

interface TaskProps extends TaskType {
    onDeleteTask: (taskToDeleteId: string) => void;
    onChangeTaskStatus: (taskToChangeStatusId: string) => void;
}

export function Task({ id, isDone, text, onDeleteTask, onChangeTaskStatus }: TaskProps) {
    function handleDeleteTask() {
        onDeleteTask(id);
    }

    return (
        <div className={styles.task} key={id}>
            <Checkbox
                id={id}
                isDone={isDone}
                onChangeTaskStatus={onChangeTaskStatus}
            />
            <p className={isDone ? styles.doneText : styles.text}>{text}</p>
            <button
                className={styles.deleteButton}
                onClick={handleDeleteTask}
            >
                <Trash />
            </button>
        </div>
    );
}