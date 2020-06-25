
import {a, res3, c, b, ac, cy, d, e, h, l, p, res1, res2, s, z, sp}  from  './constants'

export default class CPU {
    constructor() {
        this.rom = new Uint8Array(1024 * 8);
        this.ram = new Uint8Array(1024);
        this.vram = new Uint8Array(1024 * 7);
        this.registers = new Uint8Array(8);
        this.indexRegisters = new Uint16Array(1);
        this.flags = new Uint8Array(8)
        this.pc = 0; // program counter
        this.int_enable = 0

        this.flags[res3] = 1;

    }

    loadProgram(program) {
        for (let index = 0; index < program.length; index++) {
            this.rom[index] = program[index];  
        }
    }

    step() {
        const opcode = this.readByte(this.pc++);
        console.log(opcode.toString(16))
        switch(opcode) {
            case 0x0: break // NOP
            case 0x01: { //LXI   B,word   
                this.registers[c] = this.readByte(this.pc++);
                this.registers[b] = this.readByte(this.pc++);
                break;
            }
            case 0x02: { // STAX B // (store A at BC)
                const BC = (this.registers[b] << 8) | this.registers[c];
                this.writeByte(BC, this.registers[a])
                break;
            }
            case 0x03: { // INX B (inc BC)
                const BC = (this.registers[b] << 8) | this.registers[c];        
                this.registers[b] = ((BC & 0xFF00) >> 8);
                this.registers[c] = (BC & 0x00FF);
                        
                break;
            }
            case 0x04: { // INR B (inc B)
                this.flags[ac] = (this.registers[b] & 0x0F) + 1 > 0x0F;
                this.registers[b] = this.registers[b] + 1;
                this.setSignZeroParity(this.registers[b]);
                break;
            }
            case 0x05: { // DCR B (dec B)
                this.flags[ac] = (this.registers[b] & 0x0F) === 0;
                this.registers[b] = this.registers[b] - 1;
                this.setSignZeroParity(this.registers[b]);
                break;
            }
            case 0x06: {
                this.registers[b] = this.readByte(this.pc++);
                break;
            }
            case 0x07: { // RLC
                // set cy flag equal to the highorder bit of the accumulator (first bit)
                this.flags[cy] = this.registers[a] >> 7;
                this.registers[a] = (this.registers[a] << 1) | (this.registers[a] >> 7)
                break;
            }
            case 0x08: break; // NOP
            case 0x09: { // DAD B
                const HLBC = (((this.registers[b] << 8) | this.registers[c]) + ((this.registers[h] << 8) | this.registers[l]))
                this.registers[h] = ((HLBC & 0xFF00) >> 8)
                this.registers[l] = HLBC & 0x00FF

                this.flags[cy] = HLBC >> 16 & 1
                break;
            }
            case 0x0A: { //LDAX B
                const BC = (this.registers[b] << 8) | this.registers[c];
                this.registers[a] = this.readByte(BC);
                break;
            }
            case 0x0B: { //DCX B
                let BC = (this.registers[b] << 8) | this.registers[c];
                BC--;
                this.registers[b] = ((BC & 0xFF00) >> 8);
                this.registers[c] = BC & 0x00FF;
                break;
            }
            case 0x0C: { //INR C
                this.flags[ac] =((this.registers[c] & 0x0F) + 1) > 0x0F;
                this.registers[c] = this.registers[c] + 1;
                this.setSignZeroParity(this.registers[c]);
                break;
            }
            case 0x0D: { //DCR C
                this.flags[ac] = (this.registers[c] & 0x0F) === 0
                this.registers[c] = this.registers[c] - 1;
                this.setSignZeroParity(this.registers[c]);
                break;
            }
            case 0x0E: { // MVI C, d8
                this.registers[c] = this.readByte(this.pc++);
                break;
            }
            case 0x0F: { // RRC
                // set cy flag equal to the low-order bit of the accumulator (last  bit)
                this.flags[cy] = this.registers[a] & 1;
                this.registers[a] = (this.registers[a] >> 1) | (this.registers[a] << 7)
                break;
            }

            case 0x10: break // NOP
            case 0x11: { // LXI D 2bit
                this.registers[e] = this.readByte(this.pc++);
                this.registers[d] = this.readByte(this.pc++);
                break;
            }
            case 0x12: { // STAX D
                const DE = (this.registers[d] << 8) | this.registers[e];
                this.writeByte(DE, this.registers[a])
                break;
            }
            case 0x13: { // INX D
                let DE = (this.registers[d] << 8) | this.registers[e];
                this.registers[d] = ((DE & 0xFF00) >> 8);
                this.registers[e] = (DE & 0x00FF);
                break;
            }
            case 0x14: { // INR D
                this.flags[ac] =  ((this.registers[d] & 0x0F) + 1) > 0x0F;
                this.registers[d]++;
                this.setSignZeroParity(d);
                break;
            }
            case 0x15: { //DCR D
                this.flags[ac] = (this.registers[d] & 0x0F) === 0;
                this.registers[d]--;
                this.setSignZeroParity(d);
                break;
            }
            case 0x16: { // MVI D
                this.registers[d] = this.readByte(this.pc++)
                break; 
            }
            case 0x17: { // RAL = rotate A left through carry
                const oldCarry = this.flags[cy];
                this.flags[cy] = this.registers[a] >> 7;
                this.registers[a] = (this.registers[a] << 1) | oldCarry
                break;
            }
            case 0x18: break; // NOP
            case 0x19: { // DAD D
                const DE = (this.registers[d] << 8) | (this.registers[e]);
                const HL = (this.registers[h] << 8) | this.registers[l];
                const res = HL + DE;

                this.registers[h] = ((res & 0xFF00) >> 8);
                this.registers[l] = res & 0x00FF

                this.flags[cy] = res >> 16 & 1
                break;
            }
            case 0x1A: { // LDAX D - load A in register DE
                const DE = (this.registers[d] << 8) | this.registers[e];
                this.registers[a] = this.readByte(DE)
                break;
            }
            case 0x1B: { // DCX D
                let DE = (this.registers[d] << 8) | this.registers[e];
                DE--;
                this.registers[d] = (DE & 0xFF00) >> 8;
                this.registers[e] = DE & 0x00FF;
                break
            }
            case 0x1C: { // INR E
                this.flags[ac] = (this.registers[e] & 0x0F) + 1 > 0x0F;
                this.registers[e]++;
                this.setSignZeroParity(this.registers[e])
                break;
            }
            case 0x1D: { // DCR E 
                this.flags[ac] = (this.registers[e] & 0x0F) === 0;
                this.registers[e]--;
                this.setSignZeroParity(this.registers[e]);
                break;
            }
            case 0x1E: { // MVI E
                this.registers[e] = this.readByte(this.pc++)
                break;
            }
            case 0x1F: { // RAR
                const oldCarry = this.flags[cy];
                this.flags[cy] = this.registers[a] & 1;
                this.registers[a] = ((this.registers[a] >> 1) | oldCarry << 7)
                break;    
            }
            case 0x20: break // NOP
            case 0x21: { // LXI D
                this.registers[l] = this.readByte(this.pc++);
                this.registers[h] = this.readByte(this.pc++);
                break;
            }
            case 0x22: { // SHLD a16
                const byte2 = this.readByte(this.pc++);
                const byte1 = this.readByte(this.pc++);
                const address = (byte1 << 8) | byte2;

                this.writeByte(address, this.registers[l])
                this.writeByte(address + 1, this.registers[h])
                break;
            }
            case 0x23: { // INX H
                let HL = (this.registers[h] << 8) | this.registers[l];
                HL++;
                this.registers[h] = ((HL & 0xFF00) >> 8);
                this.registers[l] = (HL & 0x00FF);
                break;
            }
            case 0x24: {//INR H
                this.flags[ac] = (this.registers[h] & 0x0F) + 1 > 0x0F
                this.registers[h]++;
                this.setSignZeroParity(this.registers[h])
                break;
            }
            case 0x25: {//DCR M
                this.flags[ac] = (this.registers[h] & 0x0F) === 0
                this.registers[h]--;
                this.setSignZeroParity(this.registers[h])
                break;
            }
            case 0x26: { // MVI M,d8
                this.registers[h] = this.readByte(this.pc++);
                break;
            }
            case 0x27: { // DAA

                // Probably all wrong.

                // let MSB = (this.registers[a] >> 4)
                // let LSB = this.registers[a]  & 0xF 

                // if (LSB > 9 || this.flags[ac] === 1) {
                //     this.flags[ac] = (this.registers[a]  & 0x0F) + 6 > 0x0F
                //     this.registers[a] += 6;
                //     MSB = (this.registers[a]  >> 4)
                //     LSB = this.registers[a]  & 0xF;
                // }

                // if (MSB > 9 || cy === 1 ) {
                //     MSB += 6;
                //     this.flags[cy] = MSB >> 4 & 1;
                //     this.registers[a]  = ((MSB  << 4) | LSB);
                // }
                break;
            }
            case 0x28: break; //NOP
            case 0x29: { // DAD H
                const HL = (this.registers[h] << 8) | this.registers[l];
                const res = HL + HL;
                this.registers[h] = ((res & 0xFF00) >> 8);
                this.registers[l] = res & 0x00FF
                this.flags[cy] = res >> 16 & 1
                break;
            }
            case 0x2A: { // LHLD
                const byte2 = this.readByte(this.pc++);
                const byte1 = this.readByte(this.pc++);
                const address = (byte1 << 8) | byte2;

                this.registers[l] = address
                this.registers[h] = address + 1
                break;
            }
            case 0x2B: { // DCX H
                let HL = (this.registers[h] << 8) | this.registers[l];
                HL--;
                this.registers[h] = ((HL & 0xFF00) >> 8);
                this.registers[l] = HL & 0x00FF;
                break;
            }
            case 0x2C: { // INR L
                this.flags[ac] = (this.registers[l] & 0x0F) + 1 > 0x0F
                this.registers[l]++;
                this.setSignZeroParity(this.registers[l])
                break;
            }
            case 0x2D: { // DCR L
                this.flags[ac] = (this.registers[l] & 0x0F) === 0;
                this.registers[l] = this.registers[l] - 1;
                this.setSignZeroParity(this.registers[l]);
                break;
            }
            case 0x2E: { // MVI L, D8
                this.registers[l] = this.readByte(this.pc++);
                break;
            }
            case 0x2F: {// CMA
                this.registers[a] = ~this.registers[a];
                break;
            }
            case 0x30: break; // NOP
            case 0x31: { // LXI SP
                const byte2 = this.readByte(this.pc++);
                const byte1 = this.readByte(this.pc++);
                this.indexRegisters[sp] = (byte1 << 8) | byte2
                break;
            }
            case 0x32: { // STA a16
                const byte2 = this.readByte(this.pc++);
                const byte1 = this.readByte(this.pc++);
                const address = (byte1 << 8) | byte2;
                this.writeByte(address, this.registers[a])
                break;
            }
            case 0x33: { // INX SP
                this.indexRegisters[sp]++;
                break;
            }
            case 0x34: { // INR M
                let HL = (this.registers[h] << 8) | this.registers[l];
                this.flags[ac] = (HL & 0x0F) + 1 > 0x0F;
                HL += 1;
                this.registers[h] = ((HL & 0xFF00) >> 8);
                this.registers[l] = (HL & 0x00FF);
                this.setSignZeroParity(HL)
                break;
            }
            case 0x35: { // DCR M
                let HL = (this.registers[h] << 8) | this.registers[l];
                this.flags[ac] = (HL & 0x0F) === 0
                HL -= 1;
                this.registers[h] = ((HL & 0xFF00) >> 8);
                this.registers[l] = (HL & 0x00FF);
                this.setSignZeroParity(HL)
                break;
            }
            case 0x36: { // MVI M ((HL) <- byte 2)
                const byte = this.readByte(this.pc++);
                this.registers[h] = byte & 0xF;
                this.registers[l] = byte >> 4;
                break;
            }
            case 0x37: { // STC
                this.flags[cy] = 1;
                break;
            }
            case 0x38: break; // NOP
            case 0x39: { // DAD SP
                const HL = (this.registers[h] << 8) | this.registers[l];
                const res = HL + this.indexRegisters[sp];

                this.registers[h] = ((res & 0xFF00) >> 8);
                this.registers[l] = res & 0x00FF
                this.flags[cy] = res >> 16 & 1
                break;
            }
            case 0x3A: { // LDA a16
                const byte2 = this.readByte(this.pc++);
                const byte1 = this.readByte(this.pc++);
                const address = (byte1 << 8) | byte2;
                this.registers[a] = address;
                break;
            }
            case 0x3B: { // DCX SP
                this.indexRegisters[sp]--;
                break;
            }
            case 0x3C: { //INR A
                this.flags[ac] = (this.registers[a] & 0x0F) + 1 > 0x0F;
                this.registers[a] = this.registers[a] + 1;
                this.setSignZeroParity(this.registers[a]);
                break;
            }
            case 0x3D: { //DCR A
                this.flags[ac] = (this.registers[a] & 0x0F) === 0;
                this.registers[a] = this.registers[a] - 1;
                this.setSignZeroParity(this.registers[a]);
                break;
            }
            case 0x3E: {
                this.registers[a] = this.readByte(this.pc++);
                break;
            }
            case 0x3F: { // CMC
                this.flags[cy] = ~this.flags[cy];
                this.flags[cy] = this.flags[cy] & 1;
                break;
            }
            default:
                throw Error("Unknown Opcode: 0x" + opcode.toString(16))
        }        
    }
    readByte(address) {
        if (address <= 0x1FFF) {
            return this.rom[address]
        }
        if (address <= 0x23FF) {    
            return this.ram[address - 0x2000]
        }
        if (address <= 0x3FFF) {
            return this.vram[address - 0x2400]
        }
        // RAM MIRROR
        if (address <= 0x43FF){
            return this.ram[address - 0x4000]
        }
        // VRAM MIRROR
        if (address <= 0x5FFF) {
            return this.vram[address -  0x4400]
        }
        console.log("Invalid Address (read)")
    }
    writeByte(address, value) {

        if (address <= 0x1FFF) {
            return;
        }
        if (address <= 0x23FF) {    
            return this.ram[address - 0x2000] = value
        }
        if (address <= 0x3FFF) {
            return this.ram[address - 0x2400] = value
        }
        // RAM MIRROR
        if (address <= 0x43FF){
            return this.ram[address - 0x4000] = value
        }
        // VRAM MIRROR
        if (address <= 0x5FFF) {
            return this.ram[address - 0x4400] = value
        }
        console.log("Invalid Address (write)")

    }
    setSignZeroParity(number) {
        this.flags[s] = number >> 7;
        this.flags[z] = number === 0 ? 1 : 0;
        
        let setBits = 0; 
        for (let mask = 0; mask < 7; mask++) {
            if (isBitSet(number, mask)) {
                setBits += 1;
            }
        }
        this.flags[p] = setBits % 2 == 0;
    }
}


function isBitSet (num, bit) {
    return num & (1 << bit) 
}