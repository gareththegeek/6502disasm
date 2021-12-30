import { AddressMode, Op, OpcodeLookup } from './opcodes'

export interface Instruction extends Op {
    address: number
    operand?: number
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

const twosComplement = (value: number): number => ((value & 0x80) === 0 ? value : -((~value + 1) & 0xff))

const parseOperand = (context: Context, address: number, op: Op): number | undefined => {
    if (op.mode === AddressMode.Relative) {
        return address + op.size + twosComplement(byte(context, address + 1))
    }
    switch (op.size) {
        case 1:
            return undefined
        case 2:
            return byte(context, address + 1)
        case 3:
            return word(context, address + 1)
        default:
            throw new Error(`Unexpected op size ${op}`)
    }
}

const addressToString = (context: Context, address: number): string => `$${(context.base + address).toString(16)}`

const parseInstruction = (context: Context, address: number): Instruction => {
    const opcode = byte(context, address)
    if (opcode === undefined) {
        throw new Error(`No byte found at address ${addressToString(context, address)}`)
    }

    const op = OpcodeLookup[opcode]
    if (op === undefined) {
        throw new Error(`Illegal opcode $${opcode} at ${addressToString(context, address)}`)
    }

    const operand = parseOperand(context, address, op)

    return {
        ...op,
        address,
        operand
    }
}

const isDynamic = ({ mode }: Instruction): boolean =>
    mode === AddressMode.AbsoluteIndirect || mode === AddressMode.AbsoluteIndirectX

const isBreaking = (instruction: Instruction): boolean => BREAKING_OPCODES.includes(instruction.mnemonic)

const isBranching = (instruction: Instruction): boolean => BRANCHING_OPCODES.includes(instruction.mnemonic)

const hasAddress = (context: Context, address: number): boolean =>
    Object.keys(context.disassembly).includes(address.toString())

const disassembleAddress = (context: Context, startAddress: number): void => {
    let address = startAddress
    while (true) {
        if (hasAddress(context, address)) {
            return
        }

        const current = parseInstruction(context, address)
        context.disassembly[address] = current
        address += current.size

        if (isBranching(current)) {
            if (!isDynamic(current)) {
                if (current.operand === undefined) {
                    throw new Error(`Operand is undefined but opcode is branching ${current}`)
                }

                disassembleAddress(context, current.operand)
            }
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
