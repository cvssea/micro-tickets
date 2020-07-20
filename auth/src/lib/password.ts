import { scrypt as scryptSync, randomBytes } from 'crypto';
import { promisify } from 'util';
// import { log } from '@cvmicro/common';

const scrypt = promisify(scryptSync);

// TODO - maybe use bcrypt
export class Password {
  static async hash(password: string, prevSalt?: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scrypt(password, prevSalt || salt, 64)) as Buffer;
    const stingifiedBuffer = buffer.toString('hex');

    if (prevSalt) return stingifiedBuffer;
    return `${stingifiedBuffer}.${salt}`;
  }

  static async compare(
    savedPassword: string,
    password: string
  ): Promise<boolean> {
    const [hash, salt] = savedPassword.split('.');
    const compareTo = await Password.hash(password, salt);

    return compareTo === hash;
  }
}
