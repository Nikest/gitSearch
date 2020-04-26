import * as React from 'react';

import { sl } from 'Services';

export interface IFollowerView {
    type: string;
    login: string;
    avatar_url: string;
    onOpen: (userName: string) => void;
}

interface IFollowerViewProps extends IFollowerView {
}


export const FollowerView = function({avatar_url, login, type, onOpen}:IFollowerViewProps) {
    const c = sl(() => require('./FollowerView.scss'));
    const avatar = { backgroundImage: `url(${avatar_url})` };

    return (
        <aside className={c('container')} onClick={() => onOpen(login)}>
            <div style={avatar} className={c('avatar')}/>

            <div className={c('login')}>{login}</div>
            <div className={c('type')}>{type}</div>
        </aside>
    )
};


