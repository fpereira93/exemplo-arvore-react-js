import React, { createRef, useCallback, useEffect, useState } from 'react';
import './styles.scoped.sass';

const Checkbox = (props) => {
    const [isPartial, setIsPartial] = useState(!!props.partial)

    const ref = createRef();

    const onChange = useCallback((e) => {
        props.onHandle({ id: props.id, checked: e.target.checked })
    }, [props.onHandle])

    useEffect(() => {
        props.reference({
            setChecked: (state) => {
                ref.current.checked = state
            },
            setPartial: (state) => {
                setIsPartial(state)
            },
        });
    })

    return (
        <div className="container">
            <input
                type="checkbox"
                id={props.id}
                defaultChecked={props.checked}
                onChange={onChange}
                ref={ref}
            />

            <label
                className={isPartial ? 'partial' : null}
                htmlFor={props.id}
            >
                {props.label}
            </label>
        </div>
    )
}

export default Checkbox;