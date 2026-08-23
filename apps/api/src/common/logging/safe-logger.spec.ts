import { ConsoleLogger } from '@nestjs/common';
import { SafeLogger } from './safe-logger.js';

describe('SafeLogger', () => {
  it('delega uma única vez com dados sensíveis redigidos', () => {
    const delegate = jest
      .spyOn(ConsoleLogger.prototype, 'log')
      .mockImplementation(() => undefined);

    new SafeLogger().log({ pin: '1234', quantity: 2 });

    expect(delegate).toHaveBeenCalledTimes(1);
    expect(delegate).toHaveBeenCalledWith({
      pin: '[REDACTED]',
      quantity: 2,
    });

    delegate.mockRestore();
  });
});
