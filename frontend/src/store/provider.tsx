"use client"
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';

import { PersistGate } from 'redux-persist/integration/react';
import GlobalLoader from '@/components/global/loaders/GlobalLoader';

function ReduxProvider({ children }: {
    children: React.ReactNode
}) {

    useEffect(() => {
        persistor.persist();
    }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={<GlobalLoader />} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}

export default ReduxProvider;
