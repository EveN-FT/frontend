// eslint-disable-next-line
import { useAccount, useConnect } from 'wagmi'

export const Example = () => {
    //   const [{ data, error }, connect] = useConnect()

    // const provider = useProvider();
    // eslint-disable-next-line
    const [{ data, error, loading }, connect] = useConnect();
    const connectMetaMask = () => { connect(data.connectors[0])};
    const connectWalletConnect = () => { connect(data.connectors[1])}

    return (
        //<div>
        <div>




            connect ya wallets yo
            <button onClick={connectMetaMask} >
                login with MetaMask
            </button>
            <button onClick={connectWalletConnect} >
                login with Trust
            </button>
            <button onClick={connectMetaMask} >
                login with Coinbase Wallet
            </button>





            {/* {data.connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect(connector)}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
        </button>
      ))}

      {error && <div>{error?.message ?? 'Failed to connect'}</div>} */}





        </div>
    )
}