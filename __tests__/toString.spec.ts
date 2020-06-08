import rational from '../src/index';

describe('Test toString without denominator', () => {
  it('parse value to fraction with when not pass value', () => {
    const fraction = rational().toHumman();
    expect(fraction).toBe('0');
  });

  it('parse value to fraction when is integer', () => {
    const fraction = rational(0).toString();
    expect(fraction).toBe('0');
  });

  it('parse value to fraction when is integer', () => {
    const fraction = rational(1).toString();
    expect(fraction).toBe('1');
  });

  it('parse decimal to fraction', () => {
    const fraction = rational(0.1).toString();
    expect(fraction).toBe('1/10');
  });

  it('parse value to fraction when is decimal', () => {
    const fraction = rational(0.27).toString();
    expect(fraction).toBe('27/100');
  });
});

describe('Test toString with denominator', () => {
  it('parse value to fraction with denominator', () => {
    const fraction = rational(0, 0).toString();
    expect(fraction).toBe('0');
  });

  it('parse value to fraction with denominator', () => {
    const fraction = rational(10, 20).toString();
    expect(fraction).toBe('1/2');
  });

  it('parse value to fraction with denominator greater than 10', () => {
    const fraction = rational(240, 189).toString();
    expect(fraction).toBe('80/63');
  });

  it('parse value to fraction with numerator and denominator is equal', () => {
    const fraction = rational(734, 734).toString();
    expect(fraction).toBe('1');
  });

  it('parse value to fraction with numerator is negative', () => {
    const fraction = rational(-2, 4).toString();
    expect(fraction).toBe('1/-2');
  });

  it('parse value to fraction with denominator is negative', () => {
    const fraction = rational(4, -2).toString();
    expect(fraction).toBe('-2/1');
  });

  it('parse value to fraction with numerator and denominator is negative', () => {
    const fraction = rational(-6, -4).toString();
    expect(fraction).toBe('3/2');
  });
});
