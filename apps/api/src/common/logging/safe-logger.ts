import { ConsoleLogger, Injectable, type LoggerService } from '@nestjs/common';
import { redactSensitive } from './redact-sensitive.js';

@Injectable()
export class SafeLogger implements LoggerService {
  private readonly delegate = new ConsoleLogger('KwanzaGo');

  log(message: unknown, ...optionalParams: unknown[]): void {
    this.delegate.log(...this.sanitize(message, optionalParams));
  }

  error(message: unknown, ...optionalParams: unknown[]): void {
    this.delegate.error(...this.sanitize(message, optionalParams));
  }

  warn(message: unknown, ...optionalParams: unknown[]): void {
    this.delegate.warn(...this.sanitize(message, optionalParams));
  }

  debug(message: unknown, ...optionalParams: unknown[]): void {
    this.delegate.debug(...this.sanitize(message, optionalParams));
  }

  verbose(message: unknown, ...optionalParams: unknown[]): void {
    this.delegate.verbose(...this.sanitize(message, optionalParams));
  }

  fatal(message: unknown, ...optionalParams: unknown[]): void {
    this.delegate.fatal(...this.sanitize(message, optionalParams));
  }

  private sanitize(
    message: unknown,
    optionalParams: unknown[],
  ): [unknown, ...unknown[]] {
    return [
      redactSensitive(message),
      ...optionalParams.map((item) => redactSensitive(item)),
    ];
  }
}
