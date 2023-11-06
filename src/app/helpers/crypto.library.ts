import * as crypto from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
//import * as bcrypt from 'bcryptjs';


@Injectable()
export class CryptoLibrary {

  private saltKey;
  constructor() {

    this.saltKey = environment.keyCrypto;
  }


  public encrypt(text: string): string {
    const encrypted = crypto.AES.encrypt(text, this.saltKey).toString();
    return encrypted;
  }

  public decrypt(encrypted: string): string {
    const decrypted = crypto.AES.decrypt(encrypted, this.saltKey).toString(crypto.enc.Utf8);
    return decrypted;
  }

  public encryptObject(objectToEncrypt: object, encryptKey = false): { [key: string]: any } {
    const objectToReturn: any = {};
    Object.entries(objectToEncrypt).forEach(([key, value]) => {
      const newValue = this.encrypt(value);
      objectToReturn[encryptKey ? this.encrypt(key) : key] = newValue;
    });
    return objectToReturn;
  }

  public decryptObject(objectToDecrypt: object, decryptKey = false): object {
    const objectToReturn: any = {};
    Object.entries(objectToDecrypt).forEach(([key, value]) => {
      const newValue = this.decrypt(value);
      const newKey = this.decrypt(key);
      objectToReturn[decryptKey ? this.decrypt(key) : key] = newValue;
    });
    return objectToReturn;
  }

  public encryptHash(elementToHash: string): string {
    return elementToHash//bcrypt.hashSync(elementToHash, 10);
  }

  public compareHash(elementToHash: string, currentHash: string): boolean {
    return true //bcrypt.compareSync(elementToHash, currentHash);
  }

}
