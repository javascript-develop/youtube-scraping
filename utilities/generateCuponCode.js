function generateDiscountCode(amount, code = '') {
  let generatedCode = '';
  if (code) {
    generatedCode = code;
  } else {
    generatedCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  const discount = {
    code: generatedCode,
    amount,
    valid: true
  };
  return discount;
}

module.exports = generateDiscountCode;
