import { eventEmitter } from './EventEmitter';

test('Testing of "EventEmitter"', () => {
    let res;

    eventEmitter.subscribe('onTest', (data) => res = data);
    eventEmitter.emit('onTest', 'test:true');

    expect(res).toBe('test:true')
});