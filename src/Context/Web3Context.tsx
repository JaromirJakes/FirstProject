/* eslint-disable no-console */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { initializeWeb3 } from 'src/Contracts';
import { kingStarterInitialize } from 'src/Contracts/kingStarter';
import { kingSaleInitialize } from 'src/Contracts/kingSale';
import { isEmpty } from 'src/Utils/validator';

interface Web3ContextProps {
  isConnected: boolean;
  isInitialized: boolean;
}

interface propsType {
  children: React.ReactNode;
}

const Web3Context = createContext<Web3ContextProps | null>(null);

export const Web3Provider = (props: propsType) => {
  const { isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  console.log({ provider, signer });

  const [isInitialized, setInitialized] = useState(false);
  console.log({ isInitialized });
  useEffect(() => {
    if (isConnected) {
      (async () => {
        // eslint-disable-next-line no-console
        // console.log(signer);
        if (!isEmpty(provider) && !isEmpty(signer)) {
          Promise.allSettled([
            initializeWeb3(provider, signer),
            kingSaleInitialize(provider, signer),
            kingStarterInitialize(provider, signer)
          ])
            .then((results) => {
              const errors = results.filter((result) => result.status === 'rejected');
              if (errors.length > 0) {
                console.log('Initialize Error: ', errors);
              } else {
                console.log('Initialized');
                setInitialized(true);
              }
            })
            .catch((err) => {
              console.log('Promise.allSettled Error: ', err);
            });
        }
      })();
    } else {
      setInitialized(false);
    }
  }, [isConnected, signer]);

  return <Web3Context.Provider value={{ isConnected, isInitialized }}>{props.children}</Web3Context.Provider>;
};

export const useWeb3Store = () => {
  const context = useContext(Web3Context);
  if (context === null) {
    throw new Error("can't find context");
  }
  return context;
};
