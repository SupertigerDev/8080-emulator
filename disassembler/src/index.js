import CPU from './CPU';

const fileInput = document.getElementById("file-input");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.scale(4,4)

const currentInstructionSpan = document.getElementById("current-instruction");
const currentPCSpan = document.getElementById("current-pc");



fileInput.addEventListener("change", event => {
  const file = event.target.files[0];
  const fileReader = new FileReader();
  
  fileReader.onloadend = (file) => {
    const contents = file.target.result;
    const program = new Uint8Array(contents);

    let PC = 0;


    while (PC < program.length) {
      PC += startEmulation(program, PC)
    }

  }
  fileReader.readAsArrayBuffer(file);
})

const cpu = new CPU();

function startEmulation(program, PC) {
  const opcode = program[PC];
  let opbytes = 1;
  
  switch (opcode){
    case 0x00:{
      log(PC, opcode, "NOP")
      break;
    }
    case 0x01: {
      log(PC, opcode, "LXI B, 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]))
      opbytes = 3;
      break;
    }
    case 0x02: {
      log(PC, opcode, "STAX B")
      break;
    }
    case 0x03: {
      log(PC, opcode, "INX B")
      break;
    }
    case 0x04: {
      log(PC, opcode, "INR B")
      break;
    }
    case 0x05: {
      log(PC, opcode, "DCR B")
      break;
    }
    case 0x06: {
      log(PC, opcode, "MVI B, 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0x07: {
      log(PC, opcode, "RLC")
      break;
    }
    case 0x08: {
      log(PC, opcode, "NOP")
      break;
    }
    case 0x09: {
      log(PC, opcode, "DAD B");
      break;
    }
    case 0x0A: {
      log(PC, opcode, "LDAX B");
      break;
    }
    case 0x0B: {
      log(PC, opcode, "DCX B")
      break;
    }
    case 0x0C: {
      log(PC, opcode, "INR C");
      break;
    }
    case 0x0D: {
      log(PC, opcode, "DCR C");
      break;
    }
    case 0x0E: {
      log(PC, opcode, "MVI C, 0x" + hexToString(program[PC + 1]))
      opbytes = 2; 
      break;
    }
    case 0x0F: {
      log(PC, opcode, "RRC");
      break;
    }
    
    case 0x10:{
      log(PC, opcode, "NOP")
      break;
    }
    case 0x11: {
      log(PC, opcode, "LXI D, 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]))
      opbytes = 3;
      break;
    }
    case 0x12: {
      log(PC, opcode, "STAX D")
      break;
    }
    case 0x13: {
      log(PC, opcode, "INX D")
      break;
    }
    case 0x14: {
      log(PC, opcode, "INR D")
      break;
    }
    case 0x15: {
      log(PC, opcode, "DCR D")
      break;
    }
    case 0x16: {
      log(PC, opcode, "MVI D, 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0x17: {
      log(PC, opcode, "RAL")
      break;
    }
    case 0x18: {
      log(PC, opcode, "NOP")
      break;
    }
    case 0x19: {
      log(PC, opcode, "DAD D");
      break;
    }
    case 0x1A: {
      log(PC, opcode, "LDAX D");
      break;
    }
    case 0x1B: {
      log(PC, opcode, "DCX D")
      break;
    }
    case 0x1C: {
      log(PC, opcode, "INR E");
      break;
    }
    case 0x1D: {
      log(PC, opcode, "DCR E");
      break;
    }
    case 0x1E: {
      log(PC, opcode, "MVI E, 0x" + hexToString(program[PC + 1]))
      opbytes = 2; 
      break;
    }
    case 0x1F: {
      log(PC, opcode, "RAR");
      break;
    }


    case 0x20:{
      log(PC, opcode, "NOP")
      break;
    }
    case 0x21: {
      log(PC, opcode, "LXI H, 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]))
      opbytes = 3;
      break;
    }
    case 0x22: {
      log(PC, opcode, "SHLD, 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]))
      opbytes = 3;
      break;
    }
    case 0x23: {
      log(PC, opcode, "INX H")
      break;
    }
    case 0x24: {
      log(PC, opcode, "INR H")
      break;
    }
    case 0x25: {
      log(PC, opcode, "DCR H")
      break;
    }
    case 0x26: {
      log(PC, opcode, "MVI H, 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0x27: {
      log(PC, opcode, "DAA")
      break;
    }
    case 0x28: {
      log(PC, opcode, "NOP")
      break;
    }
    case 0x29: {
      log(PC, opcode, "DAD H");
      break;
    }
    case 0x2A: {
      log(PC, opcode, "LHLD 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]))
      opbytes = 3;
      break;
    }
    case 0x2B: {
      log(PC, opcode, "DCX H")
      break;
    }
    case 0x2C: {
      log(PC, opcode, "INR L");
      break;
    }
    case 0x2D: {
      log(PC, opcode, "DCR L");
      break;
    }
    case 0x2E: {
      log(PC, opcode, "MVI L, 0x" + hexToString(program[PC + 1]))
      opbytes = 2; 
      break;
    }
    case 0x2F: {
      log(PC, opcode, "CMA");
      break;
    }
    case 0x30: {
      log(PC, opcode, "NOP");
      break;
    }
    case 0x31: {
      log(PC, opcode, "LXI SP, 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]))
      opbytes = 3;
      break;
    }
    case 0x32: {
      log(PC, opcode, "STA 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]))
      opbytes = 3;
      break;
    }
    case 0x33: {
      log(PC, opcode, "INX SP");
      break;
    }
    case 0x34: {
      log(PC, opcode, "INR M");
      break;
    }
    case 0x35: {
      log(PC, opcode, "DRC M");
      break;
    }
    case 0x36: {
      log(PC, opcode, "MVI M, 0x" + hexToString(program[PC + 1]));
      opbytes = 2;
      break;
    }
    case 0x37: {
      log(PC, opcode, "STC");
      break;
    }
    case 0x38: {
      log(PC, opcode, "NOP");
      break;
    }
    case 0x39: {
      log(PC, opcode, "DAD SP");
      break;
    }
    case 0x3A: {
      log(PC, opcode, "LDA 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0x3B: {
      log(PC, opcode, "DCX SP")
      break;
    }
    case 0x3C: {
      log(PC, opcode, "INR A")
      break;
    }
    case 0x3D: {
      log(PC, opcode, "DCR A")
      break;
    }
    case 0x3E: {
      log(PC, opcode, "MVI A, 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0x3F: {
      log(PC, opcode, "CMC")
      break;
    }


    
    case 0x40: {
      log(PC, opcode, "MOV B,B")
      break;
    }
    case 0x41: {
      log(PC, opcode, "MOV B,C")
      break;
    }
    case 0x42: {
      log(PC, opcode, "MOV B,D")
      break;
    }
    case 0x43: {
      log(PC, opcode, "MOV B,E")
      break;
    }
    case 0x44: {
      log(PC, opcode, "MOV B,H")
      break;
    }
    case 0x45: {
      log(PC, opcode, "MOV B,L")
      break;
    }
    case 0x46: {
      log(PC, opcode, "MOV B,M")
      break;
    }
    case 0x47: {
      log(PC, opcode, "MOV B,A")
      break;
    }
    case 0x48: {
      log(PC, opcode, "MOV C,B")
      break;
    }
    case 0x49: {
      log(PC, opcode, "MOV C,C")
      break;
    }
    case 0x4A: {
      log(PC, opcode, "MOV C,D")
      break;
    }
    case 0x4B: {
      log(PC, opcode, "MOV C,E")
      break;
    }
    case 0x4C: {
      log(PC, opcode, "MOV C,H")
      break;
    }
    case 0x4D: {
      log(PC, opcode, "MOV C,L")
      break;
    }
    case 0x4E: {
      log(PC, opcode, "MOV C,M")
      break;
    }
    case 0x4F: {
      log(PC, opcode, "MOV C,A")
      break;
    }




    case 0x50: {
      log(PC, opcode, "MOV D,B")
      break;
    }
    case 0x51: {
      log(PC, opcode, "MOV D,C")
      break;
    }
    case 0x52: {
      log(PC, opcode, "MOV D,D")
      break;
    }
    case 0x53: {
      log(PC, opcode, "MOV D,E")
      break;
    }
    case 0x54: {
      log(PC, opcode, "MOV D,H")
      break;
    }
    case 0x55: {
      log(PC, opcode, "MOV D,L")
      break;
    }
    case 0x56: {
      log(PC, opcode, "MOV D,M")
      break;
    }
    case 0x57: {
      log(PC, opcode, "MOV D,A")
      break;
    }
    case 0x58: {
      log(PC, opcode, "MOV D,B")
      break;
    }
    case 0x59: {
      log(PC, opcode, "MOV D,C")
      break;
    }
    case 0x5A: {
      log(PC, opcode, "MOV D,D")
      break;
    }
    case 0x5B: {
      log(PC, opcode, "MOV E,E")
      break;
    }
    case 0x5C: {
      log(PC, opcode, "MOV E,H")
      break;
    }
    case 0x5D: {
      log(PC, opcode, "MOV E,L")
      break;
    }
    case 0x5E: {
      log(PC, opcode, "MOV E,M")
      break;
    }
    case 0x5F: {
      log(PC, opcode, "MOV E,A")
      break;
    }


    case 0x60: {
      log(PC, opcode, "MOV H,B")
      break;
    }
    case 0x61: {
      log(PC, opcode, "MOV H,C")
      break;
    }
    case 0x62: {
      log(PC, opcode, "MOV H,D")
      break;
    }
    case 0x63: {
      log(PC, opcode, "MOV H,E")
      break;
    }
    case 0x64: {
      log(PC, opcode, "MOV H,H")
      break;
    }
    case 0x65: {
      log(PC, opcode, "MOV H,L")
      break;
    }
    case 0x66: {
      log(PC, opcode, "MOV H,M")
      break;
    }
    case 0x67: {
      log(PC, opcode, "MOV H,A")
      break;
    }
    case 0x68: {
      log(PC, opcode, "MOV L,B")
      break;
    }
    case 0x69: {
      log(PC, opcode, "MOV L,C")
      break;
    }
    case 0x6A: {
      log(PC, opcode, "MOV L,D")
      break;
    }
    case 0x6B: {
      log(PC, opcode, "MOV L,E")
      break;
    }
    case 0x6C: {
      log(PC, opcode, "MOV L,H")
      break;
    }
    case 0x6D: {
      log(PC, opcode, "MOV L,L")
      break;
    }
    case 0x6E: {
      log(PC, opcode, "MOV L,M")
      break;
    }
    case 0x6F: {
      log(PC, opcode, "MOV L,A")
      break;
    }


    case 0x70: {
      log(PC, opcode, "MOV M,B")
      break;
    }
    case 0x71: {
      log(PC, opcode, "MOV M,C")
      break;
    }
    case 0x72: {
      log(PC, opcode, "MOV M,D")
      break;
    }
    case 0x73: {
      log(PC, opcode, "MOV M,E")
      break;
    }
    case 0x74: {
      log(PC, opcode, "MOV M,H")
      break;
    }
    case 0x75: {
      log(PC, opcode, "MOV M,L")
      break;
    }
    case 0x76: {
      log(PC, opcode, "MOV M,M")
      break;
    }
    case 0x77: {
      log(PC, opcode, "MOV M,A")
      break;
    }
    case 0x78: {
      log(PC, opcode, "MOV A,B")
      break;
    }
    case 0x79: {
      log(PC, opcode, "MOV A,C")
      break;
    }
    case 0x7A: {
      log(PC, opcode, "MOV A,D")
      break;
    }
    case 0x7B: {
      log(PC, opcode, "MOV A,E")
      break;
    }
    case 0x7C: {
      log(PC, opcode, "MOV A,H")
      break;
    }
    case 0x7D: {
      log(PC, opcode, "MOV A,L")
      break;
    }
    case 0x7E: {
      log(PC, opcode, "MOV A,M")
      break;
    }
    case 0x7F: {
      log(PC, opcode, "MOV A,A")
      break;
    }


    case 0x80: {
      log(PC, opcode, "ADD B")
      break;
    }
    case 0x81: {
      log(PC, opcode, "ADD C")
      break;
    }
    case 0x82: {
      log(PC, opcode, "ADD D")
      break;
    }
    case 0x83: {
      log(PC, opcode, "ADD E")
      break;
    }
    case 0x84: {
      log(PC, opcode, "ADD H")
      break;
    }
    case 0x85: {
      log(PC, opcode, "ADD L")
      break;
    }
    case 0x86: {
      log(PC, opcode, "ADD M")
      break;
    }
    case 0x87: {
      log(PC, opcode, "ADD A")
      break;
    }
    case 0x88: {
      log(PC, opcode, "ADC B")
      break;
    }
    case 0x89: {
      log(PC, opcode, "ADC C")
      break;
    }
    case 0x8A: {
      log(PC, opcode, "ADC D")
      break;
    }
    case 0x8B: {
      log(PC, opcode, "ADC E")
      break;
    }
    case 0x8C: {
      log(PC, opcode, "ADC H")
      break;
    }
    case 0x8D: {
      log(PC, opcode, "ADC L")
      break;
    }
    case 0x8E: {
      log(PC, opcode, "ADC M")
      break;
    }
    case 0x8F: {
      log(PC, opcode, "ADC A")
      break;
    }



    case 0x90: {
      log(PC, opcode, "SUB B")
      break;
    }
    case 0x91: {
      log(PC, opcode, "SUB C")
      break;
    }
    case 0x92: {
      log(PC, opcode, "SUB D")
      break;
    }
    case 0x93: {
      log(PC, opcode, "SUB E")
      break;
    }
    case 0x94: {
      log(PC, opcode, "SUB H")
      break;
    }
    case 0x95: {
      log(PC, opcode, "SUB L")
      break;
    }
    case 0x96: {
      log(PC, opcode, "SUB M")
      break;
    }
    case 0x97: {
      log(PC, opcode, "SUB A")
      break;
    }
    case 0x98: {
      log(PC, opcode, "SBB B")
      break;
    }
    case 0x99: {
      log(PC, opcode, "SBB C")
      break;
    }
    case 0x9A: {
      log(PC, opcode, "SBB D")
      break;
    }
    case 0x9B: {
      log(PC, opcode, "SBB E")
      break;
    }
    case 0x9C: {
      log(PC, opcode, "SBB H")
      break;
    }
    case 0x9D: {
      log(PC, opcode, "SBB L")
      break;
    }
    case 0x9E: {
      log(PC, opcode, "SBB M")
      break;
    }
    case 0x9F: {
      log(PC, opcode, "SBB A")
      break;
    }


    case 0xA0: {
      log(PC, opcode, "ANA B")
      break;
    }
    case 0xA1: {
      log(PC, opcode, "ANA C")
      break;
    }
    case 0xA2: {
      log(PC, opcode, "ANA D")
      break;
    }
    case 0xA3: {
      log(PC, opcode, "ANA E")
      break;
    }
    case 0xA4: {
      log(PC, opcode, "ANA H")
      break;
    }
    case 0xA5: {
      log(PC, opcode, "ANA L")
      break;
    }
    case 0xA6: {
      log(PC, opcode, "ANA M")
      break;
    }
    case 0xA7: {
      log(PC, opcode, "ANA A")
      break;
    }
    case 0xA8: {
      log(PC, opcode, "XRA B")
      break;
    }
    case 0xA9: {
      log(PC, opcode, "XRA C")
      break;
    }
    case 0xAA: {
      log(PC, opcode, "XRA D")
      break;
    }
    case 0xAB: {
      log(PC, opcode, "XRA E")
      break;
    }
    case 0xAC: {
      log(PC, opcode, "XRA H")
      break;
    }
    case 0xAD: {
      log(PC, opcode, "XRA L")
      break;
    }
    case 0xAE: {
      log(PC, opcode, "XRA M")
      break;
    }
    case 0xAF: {
      log(PC, opcode, "XRA A")
      break;
    }


    case 0xB0: {
      log(PC, opcode, "ORA B")
      break;
    }
    case 0xB1: {
      log(PC, opcode, "ORA C")
      break;
    }
    case 0xB2: {
      log(PC, opcode, "ORA D")
      break;
    }
    case 0xB3: {
      log(PC, opcode, "ORA E")
      break;
    }
    case 0xB4: {
      log(PC, opcode, "ORA H")
      break;
    }
    case 0xB5: {
      log(PC, opcode, "ORA L")
      break;
    }
    case 0xB6: {
      log(PC, opcode, "ORA M")
      break;
    }
    case 0xB7: {
      log(PC, opcode, "ORA A")
      break;
    }
    case 0xB8: {
      log(PC, opcode, "CMP B")
      break;
    }
    case 0xB9: {
      log(PC, opcode, "CMP C")
      break;
    }
    case 0xBA: {
      log(PC, opcode, "CMP D")
      break;
    }
    case 0xBB: {
      log(PC, opcode, "CMP E")
      break;
    }
    case 0xBC: {
      log(PC, opcode, "CMP H")
      break;
    }
    case 0xBD: {
      log(PC, opcode, "CMP L")
      break;
    }
    case 0xBE: {
      log(PC, opcode, "CMP M")
      break;
    }
    case 0xBF: {
      log(PC, opcode, "CMP A")
      break;
    }

    case 0xC0:  {
      log(PC, opcode, "RNZ")
      break;
    }
    case 0xC1:  {
      log(PC, opcode, "POP")
      break;
    }
    case 0xC2:  {
      log(PC, opcode, "JNZ 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xC3:  {
      log(PC, opcode, "JMP 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xC4:  {
      log(PC, opcode, "CNZ 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xC5:  {
      log(PC, opcode, "PUSH B")
      break;
    }
    case 0xC6:  {
      log(PC, opcode, "ADI 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0xc7: {
      log(PC, opcode, "RST 0")
      break;
    }
    case 0xc8: {
      log(PC, opcode, "RZ")
      break;
    }
    case 0xc9: {
      log(PC, opcode, "RET")
      break;
    }
    case 0xcA: {
      log(PC, opcode, "JZ 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xcB: {
      log(PC, opcode, "JMP 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xcC: {
      log(PC, opcode, "CZ 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }

    case 0xcD: {
      log(PC, opcode, "CALL 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }

    case 0xcE:  {
      log(PC, opcode, "ACI 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0xcF: {
      log(PC, opcode, "RST 1")
      break;
    }

    case 0xd0: {
      log(PC, opcode, "RNC")
      break;
    }
    case 0xd1: {
      log(PC, opcode, "POP D")
      break;
    }
    case 0xd2: {
      log(PC, opcode, "JNC 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xd3:  {
      log(PC, opcode, "OUT 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0xd4: {
      log(PC, opcode, "CNC 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xd5: {
      log(PC, opcode, "PUSH D")
      break;
    }
    case 0xd6:  {
      log(PC, opcode, "SUI 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0xd7: {
      log(PC, opcode, "RST 2")
      break;
    }
    case 0xd8: {
      log(PC, opcode, "RC")
      break;
    }
    case 0xd9: {
      log(PC, opcode, "RET")
      break;
    }
    case 0xdA: {
      log(PC, opcode, "JC 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }

    case 0xdB:  {
      log(PC, opcode, "IN 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0xdC: {
      log(PC, opcode, "CC 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xdD: {
      log(PC, opcode, "CALL 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xdE: {
      log(PC, opcode, "SBI 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0xdF: {
      log(PC, opcode, "RST 3")
      break;
    }


    case 0xE0: {
      log(PC, opcode, "RPO")
      break;
    }
    case 0xE1: {
      log(PC, opcode, "POP H")
      break;
    }
    case 0xE2: {
      log(PC, opcode, "JPO 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xE3: {
      log(PC, opcode, "XTHL")
      break;
    }

    case 0xE4: {
      log(PC, opcode, "CPO 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xE5: {
      log(PC, opcode, "PUSH H")
      break;
    }
    case 0xE6: {
      log(PC, opcode, "ANI 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0xE7: {
      log(PC, opcode, "RST 4")
      break;
    }
    case 0xE8: {
      log(PC, opcode, "RPE")
      break;
    }
    case 0xE9: {
      log(PC, opcode, "PCHL")
      break;
    }
    case 0xEA: {
      log(PC, opcode, "JPE 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xEB: {
      log(PC, opcode, "XCHG")
      break;
    }
    case 0xEC: {
      log(PC, opcode, "CPE 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xED: {
      log(PC, opcode, "CALL 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xEE: {
      log(PC, opcode, "XRI 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0xEF: {
      log(PC, opcode, "RST 5")
      break;
    }


    case 0xF0: {
      log(PC, opcode, "RP")
      break;
    }
    case 0xF1: {
      log(PC, opcode, "POP PSW")
      break;
    }
    case 0xF2: {
      log(PC, opcode, "JP 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xF3: {
      log(PC, opcode, "DI")
      break;
    }
    case 0xF4: {
      log(PC, opcode, "CP 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xF5: {
      log(PC, opcode, "PUSH PSW")
      break;
    }
    case 0xF6: {
      log(PC, opcode, "ORI 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0xF7: {
      log(PC, opcode, "RST 6")
      break;
    }
    case 0xF8: {
      log(PC, opcode, "RM")
      break;
    }
    case 0xF9: {
      log(PC, opcode, "SPHL")
      break;
    }
    case 0xFA: {
      log(PC, opcode, "JM 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xFB: {
      log(PC, opcode, "EI")
      break;
    }
    case 0xFC: {
      log(PC, opcode, "CM 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xFD: {
      log(PC, opcode, "CALL 0x" + hexToString(program[PC + 2] << 8 | program[PC + 1]));
      opbytes = 3;
      break;
    }
    case 0xFE: {
      log(PC, opcode, "CPI 0x" + hexToString(program[PC + 1]))
      opbytes = 2;
      break;
    }
    case 0xFF: {
      log(PC, opcode, "RST 7")
      break;
    }

    default: {
      log(PC, opcode, "UNKNOWN INSTRUCTION")
      break;
    }
  }

  return opbytes;
}

function log (PC, opcode, ...args) {
  console.log("0x" + hexToString(PC), "0x" + hexToString(opcode), ...args);
}

function hexToString(opcode) {
  return opcode.toString(16);
}