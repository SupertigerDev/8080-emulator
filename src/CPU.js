import nameByOp from './disassemble';
import {a, res3, c, b, ac, cy, d, e, h, l, p, res1, res2, s, z, sp}  from  './constants'

export default class CPU {
    constructor() {

        // this.rom = new Uint8Array(1024 * 8);
        // this.ram = new Uint8Array(1024);
        // this.vram = new Uint8Array(1024 * 7);
        this.memory = new Uint8Array(0x10000);

        this.registers = new Uint8Array(8);
        this.indexRegisters = new Uint16Array(1);
        this.flags = new Uint8Array(8)
        this.pc = 0; // program counter
        this.int_enable = 0

        this.flags[res3] = 1;

    }

loadProgram(program) {
    for (let index = 0; index < program.length; index++) {
         this.memory[index + 0x100] = program[index];  
        // this.rom[index] = program[index];  
    }
}

    step() {
        // console.log("0x" + this.pc.toString(16), "0x" + this.readByte(this.pc).toString(16) + `(${nameByOp(this.readByte(this.pc))})`)
        const opcode = this.readByte(this.pc++);
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
                let BC = (this.registers[b] << 8) | this.registers[c];    
                BC++;    
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
                DE++;
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
            case 0x21: { // LXI H
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
            case 0x25: {//DCR H
                this.flags[ac] = (this.registers[h] & 0x0F) === 0
                this.registers[h]--;
                this.setSignZeroParity(this.registers[h])
                break;
            }
            case 0x26: { // MVI H,d8
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

                this.registers[l] = this.readByte(address)
                this.registers[h] = this.readByte(address + 1)
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
                // console.log("adr", address.toString(16))
                // console.log("pc", this.pc.toString(16))
                // console.log("pc", this.pc)
                this.writeByte(address, this.registers[a])
                break;
            }
            case 0x33: { // INX SP
                this.indexRegisters[sp]++;
                break;
            }
            case 0x34: { // INR M
                const HL = (this.registers[h] << 8) | this.registers[l];
                const value = this.readByte(HL);
                this.flags[ac] = (value & 0x0F) + 1 > 0x0F;
                this.writeByte(HL, value + 1);

                this.setSignZeroParity(value + 1)
                break;
            }
            case 0x35: { // DCR M
                let HL = (this.registers[h] << 8) | this.registers[l];
                const value = this.readByte(HL);
                this.flags[ac] = (value & 0x0F) === 0
                this.writeByte(HL, value - 1);

                this.setSignZeroParity(value -1)
                break;
            }
            case 0x36: { // MVI M ((HL) <- byte 2)
                let HL = (this.registers[h] << 8) | this.registers[l];
                const byte = this.readByte(this.pc++);

                this.writeByte(HL, byte);
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
                this.registers[a] = this.readByte(address);
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
            case 0x3E: { // MVI A, d8
                this.registers[a] = this.readByte(this.pc++);
                break;
            }
            case 0x3F: { // CMC
                this.flags[cy] = ~this.flags[cy];
                this.flags[cy] = this.flags[cy] & 1;
                break;
            }
            case 0xc2: { // JNZ z == 0
                if (this.flags[z] === 0) this.JMP();
                break;
            }
            case 0xc3: this.JMP(); break;
            case 0xc4: { // CNZ a16 z === 0
                if (this.flags[z] === 0) this.CALL()
                break;
            }
            case 0xc9: this.RET(); break;
            case 0xca: { // JZ z == 1
                if (this.flags[z] === 1) this.JMP();
                break;
            }
            case 0xcb: { // JMP a16 illegal opcode
                console.log("illegal opcode.")
                break;
            }
            case 0xcC: { // CZ a16 z === 1
                if (this.flags[z] === 1) this.CALL();
                break;
            }
            case 0xcd: this.CALL(); break;
            case 0xd2: { // JNC a16 cy === 0
                if (this.flags[cy] === 0)  this.JMP();
                break;
            }
            case 0xd3: { //OUT
                if (this.registers[c] === 2) {
                    console.log(this.registers[e])
                    this.pc++;
                } else if (this.registers[c] === 9) {
                    const DE = (this.registers[d] << 8) | this.registers[e];
                    let count = 0;
                    let message = ""
                    while (true){
                        const char = String.fromCharCode(this.memory[DE + count]);
                        if (char === "$") {
                            console.log(message)
                            this.pc++;
                            break;
                        }
                        message = message + char;
                        count +=1;
                    }
                }
                break;
            }
            case 0xd4: { // CNC a16 c === 0
                if (this.flags[cy] === 0) this.CALL();
                break;
            }
            case 0xd5: {
                const DE = this.registers[d] << 8 | this.registers[e];
                this.PUSH(DE);
                break;
            }
            // { //
            //     this.writeByte(this.indexRegisters[sp] - 2, this.registers[e])
            //     this.writeByte(this.indexRegisters[sp] - 1,  this.registers[d])
            //     this.indexRegisters[sp]-= 2;
            //     break;
            // }
            case 0xdA: { // JC a16 if cy === 1
                if (this.flags[cy] === 1) this.JMP();
                break;
            }
            // case  0xdb: 
            case 0xdC: { // CC a16 c === 1
                if (this.flags[cy] === 1) this.CALL();
                break;
            }
            case 0xDD: { // CALL a16 illegal opcode
                console.log("illegal opcode.")
                break;
            }
            case 0xE2: { // JPO a16 p == 0
                if (this.flags[p] === 0) this.JMP();
                break;
            }
            case 0xE4: { // CPO a16 p === 0
                if (this.flags[p] === 0) this.CALL();
                break;
            }
            case 0xe6: { // ANI
                this.registers[a] = this.registers[a] & this.readByte(this.pc++);
                //TODO: idk how to get 3 bit whatever, i give up.
                //this.flags[ac] = this.registers[a] << 3
                this.setSignZeroParity(this.registers[a]);
                this.flags[cy] = 0;
                break;
            }
            case 0xEA: { // JPE a16 p === 1
                if (this.flags[p] === 1) this.JMP();
                break;
            }
            case 0xEC: { // CPE a16 p === 1
                if (this.flags[p] === 1) this.CALL();
                break;
            }
            case 0xED: { // CALL a16 illegal opcode
                console.log("illegal opcode.")
                break;
            }
            case 0xF2: { // JPO a16 p === 0
                if (this.flags[s] === 1) this.JMP();
                break;
            }
            case 0xF4: { // CP a16 s === 1
                if (this.flags[s] === 1) this.CALL();
                break;
            }
            case 0xFA: { // JC a16 s === 0
                if (this.flags[s] === 0) this.JMP();
                break;
            }
            case 0xFC: { // CP a16 s === 0
                if (this.flags[s] === 0) this.CALL();
                break;
            }
            case 0xFD: { // CALL a16 illegal opcode
                console.log("illegal opcode.")
                break;
            }

            case 0xeb: { //XCHG exchange HL and DE
                const H = this.registers[h];
                const L = this.registers[l];

                this.registers[h] = d          
                this.registers[l] = e

                this.registers[d] = H                
                this.registers[e] = L                
            
                break;

            }

            default: {
                const error = new Error("Unknown Opcode: 0x" + opcode.toString(16) + ` (${nameByOp(opcode)}`);
                error.name = "not_impl"
                throw error;
            }
        }        
    }
    JMP() {
        this.pc = this.readWord(this.pc);
    }

    PUSH(val) {
        this.writeWord(this.indexRegisters[sp], val)
        this.indexRegisters[sp]-= 2;
    }
    POP() {
        this.indexRegisters[sp]+= 2
        return this.readWord(this.indexRegisters[sp]);
    }
    CALL() {
        const address = this.readWord(this.pc);
        this.pc+= 2;
        this.PUSH(this.pc)
        this.pc = address;
    }
    RET() {
        this.pc = this.POP();
    }
    readWord (address) {
        return ((this.readByte(address + 1) << 8) | this.readByte(address))
    }
    writeWord(address, value) {
        this.writeByte(address + 1, value >> 8)
        this.writeByte(address, value & 0xFF)
    }
    readByte(address) {
        return this.memory [address]
        // if (address <= 0x1FFF) {
        //     return this.rom[address]
        // }
        // if (address <= 0x23FF) {    
        //     return this.ram[address - 0x2000]
        // }
        // if (address <= 0x3FFF) {
        //     return this.vram[address - 0x2400]
        // }
        // // RAM MIRROR
        // if (address <= 0x43FF){
        //     return this.ram[address - 0x4000]
        // }
        // // VRAM MIRROR
        // if (address <= 0x5FFF) {
        //     return this.vram[address -  0x4400]
        // }
        // console.error("Invalid Address (readByte)")
    }
    writeByte(address, value) {
        this.memory [address] = value

        // if (address <= 0x1FFF) {
        //     return;
        // }
        // if (address <= 0x23FF) {    
        //     this.ram[address - 0x2000] = value
        //     return 
        // }
        // if (address <= 0x3FFF) {
        //     this.ram[address - 0x2400] = value
        //     return
        // }
        // // RAM MIRROR
        // if (address <= 0x43FF){
        //     this.ram[address - 0x4000] = value
        //     return
        // }
        // // VRAM MIRROR
        // if (address <= 0x5FFF) {
        //     this.vram[address - 0x4400] = value
        //     return
        // }
        // console.error("Invalid Address (writeByte)")
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