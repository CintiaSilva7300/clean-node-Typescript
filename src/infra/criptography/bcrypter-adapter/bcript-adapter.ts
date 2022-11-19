import { HashComparer } from "../../../data/protocols/criptografy/hash-comparer";
import bcrypt from "bcrypt";
import { Hasher } from "src/data/protocols/criptografy/hasher";

export class BcriptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt);
    return hash;
  }
  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}
