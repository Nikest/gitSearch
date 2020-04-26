import * as React from 'react';

import { cd } from 'Services';
import { Alert, UserViewStoreWrapper, RepositoriesViewListStoreWrap } from 'Components';

interface IMainProps {

}

interface IMainState {

}

@cd(() => require('./Main.scss'))
export class Main extends React.Component<IMainProps, IMainState> {
    render(c?) {
        return (
            <main className={c('container')}>
                <Alert/>
                <div className={c('flex')}>
                    <section className={c('left')}>
                        <UserViewStoreWrapper/>
                    </section>
                    <section className={c('right')}>
                        <RepositoriesViewListStoreWrap/>
                    </section>
                </div>
            </main>
        )
    }
}
