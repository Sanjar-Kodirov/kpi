export const checkIsExistInAddedProducts = (products, code) => {
  let res = false;

  products.forEach((addedProduct) => {
    const aggregationCodes = addedProduct.aggregationCodes
      ? addedProduct.aggregationCodes
      : addedProduct.marks.IdentTransUpak;
    const aggregationBlockCodes = addedProduct.aggregationBlockCodes
      ? addedProduct.aggregationBlockCodes
      : addedProduct.marks.NomUpak;
    const markCodes = addedProduct.markCodes ? addedProduct.markCodes : addedProduct.marks.KIZ;

    [...aggregationCodes, ...aggregationBlockCodes, ...markCodes].forEach((addedProductCodeItem) => {
      if (addedProductCodeItem === code) {
        res = addedProduct.productName; // todo need to break iteration
      }
    });
  });

  return res;
};
export const getExistCode = (codes, code) => {
  return codes.find((item) => item === code);
};

export const allocateVat = (count, vat = 0) => {
  const vatFormula = vat / 100 + 1;
  const res = count - count / vatFormula;

  return Number(res.toFixed(2));
};
