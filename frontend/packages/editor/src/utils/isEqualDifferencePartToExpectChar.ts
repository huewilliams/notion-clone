export function isEqualDifferencePartToExpectChar(str1: string, str2: string, expectChar: string) {
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      if (expectChar == " ") {
        const isBothSpace = /\s/g.test(str1[i]) && /\s/g.test(str2[i]);
        if (isBothSpace) continue;
        return /\s/g.test(str1[i]) ? i : -1;
      }

      return str1[i] == expectChar ? i : -1;
    }
  }
  return -1;
}
