import { storeInterface, storeInjector } from './Store';

describe('Testing "Store"', () => {
    it('Testing "Interface"', () => {
        expect(storeInterface().getData('test')).toBeNull();
    });

    it('Testing "Injector"', () => {
        class TestClass {
            data;
            componentDidMount() {};

            @storeInjector(['test'])
            onStoreUpdate({test}) { this.data = test }
        }

        const testClass = new TestClass();
        testClass.componentDidMount();

        const testClassMock = jest.spyOn(testClass, 'onStoreUpdate');

        expect(testClassMock).not.toBeCalled();

        storeInterface().setData('test', true);

        expect(storeInterface().getData('test')).toBe(true);

        expect(testClassMock).toBeCalled();

        expect(testClass.data).toBe(true);
    });
});
