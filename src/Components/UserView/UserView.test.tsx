import * as React from 'react';
import { mount, configure } from 'enzyme';

const Adapter = require("enzyme-adapter-react-16");
configure({ adapter: new Adapter() });

import { UserViewStoreWrapper } from './UserView';

const userData = {
    "login": "Nikest",
    "id": 11363247,
    "node_id": "MDQ6VXNlcjExMzYzMjQ3",
    "avatar_url": "https://avatars2.githubusercontent.com/u/11363247?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/Nikest",
    "html_url": "https://github.com/Nikest",
    "followers_url": "https://api.github.com/users/Nikest/followers",
    "following_url": "https://api.github.com/users/Nikest/following{/other_user}",
    "gists_url": "https://api.github.com/users/Nikest/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/Nikest/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/Nikest/subscriptions",
    "organizations_url": "https://api.github.com/users/Nikest/orgs",
    "repos_url": "https://api.github.com/users/Nikest/repos",
    "events_url": "https://api.github.com/users/Nikest/events{/privacy}",
    "received_events_url": "https://api.github.com/users/Nikest/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Stanísław Nikołajéwśkyj",
    "company": null,
    "blog": "",
    "location": null,
    "email": null,
    "hireable": null,
    "bio": null,
    "public_repos": 21,
    "public_gists": 0,
    "followers": 3,
    "following": 0,
    "created_at": "2015-03-07T11:27:39Z",
    "updated_at": "2020-03-20T09:46:47Z"
};


describe('Testing of rendering user data', () => {
    it('Component must be empty', () => {
        const wrapper = mount(<UserViewStoreWrapper/>);
        expect(wrapper.html()).toBe('<span></span>');
    });

    it('Component must include correct data', () => {
        const wrapper = mount(<UserViewStoreWrapper/>);
        wrapper.setState({ user: userData });
        expect(wrapper.find('.name').text()).toEqual(userData.name);
    })
});