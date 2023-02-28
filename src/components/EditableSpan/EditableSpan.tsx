import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    editMode: boolean
    setEditMode: (editMode: boolean) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    //let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        props.setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
       /* props.setEditMode(false);*/
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return props.editMode
        ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
        ;
};