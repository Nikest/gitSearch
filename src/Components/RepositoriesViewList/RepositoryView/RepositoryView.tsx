import * as React from 'react';

import { sl, hundredSeparator } from 'Services';
import { IRepository } from 'Components';

interface IRepositoryViewProps extends IRepository {

}

export const RepositoryView = function({
   name,
   fork,
   stargazers_count,
   clone_url,
   ssh_url,
   forks,
   description,
   open_issues,
}:IRepositoryViewProps) {
    const c = sl(() => require('./RepositoryView.scss'));

    return (
        <article className={c('container')}>
            <div className={c('panel')}>
                <p className={c(`fork ${fork}`)}>Is {fork ? '' : 'not'} fork</p>
                { getFork(forks) }
                { getStargazers(stargazers_count) }
                { getIssues(open_issues) }
            </div>

            <table>
                <tbody>
                    <tr>
                        <td>Clone URL</td>
                        <td>{clone_url}</td>
                    </tr>

                    <tr>
                        <td>SSH URL</td>
                        <td>{ssh_url}</td>
                    </tr>
                </tbody>
            </table>

            { description && <div className={c('text')}>{description}</div>}
        </article>
    )
};

function getFork(forks: number) {
    return (
        <span data-style={'flexbox'}>
            <svg height="16" aria-label="fork" viewBox="0 0 10 16" version="1.1" width="10" aria-hidden="true">
                <path fillRule={'evenodd'} d={
                    `M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 
                    3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 
                    4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 
                    0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 
                    0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z`
                }/>
            </svg>

            <span>{hundredSeparator(forks)}</span>
        </span>
    )
}

function getStargazers(stars: number) {
    return (
        <span data-style={'flexbox'}>
            <svg height="16" viewBox="0 0 14 16" version="1.1" width="14" aria-hidden="true">
                <path fillRule={'evenodd'} d={'M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z'}/>
            </svg>

            <span>{hundredSeparator(stars)}</span>
        </span>
    )
}

function getIssues(issues: number) {
    return (
        <span data-style={'flexbox'}>
            <svg viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true">
                <path fillRule={'evenodd'} d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 011.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"/>
            </svg>

            <span>Issues: {hundredSeparator(issues)}</span>
        </span>
    )
}