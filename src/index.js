import CPU from './CPU';
import { a, b, c, d, e, h, l, ac, res1, res2, res3, cy, s, z, p, sp } from './constants';

const fileInput = document.getElementById("file-input");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.scale(4,4)

const informationSpan = document.getElementById("information");



fileInput.addEventListener("change", event => {
  const file = event.target.files[0];
  const fileReader = new FileReader();
  
  fileReader.onloadend = (file) => {
    const contents = file.target.result;
    const program = new Uint8Array(contents);

    startEmulation(program)

  }
  fileReader.readAsArrayBuffer(file);
})

const cpu = new CPU();

function startEmulation(program) {

  cpu.loadProgram(program)

  setInterval(() => {
      informationSpan.innerHTML = `
<strong>Current Instruction:</strong> 0x${cpu.readByte(cpu.pc).toString(16)}
<strong>PC:</strong> ${cpu.pc}
<strong>SP:</strong> ${cpu.indexRegisters[sp]}

<strong>Registers:</strong>
<strong>A:</strong> ${cpu.registers[a]}
<strong>B:</strong> ${cpu.registers[b]}
<strong>C:</strong> ${cpu.registers[c]}
<strong>D:</strong> ${cpu.registers[d]}
<strong>E:</strong> ${cpu.registers[e]}
<strong>H:</strong> ${cpu.registers[h]}
<strong>L:</strong> ${cpu.registers[l]}

<strong>Flags:</strong>
<strong>Sign:</strong> ${cpu.flags[s]}
<strong>Zero:</strong> ${cpu.flags[z]}
<strong>R1:</strong> ${cpu.flags[res1]}
<strong>AC:</strong> ${cpu.flags[ac]}
<strong>R2:</strong> ${cpu.flags[res2]}
<strong>P:</strong> ${cpu.flags[p]}
<strong>R3:</strong> ${cpu.flags[res3]}
<strong>C:</strong> ${cpu.flags[cy]}
`.trim()

    // cpu.ram[0] = 0x80;
    // console.log(cpu.readByte (0x2000).toString(16))
    try {
      cpu.step()
    }
    catch(err) {
      console.log(err.message)
    }
  }, 0);
}
