import { ElectronServices } from "../types";
import IFetch from "./Fetch.model";

export type InfoElectronType<Params> = {
    [P in keyof Params]: Params[P]
}
    &
    (
        {
            replaceCache: boolean;
            removeCache: boolean;
            setOnce: boolean;
            isSet: "YES";
        }
        | {
            isSet: "NO";
        }
    )

export type ElectronTypes = {
    ipcRenderer: {
        send: <T> (val: ElectronServices, args: InfoElectronType<T>) => void;
        once: <T>(val: ElectronServices, callback: (event: any, data: IFetch<T>) => void) => void;
    }
}

export type ElectronKey = "electron"
export type _Window = (typeof Window) & {
    require: (key: ElectronKey) => ElectronTypes;
}