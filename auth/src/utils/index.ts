export * from './validators';

export const log = (...args: any[]): void =>
  console.log(`AuthService:`, ...args);
