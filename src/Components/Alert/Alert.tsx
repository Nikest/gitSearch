import * as React from 'react';

import { sl, eventEmitter } from 'Services';


interface IAlertProps {

}

export const Alert = function({}:IAlertProps) {
    const c = sl(() => require('./Alert.scss'));

    const [alert, setData] = React.useState(['none', '', 0]);
    const [type, msg, timeout] = alert;

    timeout && setTimeout(() => setData(['none', '', 0]), timeout);

    React.useEffect(() => {
        eventEmitter.subscribe('DATA_PROCESS', (data) => setData([data.type, data.msg, data.timeout]))
    }, []);

    React.useEffect(() => {
        eventEmitter.subscribe('ALERT_INFO', (data) => setData([data.type, data.msg, data.timeout]))
    }, []);

    return (
        <aside className={c(`container ${type}`)}>{ msg }</aside>
    )
};


