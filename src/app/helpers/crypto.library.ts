import * as crypto from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
//import * as bcrypt from 'bcryptjs';


@Injectable()
export class CryptoLibrary {

  static saltKey = environment.keyCrypto;


  static encrypt(text: string): string {
    const encrypted = crypto.AES.encrypt(text, this.saltKey).toString();
    return encrypted;
  }

  static decrypt(encrypted: string): string {
    const decrypted = crypto.AES.decrypt(encrypted, this.saltKey).toString(crypto.enc.Utf8);
    return decrypted;
  }

  static encryptObject(objectToEncrypt: object, encryptKey = false): { [key: string]: any } {
    const objectToReturn: any = {};
    Object.entries(objectToEncrypt).forEach(([key, value]) => {
      const newValue = this.encrypt(value);
      objectToReturn[encryptKey ? this.encrypt(key) : key] = newValue;
    });
    return objectToReturn;
  }

  static decryptObject(objectToDecrypt: object, decryptKey = false): object {
    const objectToReturn: any = {};
    Object.entries(objectToDecrypt).forEach(([key, value]) => {
      const newValue = this.decrypt(value);
      const newKey = this.decrypt(key);
      objectToReturn[decryptKey ? this.decrypt(key) : key] = newValue;
    });
    return objectToReturn;
  }

  static encryptHash(elementToHash: string): string {
    return elementToHash//bcrypt.hashSync(elementToHash, 10);
  }

  static compareHash(elementToHash: string, currentHash: string): boolean {
    return true //bcrypt.compareSync(elementToHash, currentHash);
  }

}
