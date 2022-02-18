import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { injected, walletconnect, resetWalletConnector, walletLink } from '../components/wallet/connectors'
// import connectors from "./connectors";
import { useWeb3React } from '@web3-react/core';

export const ConnectorContext = React.createContext(null)

export const ConnectorProvider = ({ children }) => {
    const { activate, account, library, connector, active, deactivate } = useWeb3React()

    const [isActive, setIsActive] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Init Loading
    useEffect(() => {
        connect().then(val => {
            setIsLoading(false)
        })
    }, [])

    const handleIsActive = useCallback(() => {
        setIsActive(active)
    }, [active])

    useEffect(() => {
        handleIsActive()
    }, [handleIsActive])

    // Connect to Connector wallet
    const connect = async () => {
        console.log('Connecting to Connector Wallet')
        try {
            await activate(injected)
        } catch (error) {
            console.log('Error on connecting: ', error)
        }
    }

    // Disconnect from Metamask wallet
    const disconnect = async () => {
        console.log('Deactivating...')
        try {
            await deactivate()
        } catch (error) {
            console.log('Error on disconnecting: ', error)
        }
    }

    const values = useMemo(
        () => ({
            isActive,
            account,
            isLoading,
            connect,
            disconnect
        }),
        [isActive, isLoading]
    )

    return <ConnectorContext.Provider value={values}>{children}</ConnectorContext.Provider>
}

export default function useConnector() {
    const context = React.useContext(ConnectorContext)

    if (context === undefined) {
        throw new Error('useConnector hook must be used with a ConnectorProvider component')
    }

    return context
}