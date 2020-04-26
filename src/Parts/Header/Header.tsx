import * as React from 'react';

import { cd, eventEmitter, DataRequester } from 'Services';
import { Button } from 'Components';
import { Form, InputArea, Label } from 'ModularForm';

interface IHeaderProps {

}

@cd(() => require('./Header.scss'))
export class Header extends React.Component<IHeaderProps> {
    render(c?) {
        return (
            <header className={c('container')}>
                <p className={c('title')}>GitSearch</p>

                <Form className={c('form')} onValuesUpdate={this.onFormValues}>
                    <InputArea name={'userName'} placeholder={'Search by username'} required={true}/>
                    <Button onClick={this.sendData}>Search</Button>
                </Form>
            </header>
        )
    }

    formValues: {
        userName: '';
    };
    onFormValues = (formValue) => {
        this.formValues = formValue;
    };

    sendData = () => {
        if (!this.formValues.userName) {
            eventEmitter.emit('ALERT_INFO',
                {type: 'info', msg: 'Need to enter username', timeout: 3000}
            );
            return
        }

        DataRequester.getUser(this.formValues.userName)
    }
}
