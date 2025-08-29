"use client"
import styles from "./SubmitBtn.module.scss";
type Props = {
    value?: string;
    disabled?: boolean;
};

export default function SubmitBtn({ value, disabled}: Props) {

    return (
        <button
            type="submit"
            className={styles.formSubmitBtn}
            disabled={disabled}
        >
            {value}
        </button >

    );
}



