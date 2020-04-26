import * as React from 'react';

import { sl, storeInjector, DataRequester } from 'Services';
import { FollowerView, IFollowerView } from 'Components';

interface IUserViewProps {
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
    name: string;
    email: string;
    bio: string;
    location: string;
    followers: IFollowerView[];
    actions: IActions;
}

const UserView = function({
     login,
     avatar_url,
     email,
     html_url,
     name,
     type,
     bio,
     location,
     followers,
     actions
}:IUserViewProps) {
    const c = sl(() => require('./UserView.scss'));

    const avatar = { backgroundImage: `url(${avatar_url})` };

    return (
        <section className={c('container')}>
            <div className={c('line user-grid')}>
                <div style={avatar} className={c('avatar')}/>

                <div className={c('login')}>{login} (<a href={html_url} target={'_blank'} className={c('link')}>GitHub</a>)</div>
                <div className={c(`type ${type}`)}>{ type }</div>
                <div className={c('name')}>{name}</div>
            </div>

            {
                (email || bio || location) && (
                    <div className={c('text-line')}>
                        {bio && <><div className={c('text')}>{bio}</div><br/></>}
                        {email && <><a className={c('link')} href={`mailto:${email}`}>{email}</a><br/></>}
                        {location && <><div>location: {location}</div><br/></>}
                    </div>
                )
            }

            {
                followers && (
                    <div>
                        <div className={c('text-decor')}>Followers ({followers.length}):</div>
                        <div className={c('line followers-grid')}>
                            {
                                followers.map((follower, i) => <FollowerView key={i} {...follower} onOpen={actions.openFollower}/>)
                            }
                        </div>
                    </div>
                )
            }
        </section>
    )
};

const UserViewMemo = React.memo(UserView);

interface IUserViewState {
    user?: IUserViewProps;
    followers?: IFollowerView[]
}

interface IActions {
    openFollower: (userName: string) => void
}

export class UserViewStoreWrapper extends React.Component<any, IUserViewState>{
    state = { user: null, followers: null };

    render() {
        const { user, followers } = this.state;

        return user ? <UserViewMemo {...user} followers={followers} actions={this.actions}/> : <span/>
    }

    actions: IActions = {
        openFollower: (login) => DataRequester.getUser(login)
    };

    @storeInjector(['user', 'followers'])
    onStoreUpdate({user, followers}) {
        this.setState({user, followers});
    }
}