import { environment } from 'src/environments/environment';
import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer } from '@ngrx/store';
import {CryptoLibrary} from "../helpers/crypto.library";

export function Auth(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync(
    {
      keys: [{
        user: {
          encrypt: (state) => CryptoLibrary.encrypt(state),
          decrypt: (state) => CryptoLibrary.decrypt(state),
        },
      }],
      rehydrate: true,
      storageKeySerializer: (key) => `${environment.keyStorage}_${key}`
    }
  )(reducer);
}
