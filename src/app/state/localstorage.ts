import { environment } from 'src/environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer } from '@ngrx/store';
import {CryptoLibrary} from "../helpers/crypto.library";

const crypto = new CryptoLibrary();
export function Auth(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync(
    {
      keys: [{
        user: {
          encrypt: (state) => crypto.encrypt(state),
          decrypt: (state) => crypto.decrypt(state),
        },
      }],
      rehydrate: true,
      storageKeySerializer: (key) => `${environment.keyStorage}_${key}`
    }
  )(reducer);
}
