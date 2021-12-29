import { Op, OpcodeLookup } from './opcodes'

export interface Instruction extends Op {
    address: number
    operand: number
}

export interface Disassembly extends Record<number, Instruction> {}

interface Context {
    disassembly: Disassembly
    binary: number[]
    base: number
}

const IRQ_VECTOR = 0xfffa
const RESET_VECTOR = 0xfffc
const NMI_VECTOR = 0xfffe

const BRANCHING_OPCODES = [
    'jmp',
    'jsr',
    'bmi',
    'bvc',
    'bvs',
    'bra',
    'bcc',
    'bcs',
    'bne',
    'beq',
    'bbr0',
    'bbr1',
    'bbr2',
    'bbr3',
    'bbr4',
    'bbr5',
    'bbr6',
    'bbr7',
    'bbs0',
    'bbs1',
    'bbs2',
    'bbs3',
    'bbs4',
    'bbs5',
    'bbs6',
    'bbs7'
]
const BREAKING_OPCODES = ['rts', 'rti', 'jmp']

const byte = ({ binary, base }: Context, address: number): number => binary[address - base]

const word = (context: Context, address: number): number => byte(context, address) | (byte(context, address + 1) << 8)

const parseInstruction = (context: Context, address: number): Instruction => {
    const opcode = byte(context, address)
    const op = OpcodeLookup[opcode]

    if (op === undefined) {
        throw new Error(`Illegal opcode $${address.toString(16)}`)
    }

    const operand = op.size === 2 ? byte(context, address + 1) : word(context, address + 1)

    return {
        ...op,
        address,
        operand
    }
}

const isBreaking = (instruction: Instruction): boolean => BREAKING_OPCODES.includes(instruction.mnemonic)

const isBranching = (instruction: Instruction): boolean => BRANCHING_OPCODES.includes(instruction.mnemonic)

const hasAddress = (context: Context, address: number): boolean =>
    Object.keys(context.disassembly).includes(address.toString())

const disassembleAddress = (context: Context, address: number): void => {
    while (true) {
        if (hasAddress(context, address)) {
            return
        }

        const current = parseInstruction(context, address)
        context.disassembly[address] = current

        if (isBranching(current)) {
            disassembleAddress(context, current.operand)
        }
        if (isBreaking(current)) {
            return
        }
    }
}

export const disassemble = (binary: number[], base: number): Disassembly => {
    const context = {
        disassembly: {},
        binary,
        base
    }
    const vectors = [IRQ_VECTOR, RESET_VECTOR, NMI_VECTOR]

    for (const vector of vectors) {
        const address = word(context, vector)
        if (address >= 0xfffa) {
            continue
        }
        disassembleAddress(context, address)
    }

    return context.disassembly
}
