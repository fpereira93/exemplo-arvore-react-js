import React, { useState } from 'react';
import './styles.scoped.sass';
import Checkbox from '../Checkbox';
import arrowGray from '../../assets/icons/down-arrow-gray.png';
import arrowBlue from '../../assets/icons/down-arrow-blue.png';

const TreeViewItem = (props) => {
    const [expanded, setExpanded] = useState(false);

    const renderButton = () => {
        if (props.getChildrens().length) {
            return (
                <div className={`toggle ${expanded ? 'expanded' : 'collapsed'}`} onClick={() => setExpanded(!expanded) }>
                    <img src={expanded ? arrowBlue : arrowGray } alt="Expandir" />
                </div>
            )
        }

        return null;
    }

    return (
        <div className="container">
            <div className="row" style={{ 'paddingLeft': `${props.level * 20}px` }}>
                <Checkbox
                    checked={props.checked}
                    id={props.id}
                    label={props.name}
                    onHandle={props.handleCheckbox}
                    partial={props.partial}
                    reference={props.reference}
                />

                { renderButton() }
            </div>

            { expanded ? props.getChildrens() : null }
        </div>
    )
}

export default TreeViewItem;