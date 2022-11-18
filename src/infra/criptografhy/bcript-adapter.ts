import bcrypt from "bcrypt";
import { Encrypter } from "src/data/protocols/criptografy/encrypter";

export class BcriptAdapter implements Encrypter {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }
}
