const info = require('./methods/info.js');

function intToBitString(input, size, unsigned) {
  if (![8, 16, 32].includes(size)) {
    throw "Invalid parameter size";
  }

  const maxUnsigned = 2 ** size - 1;
  const maxSigned = 2 ** (size - 1) - 1;
  const minSigned = (-2) ** (size - 1);
  
  if (!Number.isInteger(input) || 
      (unsigned && input < 0 || input > maxUnsigned) ||
      (!unsigned && (input < minSigned || input > maxSigned))) {
    throw "Input out of range or not an integer";
  }

  let binary;
  if (unsigned) {
    binary = input.toString(2).padStart(size, '0');
  } else {
    binary = (input & maxUnsigned).toString(2).padStart(size, '0');
  }

  return binary;
}

function floatToBin(floatValue) {
  const buffer = new ArrayBuffer(4);
  const floatView = new Float32Array(buffer);
  floatView[0] = floatValue;

  const dataView = new DataView(buffer);
  const uintValue = dataView.getUint32(0, true);

  let binaryString = '';
  for (let i = 0; i < 32; i++) {
    binaryString += (uintValue >> (31 - i) & 1) ? '1' : '0';
  }

  return binaryString;
}
console.log('To bin\n')
console.log(intToBitString(90, 8, false));
console.log(intToBitString(-90, 8, false));
console.log(floatToBin(24.5));
console.log('System info\n')
info.getSysInfo()