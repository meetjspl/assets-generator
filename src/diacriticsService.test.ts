import { diacriticsToASCII } from './diacriticsService';

describe('diacriticsToASCII', () => {
  it('should replace latin ext characters', () => {
    expect(diacriticsToASCII('zażółć gęślą jaźń')).toEqual('zazolc gesla jazn');
    expect(diacriticsToASCII('ZAŻÓŁĆ GĘŚLĄ JAŹŃ')).toEqual('ZAZOLC GESLA JAZN');
  });
});
