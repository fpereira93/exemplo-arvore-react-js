import React, { useEffect } from 'react';
import TreeViewItem from '../TreeViewItem';
import './styles.scoped.sass';

const mappingChildren = (data, next) => {
    return Object.keys(data).map((key, index) => {
        return next(data[key], index)
    });
}

const foreachChildren = (data, next) => {
    Object.keys(data).forEach((key, index) => {
        next(data[key], index)
    });
}

const listChildren = (data) => {
    return Object.keys(data).map((key) => {
        return data[key]
    })
}

const hasChildren = (item) => {
    return Object.keys(item.children).length > 0
}

const checkRecursive = (item, dataReference, checked) => {

    const childrens = item.children

    item.checked = checked;

    if (dataReference){
        dataReference.reference.setChecked(checked)
    }

    foreachChildren(childrens, (children, index) => {
        if (dataReference && dataReference.childrens[index]){
            dataReference.childrens[index].reference.setChecked(checked)
        }

        children.checked = checked

        if (hasChildren(children)){

            let currentDataReference = null;

            if (dataReference && dataReference.childrens[index]){
                currentDataReference = dataReference.childrens[index].childrenDataReference
            }

            checkRecursive(children, currentDataReference, checked)
        }
    })
}

const allSubChildrenChecked = (childrens) => {
    const list = listChildren(childrens)

    if (list.length === 0){
        return false
    }

    return list.every((data) => {
        return data.checked;
    })
}

const isPartial = (childrens) => {
    const list = listChildren(childrens);

    const amountChecked = list.filter((data) => {
        return data.checked;
    }).length

    return amountChecked !== 0 && amountChecked !== list.length
}

const checkPartialCheckedRoot = (item, dataReference) => {

    const partial = isPartial(item.children)
    const hasChangePartial = partial !== item.partial

    if (dataReference){
        dataReference.reference.setPartial(partial)
    }
    item.partial = partial

    const allChecked = allSubChildrenChecked(item.children)
    let checkedChanged = false

    if (hasChildren(item)){

        checkedChanged = item.checked !== allChecked
        item.checked = allChecked

        if (dataReference){
            dataReference.reference.setChecked(allChecked)
        }
    }

    let anotherToTrue = false

    foreachChildren(item.children, (data, index) => {
        const reference = dataReference && dataReference.childrens[index]
            ? dataReference.childrens[index].childrenDataReference
            : null

        if (checkPartialCheckedRoot(data, reference)){
            anotherToTrue = true
        }
    })

    return hasChangePartial || checkedChanged || anotherToTrue;
}

const TreeViewItemChildrens = (props) => {

    const dataReference = {
        childrens: [],
        setChildren: (index, reference) => {
            dataReference.childrens[index].reference = reference
        },
        setChildrenDataReference: (index, childrenDataReference) => {
            dataReference.childrens[index] = {
                reference: null,
                childrenDataReference
            }
        },
        reference: null,
        setReference: (reference) => {
            dataReference.reference = reference
        },
    }

    if (props.onChildrenDataReference){
        props.onChildrenDataReference(dataReference)
    }

    let root = null

    if (!props.root){
        root = {
            props,
            dataReference
        }
    } else {
        root = props.root
    }

    const getChildrens = () => {
        dataReference.childrens = [];

        if (hasChildren(props.item)) {
            return mappingChildren(props.item.children, (data, index) => {
                return (
                    <TreeViewItemChildrens
                        key={data.id}
                        item={data}
                        level={props.level + 1}
                        getOwner={dataReference.getOwner}
                        root={root}
                        onReference={(reference) => {
                            dataReference.setChildren(index, reference)
                        }}
                        onChildrenDataReference={(childrenDataReference) => {
                            dataReference.setChildrenDataReference(index, childrenDataReference)
                        }}
                    />
                )
            })
        }

        return []
    }

    const checked = props.item.checked || allSubChildrenChecked(props.item.children)

    props.item.partial = isPartial(props.item.children)

    return (
        <TreeViewItem
            id={props.item.id}
            name={props.item.name}
            level={props.level + 1}
            handleCheckbox={(data) => {
                checkRecursive(props.item, dataReference, data.checked)

                while (true){
                    const canBreak = !checkPartialCheckedRoot(root.props.item, root.dataReference);

                    if (canBreak){
                        checkPartialCheckedRoot(root.props.item, root.dataReference)
                        break;
                    }
                }
            }}
            checked={checked}
            getChildrens={getChildrens}
            root={root}
            partial={props.item.partial}
            reference={(reference) => {
                dataReference.setReference(reference)

                if (props.onReference){
                    props.onReference(reference)
                }
            }}
        />
    )
}

const TreeViewList = (props) => {

    useEffect(() => {
        if (props.refer){
            props.refer({
                getData: () => props.data
            })
        }
    })

    return (
        <div className="container">
            <div className="items">
                {
                    mappingChildren(props.data, (item) => {
                        return (
                            <TreeViewItemChildrens
                                key={item.id}
                                item={item}
                                level={0}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TreeViewList;