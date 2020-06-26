export default function nameByOp(opcode) {
    let PC = 0
    let program = []
    let opbytes = 0;
    switch (opcode){
        case 0x00:{
          return(PC, opcode, "NOP")
          break;
        }
        case 0x01: {
          return(PC, opcode, "LXI B, " + hexToString(program[PC + 2] << 8 | program[PC + 1]))
          opbytes = 3;  
          break;
        }
        case 0x02: {
          return(PC, opcode, "STAX B")
          break;
        }
        case 0x03: {
          return(PC, opcode, "INX B")
          break;
        }
        case 0x04: {
          return(PC, opcode, "INR B")
          break;
        }
        case 0x05: {
          return(PC, opcode, "DCR B")
          break;
        }
        case 0x06: {
          return(PC, opcode, "MVI B, " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0x07: {
          return(PC, opcode, "RLC")
          break;
        }
        case 0x08: {
          return(PC, opcode, "NOP")
          break;
        }
        case 0x09: {
          return(PC, opcode, "DAD B");
          break;
        }
        case 0x0A: {
          return(PC, opcode, "LDAX B");
          break;
        }
        case 0x0B: {
          return(PC, opcode, "DCX B")
          break;
        }
        case 0x0C: {
          return(PC, opcode, "INR C");
          break;
        }
        case 0x0D: {
          return(PC, opcode, "DCR C");
          break;
        }
        case 0x0E: {
          return(PC, opcode, "MVI C, " + hexToString(program[PC + 1]))
          opbytes = 2; 
          break;
        }
        case 0x0F: {
          return(PC, opcode, "RRC");
          break;
        }
        
        case 0x10:{
          return(PC, opcode, "NOP")
          break;
        }
        case 0x11: {
          return(PC, opcode, "LXI D, " + hexToString(program[PC + 2] << 8 | program[PC + 1]))
          opbytes = 3;
          break;
        }
        case 0x12: {
          return(PC, opcode, "STAX D")
          break;
        }
        case 0x13: {
          return(PC, opcode, "INX D")
          break;
        }
        case 0x14: {
          return(PC, opcode, "INR D")
          break;
        }
        case 0x15: {
          return(PC, opcode, "DCR D")
          break;
        }
        case 0x16: {
          return(PC, opcode, "MVI D, " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0x17: {
          return(PC, opcode, "RAL")
          break;
        }
        case 0x18: {
          return(PC, opcode, "NOP")
          break;
        }
        case 0x19: {
          return(PC, opcode, "DAD D");
          break;
        }
        case 0x1A: {
          return(PC, opcode, "LDAX D");
          break;
        }
        case 0x1B: {
          return(PC, opcode, "DCX D")
          break;
        }
        case 0x1C: {
          return(PC, opcode, "INR E");
          break;
        }
        case 0x1D: {
          return(PC, opcode, "DCR E");
          break;
        }
        case 0x1E: {
          return(PC, opcode, "MVI E, " + hexToString(program[PC + 1]))
          opbytes = 2; 
          break;
        }
        case 0x1F: {
          return(PC, opcode, "RAR");
          break;
        }
    
    
        case 0x20:{
          return(PC, opcode, "NOP")
          break;
        }
        case 0x21: {
          return(PC, opcode, "LXI H, " + hexToString(program[PC + 2] << 8 | program[PC + 1]))
          opbytes = 3;
          break;
        }
        case 0x22: {
          return(PC, opcode, "SHLD, " + hexToString(program[PC + 2] << 8 | program[PC + 1]))
          opbytes = 3;
          break;
        }
        case 0x23: {
          return(PC, opcode, "INX H")
          break;
        }
        case 0x24: {
          return(PC, opcode, "INR H")
          break;
        }
        case 0x25: {
          return(PC, opcode, "DCR H")
          break;
        }
        case 0x26: {
          return(PC, opcode, "MVI H, " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0x27: {
          return(PC, opcode, "DAA")
          break;
        }
        case 0x28: {
          return(PC, opcode, "NOP")
          break;
        }
        case 0x29: {
          return(PC, opcode, "DAD H");
          break;
        }
        case 0x2A: {
          return(PC, opcode, "LHLD " + hexToString(program[PC + 2] << 8 | program[PC + 1]))
          opbytes = 3;
          break;
        }
        case 0x2B: {
          return(PC, opcode, "DCX H")
          break;
        }
        case 0x2C: {
          return(PC, opcode, "INR L");
          break;
        }
        case 0x2D: {
          return(PC, opcode, "DCR L");
          break;
        }
        case 0x2E: {
          return(PC, opcode, "MVI L, " + hexToString(program[PC + 1]))
          opbytes = 2; 
          break;
        }
        case 0x2F: {
          return(PC, opcode, "CMA");
          break;
        }
        case 0x30: {
          return(PC, opcode, "NOP");
          break;
        }
        case 0x31: {
          return(PC, opcode, "LXI SP, " + hexToString(program[PC + 2] << 8 | program[PC + 1]))
          opbytes = 3;
          break;
        }
        case 0x32: {
          return(PC, opcode, "STA " + hexToString(program[PC + 2] << 8 | program[PC + 1]))
          opbytes = 3;
          break;
        }
        case 0x33: {
          return(PC, opcode, "INX SP");
          break;
        }
        case 0x34: {
          return(PC, opcode, "INR M");
          break;
        }
        case 0x35: {
          return(PC, opcode, "DRC M");
          break;
        }
        case 0x36: {
          return(PC, opcode, "MVI M, " + hexToString(program[PC + 1]));
          opbytes = 2;
          break;
        }
        case 0x37: {
          return(PC, opcode, "STC");
          break;
        }
        case 0x38: {
          return(PC, opcode, "NOP");
          break;
        }
        case 0x39: {
          return(PC, opcode, "DAD SP");
          break;
        }
        case 0x3A: {
          return(PC, opcode, "LDA " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0x3B: {
          return(PC, opcode, "DCX SP")
          break;
        }
        case 0x3C: {
          return(PC, opcode, "INR A")
          break;
        }
        case 0x3D: {
          return(PC, opcode, "DCR A")
          break;
        }
        case 0x3E: {
          return(PC, opcode, "MVI A, " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0x3F: {
          return(PC, opcode, "CMC")
          break;
        }
    
    
        
        case 0x40: {
          return(PC, opcode, "MOV B,B")
          break;
        }
        case 0x41: {
          return(PC, opcode, "MOV B,C")
          break;
        }
        case 0x42: {
          return(PC, opcode, "MOV B,D")
          break;
        }
        case 0x43: {
          return(PC, opcode, "MOV B,E")
          break;
        }
        case 0x44: {
          return(PC, opcode, "MOV B,H")
          break;
        }
        case 0x45: {
          return(PC, opcode, "MOV B,L")
          break;
        }
        case 0x46: {
          return(PC, opcode, "MOV B,M")
          break;
        }
        case 0x47: {
          return(PC, opcode, "MOV B,A")
          break;
        }
        case 0x48: {
          return(PC, opcode, "MOV C,B")
          break;
        }
        case 0x49: {
          return(PC, opcode, "MOV C,C")
          break;
        }
        case 0x4A: {
          return(PC, opcode, "MOV C,D")
          break;
        }
        case 0x4B: {
          return(PC, opcode, "MOV C,E")
          break;
        }
        case 0x4C: {
          return(PC, opcode, "MOV C,H")
          break;
        }
        case 0x4D: {
          return(PC, opcode, "MOV C,L")
          break;
        }
        case 0x4E: {
          return(PC, opcode, "MOV C,M")
          break;
        }
        case 0x4F: {
          return(PC, opcode, "MOV C,A")
          break;
        }
    
    
    
    
        case 0x50: {
          return(PC, opcode, "MOV D,B")
          break;
        }
        case 0x51: {
          return(PC, opcode, "MOV D,C")
          break;
        }
        case 0x52: {
          return(PC, opcode, "MOV D,D")
          break;
        }
        case 0x53: {
          return(PC, opcode, "MOV D,E")
          break;
        }
        case 0x54: {
          return(PC, opcode, "MOV D,H")
          break;
        }
        case 0x55: {
          return(PC, opcode, "MOV D,L")
          break;
        }
        case 0x56: {
          return(PC, opcode, "MOV D,M")
          break;
        }
        case 0x57: {
          return(PC, opcode, "MOV D,A")
          break;
        }
        case 0x58: {
          return(PC, opcode, "MOV D,B")
          break;
        }
        case 0x59: {
          return(PC, opcode, "MOV D,C")
          break;
        }
        case 0x5A: {
          return(PC, opcode, "MOV D,D")
          break;
        }
        case 0x5B: {
          return(PC, opcode, "MOV E,E")
          break;
        }
        case 0x5C: {
          return(PC, opcode, "MOV E,H")
          break;
        }
        case 0x5D: {
          return(PC, opcode, "MOV E,L")
          break;
        }
        case 0x5E: {
          return(PC, opcode, "MOV E,M")
          break;
        }
        case 0x5F: {
          return(PC, opcode, "MOV E,A")
          break;
        }
    
    
        case 0x60: {
          return(PC, opcode, "MOV H,B")
          break;
        }
        case 0x61: {
          return(PC, opcode, "MOV H,C")
          break;
        }
        case 0x62: {
          return(PC, opcode, "MOV H,D")
          break;
        }
        case 0x63: {
          return(PC, opcode, "MOV H,E")
          break;
        }
        case 0x64: {
          return(PC, opcode, "MOV H,H")
          break;
        }
        case 0x65: {
          return(PC, opcode, "MOV H,L")
          break;
        }
        case 0x66: {
          return(PC, opcode, "MOV H,M")
          break;
        }
        case 0x67: {
          return(PC, opcode, "MOV H,A")
          break;
        }
        case 0x68: {
          return(PC, opcode, "MOV L,B")
          break;
        }
        case 0x69: {
          return(PC, opcode, "MOV L,C")
          break;
        }
        case 0x6A: {
          return(PC, opcode, "MOV L,D")
          break;
        }
        case 0x6B: {
          return(PC, opcode, "MOV L,E")
          break;
        }
        case 0x6C: {
          return(PC, opcode, "MOV L,H")
          break;
        }
        case 0x6D: {
          return(PC, opcode, "MOV L,L")
          break;
        }
        case 0x6E: {
          return(PC, opcode, "MOV L,M")
          break;
        }
        case 0x6F: {
          return(PC, opcode, "MOV L,A")
          break;
        }
    
    
        case 0x70: {
          return(PC, opcode, "MOV M,B")
          break;
        }
        case 0x71: {
          return(PC, opcode, "MOV M,C")
          break;
        }
        case 0x72: {
          return(PC, opcode, "MOV M,D")
          break;
        }
        case 0x73: {
          return(PC, opcode, "MOV M,E")
          break;
        }
        case 0x74: {
          return(PC, opcode, "MOV M,H")
          break;
        }
        case 0x75: {
          return(PC, opcode, "MOV M,L")
          break;
        }
        case 0x76: {
          return(PC, opcode, "MOV M,M")
          break;
        }
        case 0x77: {
          return(PC, opcode, "MOV M,A")
          break;
        }
        case 0x78: {
          return(PC, opcode, "MOV A,B")
          break;
        }
        case 0x79: {
          return(PC, opcode, "MOV A,C")
          break;
        }
        case 0x7A: {
          return(PC, opcode, "MOV A,D")
          break;
        }
        case 0x7B: {
          return(PC, opcode, "MOV A,E")
          break;
        }
        case 0x7C: {
          return(PC, opcode, "MOV A,H")
          break;
        }
        case 0x7D: {
          return(PC, opcode, "MOV A,L")
          break;
        }
        case 0x7E: {
          return(PC, opcode, "MOV A,M")
          break;
        }
        case 0x7F: {
          return(PC, opcode, "MOV A,A")
          break;
        }
    
    
        case 0x80: {
          return(PC, opcode, "ADD B")
          break;
        }
        case 0x81: {
          return(PC, opcode, "ADD C")
          break;
        }
        case 0x82: {
          return(PC, opcode, "ADD D")
          break;
        }
        case 0x83: {
          return(PC, opcode, "ADD E")
          break;
        }
        case 0x84: {
          return(PC, opcode, "ADD H")
          break;
        }
        case 0x85: {
          return(PC, opcode, "ADD L")
          break;
        }
        case 0x86: {
          return(PC, opcode, "ADD M")
          break;
        }
        case 0x87: {
          return(PC, opcode, "ADD A")
          break;
        }
        case 0x88: {
          return(PC, opcode, "ADC B")
          break;
        }
        case 0x89: {
          return(PC, opcode, "ADC C")
          break;
        }
        case 0x8A: {
          return(PC, opcode, "ADC D")
          break;
        }
        case 0x8B: {
          return(PC, opcode, "ADC E")
          break;
        }
        case 0x8C: {
          return(PC, opcode, "ADC H")
          break;
        }
        case 0x8D: {
          return(PC, opcode, "ADC L")
          break;
        }
        case 0x8E: {
          return(PC, opcode, "ADC M")
          break;
        }
        case 0x8F: {
          return(PC, opcode, "ADC A")
          break;
        }
    
    
    
        case 0x90: {
          return(PC, opcode, "SUB B")
          break;
        }
        case 0x91: {
          return(PC, opcode, "SUB C")
          break;
        }
        case 0x92: {
          return(PC, opcode, "SUB D")
          break;
        }
        case 0x93: {
          return(PC, opcode, "SUB E")
          break;
        }
        case 0x94: {
          return(PC, opcode, "SUB H")
          break;
        }
        case 0x95: {
          return(PC, opcode, "SUB L")
          break;
        }
        case 0x96: {
          return(PC, opcode, "SUB M")
          break;
        }
        case 0x97: {
          return(PC, opcode, "SUB A")
          break;
        }
        case 0x98: {
          return(PC, opcode, "SBB B")
          break;
        }
        case 0x99: {
          return(PC, opcode, "SBB C")
          break;
        }
        case 0x9A: {
          return(PC, opcode, "SBB D")
          break;
        }
        case 0x9B: {
          return(PC, opcode, "SBB E")
          break;
        }
        case 0x9C: {
          return(PC, opcode, "SBB H")
          break;
        }
        case 0x9D: {
          return(PC, opcode, "SBB L")
          break;
        }
        case 0x9E: {
          return(PC, opcode, "SBB M")
          break;
        }
        case 0x9F: {
          return(PC, opcode, "SBB A")
          break;
        }
    
    
        case 0xA0: {
          return(PC, opcode, "ANA B")
          break;
        }
        case 0xA1: {
          return(PC, opcode, "ANA C")
          break;
        }
        case 0xA2: {
          return(PC, opcode, "ANA D")
          break;
        }
        case 0xA3: {
          return(PC, opcode, "ANA E")
          break;
        }
        case 0xA4: {
          return(PC, opcode, "ANA H")
          break;
        }
        case 0xA5: {
          return(PC, opcode, "ANA L")
          break;
        }
        case 0xA6: {
          return(PC, opcode, "ANA M")
          break;
        }
        case 0xA7: {
          return(PC, opcode, "ANA A")
          break;
        }
        case 0xA8: {
          return(PC, opcode, "XRA B")
          break;
        }
        case 0xA9: {
          return(PC, opcode, "XRA C")
          break;
        }
        case 0xAA: {
          return(PC, opcode, "XRA D")
          break;
        }
        case 0xAB: {
          return(PC, opcode, "XRA E")
          break;
        }
        case 0xAC: {
          return(PC, opcode, "XRA H")
          break;
        }
        case 0xAD: {
          return(PC, opcode, "XRA L")
          break;
        }
        case 0xAE: {
          return(PC, opcode, "XRA M")
          break;
        }
        case 0xAF: {
          return(PC, opcode, "XRA A")
          break;
        }
    
    
        case 0xB0: {
          return(PC, opcode, "ORA B")
          break;
        }
        case 0xB1: {
          return(PC, opcode, "ORA C")
          break;
        }
        case 0xB2: {
          return(PC, opcode, "ORA D")
          break;
        }
        case 0xB3: {
          return(PC, opcode, "ORA E")
          break;
        }
        case 0xB4: {
          return(PC, opcode, "ORA H")
          break;
        }
        case 0xB5: {
          return(PC, opcode, "ORA L")
          break;
        }
        case 0xB6: {
          return(PC, opcode, "ORA M")
          break;
        }
        case 0xB7: {
          return(PC, opcode, "ORA A")
          break;
        }
        case 0xB8: {
          return(PC, opcode, "CMP B")
          break;
        }
        case 0xB9: {
          return(PC, opcode, "CMP C")
          break;
        }
        case 0xBA: {
          return(PC, opcode, "CMP D")
          break;
        }
        case 0xBB: {
          return(PC, opcode, "CMP E")
          break;
        }
        case 0xBC: {
          return(PC, opcode, "CMP H")
          break;
        }
        case 0xBD: {
          return(PC, opcode, "CMP L")
          break;
        }
        case 0xBE: {
          return(PC, opcode, "CMP M")
          break;
        }
        case 0xBF: {
          return(PC, opcode, "CMP A")
          break;
        }
    
        case 0xC0:  {
          return(PC, opcode, "RNZ")
          break;
        }
        case 0xC1:  {
          return(PC, opcode, "POP")
          break;
        }
        case 0xC2:  {
          return(PC, opcode, "JNZ " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xC3:  {
          return(PC, opcode, "JMP " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xC4:  {
          return(PC, opcode, "CNZ " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xC5:  {
          return(PC, opcode, "PUSH B")
          break;
        }
        case 0xC6:  {
          return(PC, opcode, "ADI " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0xc7: {
          return(PC, opcode, "RST 0")
          break;
        }
        case 0xc8: {
          return(PC, opcode, "RZ")
          break;
        }
        case 0xc9: {
          return(PC, opcode, "RET")
          break;
        }
        case 0xcA: {
          return(PC, opcode, "JZ " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xcB: {
          return(PC, opcode, "JMP " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xcC: {
          return(PC, opcode, "CZ " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
    
        case 0xcD: {
          return(PC, opcode, "CALL " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
    
        case 0xcE:  {
          return(PC, opcode, "ACI " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0xcF: {
          return(PC, opcode, "RST 1")
          break;
        }
    
        case 0xd0: {
          return(PC, opcode, "RNC")
          break;
        }
        case 0xd1: {
          return(PC, opcode, "POP D")
          break;
        }
        case 0xd2: {
          return(PC, opcode, "JNC " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xd3:  {
          return(PC, opcode, "OUT " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0xd4: {
          return(PC, opcode, "CNC " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xd5: {
          return(PC, opcode, "PUSH D")
          break;
        }
        case 0xd6:  {
          return(PC, opcode, "SUI " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0xd7: {
          return(PC, opcode, "RST 2")
          break;
        }
        case 0xd8: {
          return(PC, opcode, "RC")
          break;
        }
        case 0xd9: {
          return(PC, opcode, "RET")
          break;
        }
        case 0xdA: {
          return(PC, opcode, "JC " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
    
        case 0xdB:  {
          return(PC, opcode, "IN " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0xdC: {
          return(PC, opcode, "CC " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xdD: {
          return(PC, opcode, "CALL " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xdE: {
          return(PC, opcode, "SBI " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0xdF: {
          return(PC, opcode, "RST 3")
          break;
        }
    
    
        case 0xE0: {
          return(PC, opcode, "RPO")
          break;
        }
        case 0xE1: {
          return(PC, opcode, "POP H")
          break;
        }
        case 0xE2: {
          return(PC, opcode, "JPO " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xE3: {
          return(PC, opcode, "XTHL")
          break;
        }
    
        case 0xE4: {
          return(PC, opcode, "CPO " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xE5: {
          return(PC, opcode, "PUSH H")
          break;
        }
        case 0xE6: {
          return(PC, opcode, "ANI " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0xE7: {
          return(PC, opcode, "RST 4")
          break;
        }
        case 0xE8: {
          return(PC, opcode, "RPE")
          break;
        }
        case 0xE9: {
          return(PC, opcode, "PCHL")
          break;
        }
        case 0xEA: {
          return(PC, opcode, "JPE " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xEB: {
          return(PC, opcode, "XCHG")
          break;
        }
        case 0xEC: {
          return(PC, opcode, "CPE " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xED: {
          return(PC, opcode, "CALL " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xEE: {
          return(PC, opcode, "XRI " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0xEF: {
          return(PC, opcode, "RST 5")
          break;
        }
    
    
        case 0xF0: {
          return(PC, opcode, "RP")
          break;
        }
        case 0xF1: {
          return(PC, opcode, "POP PSW")
          break;
        }
        case 0xF2: {
          return(PC, opcode, "JP " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xF3: {
          return(PC, opcode, "DI")
          break;
        }
        case 0xF4: {
          return(PC, opcode, "CP " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xF5: {
          return(PC, opcode, "PUSH PSW")
          break;
        }
        case 0xF6: {
          return(PC, opcode, "ORI " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0xF7: {
          return(PC, opcode, "RST 6")
          break;
        }
        case 0xF8: {
          return(PC, opcode, "RM")
          break;
        }
        case 0xF9: {
          return(PC, opcode, "SPHL")
          break;
        }
        case 0xFA: {
          return(PC, opcode, "JM " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xFB: {
          return(PC, opcode, "EI")
          break;
        }
        case 0xFC: {
          return(PC, opcode, "CM " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xFD: {
          return(PC, opcode, "CALL " + hexToString(program[PC + 2] << 8 | program[PC + 1]));
          opbytes = 3;
          break;
        }
        case 0xFE: {
          return(PC, opcode, "CPI " + hexToString(program[PC + 1]))
          opbytes = 2;
          break;
        }
        case 0xFF: {
          return(PC, opcode, "RST 7")
          break;
        }
    
        default: {
          return (PC, opcode, "UNKNOWN INSTRUCTION")
        }
      }
}

function hexToString() {
    return ""
}