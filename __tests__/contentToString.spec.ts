import rational from '../src/index';

describe('Test contentToString', () => {
  it('parse value to unity type and quantity is zero', () => {
    const fraction = rational().contentToString(0, 3, {
      language: 'pt-BR',
      unity: 'un',
    });
    expect(fraction).toBe('0');
  });

  it('parse value to unity type and content is zero', () => {
    const fraction = rational().contentToString(23.78, 0, {
      language: 'en',
      unity: 'm',
    });
    expect(fraction).toBe('0mm');
  });

  it('parse value to unity type and quantity and content is equal', () => {
    const fraction = rational().contentToString(1, 1, {
      language: 'pt-BR',
      unity: 'un',
    });
    expect(fraction).toBe('1');
  });

  it('parse value to unity grams and quantity and content is equal', () => {
    const fraction = rational().contentToString(1, 1, {
      language: 'pt-BR',
      unity: 'g',
    });
    expect(fraction).toBe('1g');
  });

  it('parse value to unity liter and quantity and content is equal', () => {
    const fraction = rational().contentToString(1, 1, {
      language: 'en',
      unity: 'L',
    });
    expect(fraction).toBe('1L');
  });

  it('parse value to unity when quantity in greater than content', () => {
    const fraction = rational().contentToString(2, 1, {
      language: 'en',
      unity: 'un',
    });
    expect(fraction).toBe('2');
  });

  it('parse value to unity when content in greater than quantity', () => {
    const fraction = rational().contentToString(1, 4, {
      language: 'en',
      unity: 'g',
    });
    expect(fraction).toBe('4g');
  });

  it('parse value to unity when quantity is decimal', () => {
    const fraction = rational().contentToString(0.1, 1, {
      language: 'pt-BR',
      unity: 'L',
    });
    expect(fraction).toBe('100mL');
  });

  it('parse value to unity when quantity is decimal and content more than one', () => {
    const fraction = rational().contentToString(0.57, 5, {
      language: 'pt-BR',
      unity: 'g',
    });
    expect(fraction).toBe('0,85g');
  });

  it('parse value to unity when quantity and content is decimal', () => {
    const fraction = rational().contentToString(0.57, 3.49, {
      language: 'pt-BR',
      unity: 'g',
    });
    expect(fraction).toBe('1,989g');
  });

  it('parse value to unity when quantity is miliar place', () => {
    const fraction = rational().contentToString(1000, 1, {
      language: 'en',
      unity: 'g',
    });
    expect(fraction).toBe('1kg');
  });

  it('parse value to unity when quantity is miliar place and unity', () => {
    const fraction = rational().contentToString(1000, 1, {
      language: 'pt-BR',
      unity: 'un',
    });
    expect(fraction).toBe('1.000');
  });

  it('parse value to unity when quantity is negative and content positive', () => {
    const fraction = rational().contentToString(-1, 2, {
      language: 'en',
      unity: 'L',
    });
    expect(fraction).toBe('-2L');
  });

  it('parse value to unity when quantity is decimal negative and content positive', () => {
    const fraction = rational().contentToString(-3.46, 2, {
      language: 'en',
      unity: 'L',
    });
    expect(fraction).toBe('-0.92L');
  });

  it('parse value to unity when quantity and content is negative', () => {
    const fraction = rational().contentToString(-3.67, -8, {
      language: 'pt-BR',
      unity: 'm',
    });
    expect(fraction).toBe('0,36m');
  });

  it('parse value to unity when quantity has two decimal places', () => {
    const fraction = rational().contentToString(0.06, 10, {
      language: 'en',
      unity: 'm',
    });
    expect(fraction).toBe('60cm');
  });
});
