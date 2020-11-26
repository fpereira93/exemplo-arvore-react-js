import React from 'react';
import { render } from '@testing-library/react';
import Checkbox from './components/Checkbox';
import TreeViewItem from './components/TreeViewItem';

test('Test Component:: Checkbox', () => {
    const id = '123'
    const label = "My Check Box"

    const { container } = render(<Checkbox  label={label} id={id} checked onHandle={() => {}} reference={() => {}} />);

    expect(container.querySelector('.container input[type="checkbox"]')).toBeVisible()

    expect(container.querySelector('.container input[type="checkbox"]')).toBeChecked()

    expect(container.querySelector('.container > label')).toHaveTextContent(label)
});

test('Test Component:: TreeViewItem', () => {
    const { container } = render(<TreeViewItem level={1} getChildrens={() => [<span>teste</span>]} reference={() => {}}  />);

    expect(container.querySelector('.container > .row')).toBeVisible()

    expect(container.querySelector('.container > input[type="checkbox"]')).toBeVisible()

    expect(container.querySelector('.container > input[type="checkbox"]')).not.toBeChecked()
});

// Dois exemplos de testes