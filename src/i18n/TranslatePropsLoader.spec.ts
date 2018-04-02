import { TranslatePropsLoader } from './TranslatePropsLoader';

describe('TranslatePropsLoader', () => {
  let translateLoader = null;

  beforeEach((() => {
    translateLoader = new TranslatePropsLoader(null, null, null);  
  }));

  it('should parse empty string string', (() => {
    const testableString = "";
    const json = translateLoader.parse(testableString);
    expect(json).toEqual({});
  }));

  it('should parse string "customer_served = Customer served \ncherry_pick = Cherry pick"', (() => {
    const testableString = "customer_served = Customer served \ncherry_pick = Cherry pick";
    const json = translateLoader.parse(testableString);
    expect(json).toEqual({customer_served: "Customer served", cherry_pick: "Cherry pick"});
  }));

  it('should parse string "\t\n\r   \n customer_served    =      Customer served\n\t\rcherry_pick   = Cherry pick    \n\t\r"', (() => {
    const testableString = "\t\n\r   \n customer_served    =      Customer served\n\t\rcherry_pick   = Cherry pick    \n\t\r";
    const json = translateLoader.parse(testableString);
    expect(json).toEqual({customer_served: "Customer served", cherry_pick: "Cherry pick"});
  }));
});
