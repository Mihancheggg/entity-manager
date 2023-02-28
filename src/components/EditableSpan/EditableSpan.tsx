import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    editMode: boolean
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [title, setTitle] = useState(props.value);

    const activateViewMode = () => {
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return props.editMode
        ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span >{title}</span>
        ;
};