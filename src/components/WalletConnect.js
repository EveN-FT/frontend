import React from 'react';
import ReactModal from 'react-modal';

const WalletConnect = () => {
    const [openModal, setOpenModal] = React.useState(false);

    const handleClose = () => {
        setOpenModal(false);
        console.log('handle close')
    };

    const handleOpen = () => {
        setOpenModal(true); 
        console.log('handle open ')

    };

    return (
        <div>
            {/* {isLoading ? (
                <span>loading...</span>
            ) : typeof account === "string" ? (
                <p>
                    {account.substring(0, 6) +
                        "..." +
                        account.substring(account.length - 4, account.length)}
                </p>
            ) : ( */}
            <button onClick={handleOpen} variant="contained">
                {console.log('selected connect')}
                Connect
            </button>
            <ReactModal
                onClose={handleClose}
                open={openModal}
                // style={{
                //     position: 'absolute',
                //     border: '2px solid #000',
                //     backgroundColor: 'gray',
                //     boxShadow: '2px solid black',
                //     height: 80,
                //     width: 240,
                //     margin: 'auto'
                // }}
            >
                test
            </ReactModal>
            {/* )} */}
        </div>
    );
};

export default WalletConnect;
