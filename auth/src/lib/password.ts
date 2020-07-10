import { scrypt as scryptSync, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scryptSync);

// TODO - maybe use bcrypt
export class Password {
  static async hash(password: string, prevSalt?: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scrypt(password, prevSalt || salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(hash: string, password: string): Promise<boolean> {
    const salt = hash.split('.')[1];
    const compareTo = await Password.hash(password, salt);
    return compareTo === hash;
  }
}
