export function isEqualDifferencePartToExpectChar(str1: string, str2: string, expectChar: string) {
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      return str1[i] == expectChar ? i : -1;
    }
  }
  return -1;
}
