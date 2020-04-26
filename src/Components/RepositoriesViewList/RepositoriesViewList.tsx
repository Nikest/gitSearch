import * as React from 'react';

import { sl, storeInjector, DataRequester, modalService } from 'Services';
import { RepositoryView } from 'Components';

export interface IRepository {
    name: string;
    url: string;
    fork: boolean;
    forks: number;
    stargazers_count: number;
    clone_url: string;
    ssh_url: string;
    description: string;
    open_issues: number;
}

interface IRepositoriesViewListProps {
    repositories: IRepository[];
    loadAction: (url: string, name: string) => any;
}

const RepositoriesViewList = function({repositories, loadAction}:IRepositoriesViewListProps) {
    const c = sl(() => require('./RepositoriesViewList.scss'));

    return repositories.length > 0 ? (
        <section className={c('container')}>
            <p className={c('title')}>Repositories:</p>
            {
                repositories.map((repository, i) => {
                    return <div key={i} className={c('repo')} onClick={loadAction(repository.url, repository.name)}>{repository.name}</div>
                })
            }
        </section>
    ) : <span/>
};

const RepositoriesViewListMemo = React.memo(RepositoriesViewList);

interface IRepositoriesViewListState {
    repositories?: IRepository[]
}

interface IAction {
    loadRepositoryInfo: (url: string, name: string) => void;
}

export class RepositoriesViewListStoreWrap extends React.Component<any, IRepositoriesViewListState>{
    state = { repositories: null };

    render() {
        const { repositories } = this.state;
        return repositories ? <RepositoriesViewListMemo repositories={repositories} loadAction={this.actions.loadRepositoryInfo}/> : <span/>
    }

    actions: IAction = {
        loadRepositoryInfo: (url, name: string) => () => DataRequester.gerRepository(url).then(repositoryInfo => {
            modalService.title(name).open(<RepositoryView {...repositoryInfo}/>)
        })
     };

    @storeInjector(['repositories'])
    onStoreUpdate({repositories}) {
        this.setState({repositories})
    }
}
