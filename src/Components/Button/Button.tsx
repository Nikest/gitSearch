import * as React from 'react';

import { sl } from 'Services';


interface IButtonProps {
    children: any;
    onClick: () => any;
}


export const Button = function({ children, onClick }:IButtonProps) {
    const c = sl(() => require('./Button.scss'));

    return (
        <button className={c('container')} onClick={onClick}>{ children }</button>
    )
};


