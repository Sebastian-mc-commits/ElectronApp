import { ElectronServices } from "../types";


export type ElectronTypes = {
    ipcRenderer: {
        send: (val: ElectronServices, ...args: any) => void;
        once: <T>(val: ElectronServices, callback: (event: any, data: T) => void) => void;
    }
}

export type ElectronKey = "electron"
export type _Window = (typeof Window) & {
    require: (key: ElectronKey) => ElectronTypes;
}