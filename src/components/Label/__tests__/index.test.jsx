import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from '../index';

describe('Label Component', () => {
    test('renders label component', () => {
        render(<Label text={'test'} />);
        expect(screen.getByTestId('label')).toBeInTheDocument();
        expect(screen.getByTestId('label').textContent).toBe('test');
    });

    test('renders label bold', () => {
        render(<Label bold/>);
        expect(screen.getByTestId('label')).toHaveClass('bold');
    });
})
