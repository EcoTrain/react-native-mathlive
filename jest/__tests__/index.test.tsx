it.todo('write a test');

describe('my beverage', () => {
  const testDict = {
    delicious: true,
    sour: false,
  };

  test('is delicious', () => {
    expect(testDict.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(testDict.sour).toBeFalsy();
  });
});
