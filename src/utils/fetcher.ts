import { Web3Provider } from "@ethersproject/providers";
import { isAddress } from "web3-utils";
import { Contract } from "web3-eth-contract";

export const fetcher =
  (library: Web3Provider | undefined, abi?: any) =>
  (...args: any[]) => {
    const [arg1, arg2, ...params] = args;

    // it's a contract
    if (isAddress(arg1)) {
      const address = arg1;
      const method: string = arg2;
      const contract: Contract = new Contract(address, abi);
      return contract.methods[method](...params);
    }

    // it's a eth call
    const method = arg1;
    return library?.send(method, [arg2, ...params]);
  };
