import rational from '../src/index';

describe('Test toHumman without denominator', () => {
  it('parse value to decimal with when not pass value', () => {
    const fraction = rational().toHumman();
    expect(fraction).toBe('0');
  });

  it('parse value to decimal when is zero', () => {
    const fraction = rational(0).toHumman();
    expect(fraction).toBe('0');
  });

  it('parse value to decimal when is integer', () => {
    const fraction = rational(1).toHumman();
    expect(fraction).toBe('1');
  });

  it('parse decimal to decimal', () => {
    const fraction = rational(1.2).toHumman();
    expect(fraction).toBe('0.2');
  });

  it('parse value to decimal when is decimal', () => {
    const fraction = rational(6.27).toHumman();
    expect(fraction).toBe('0.27');
  });
});

describe('Test toHumman with denominator', () => {
  it('parse value to decimal when numerator is negative', () => {
    const fraction = rational(0, 0).toHumman();
    expect(fraction).toBe('0');
  });

  it('parse value to decimal with denominator', () => {
    const fraction = rational(10, 20).toHumman();
    expect(fraction).toBe('0.5');
  });

  it('parse value to decimal with denominator greater than 10', () => {
    const fraction = rational(240, 189).toHumman();
    expect(fraction).toBe('1.27');
  });

  it('parse value to decimal with numerator and denominator is equal', () => {
    const fraction = rational(734, 734).toHumman();
    expect(fraction).toBe('0');
  });

  it('parse value to decimal when numerator and denominator is diferent decimals', () => {
    const fraction = rational(7.23, 8.09).toHumman();
    expect(fraction).toBe('0.894');
  });

  it('parse value to decimal when numerator and denominator is diferent decimals and is negative', () => {
    const fraction = rational(-7.23, -8.09).toHumman();
    expect(fraction).toBe('0.894');
  });

  it('parse value to decimal when denominator is negative', () => {
    const fraction = rational(76.23, -4.456).toHumman();
    expect(fraction).toBe('-17.107');
  });

  it('parse value to decimal when numerator is negative', () => {
    const fraction = rational(-26.41, 10.56).toHumman();
    expect(fraction).toBe('-2.501');
  });

  it('parse value to decimal when numerator is negative', () => {
    const fraction = rational(-5000, -10000).toHumman();
    expect(fraction).toBe('0.5');
  });

  it('parse value to decimal with max numerator', () => {
    const fraction = rational(0.571925).toHumman();
    expect(fraction).toBe('0.572');
  });
});
