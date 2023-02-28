import React from 'react';
import {create} from 'react-test-renderer';
import {Paginator} from './Paginator';

describe('Paginator component tests', () => {
    test('Pages count is 11 but only 10 must be showed', () => {
        const mockCallback = jest.fn();
        const component = create(<Paginator totalUsersCount={110} pageSize={10} currentPage={1} portionSize={10} onPageChanged={mockCallback}/>);
        const root = component.root;
        let spans = root.findAllByType('span')
        expect(spans.length).toBe(10)
    });

    test('If pages count more than 10, the "Next" button should be showed',() => {
        const mockCallback = jest.fn();
        const component = create(<Paginator totalUsersCount={110} pageSize={10} currentPage={1} portionSize={10} onPageChanged={mockCallback}/>);
        const root = component.root;
        let buttons = root.findAllByType('button')
        expect(buttons.length).toBe(1)
    })
})