import path from 'path'
import { promises as fs } from 'fs'
import { disassemble } from '../src'
import { AddressMode } from '../src/opcodes'

describe('disassemble', () => {
    it('handles single jmp instruction', () => {
        const actual = disassemble(
            [0x4c, 0xf0, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xf0, 0xff, 0xff, 0xff],
            0xfff0
        )
        expect(actual).toEqual({
            0xfff0: {
                address: 0xfff0,
                mnemonic: 'jmp',
                operand: 0xfff0,
                mode: AddressMode.Absolute,
                size: 3
            }
        })
    })

    it('handles multiple instructions', () => {
        const actual = disassemble(
            [0x85, 0x12, 0xea, 0x4c, 0xf0, 0xff, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xf0, 0xff, 0xff, 0xff],
            0xfff0
        )
        expect(actual).toEqual({
            0xfff0: {
                address: 0xfff0,
                mnemonic: 'sta',
                operand: 0x12,
                mode: AddressMode.ZeroPage,
                size: 2
            },
            0xfff2: {
                address: 0xfff2,
                mnemonic: 'nop',
                operand: undefined,
                mode: AddressMode.Implied,
                size: 1
            },
            0xfff3: {
                address: 0xfff3,
                mnemonic: 'jmp',
                operand: 0xfff0,
                mode: AddressMode.Absolute,
                size: 3
            }
        })
    })

    it('handles all addressing modes', async () => {
        const rom = await fs.readFile(path.join(__dirname, './sources/bin/addressmodes.bin'))
        const actual = disassemble([...rom], 0xf000)

        expect(actual).toEqual({
            0xf000: {
                address: 0xf000,
                mnemonic: 'lda',
                operand: 0x05,
                mode: AddressMode.Immediate,
                size: 2
            },
            0xf002: {
                address: 0xf002,
                mnemonic: 'sta',
                operand: 0x200,
                mode: AddressMode.Absolute,
                size: 3
            },
            0xf005: {
                address: 0xf005,
                mnemonic: 'sta',
                operand: 0x12,
                mode: AddressMode.ZeroPage,
                size: 2
            },
            0xf007: {
                address: 0xf007,
                mnemonic: 'ror',
                operand: undefined,
                mode: AddressMode.Accumulator,
                size: 1
            },
            0xf008: {
                address: 0xf008,
                mnemonic: 'nop',
                operand: undefined,
                mode: AddressMode.Implied,
                size: 1
            },
            0xf009: {
                address: 0xf009,
                mnemonic: 'lda',
                operand: 0x1a,
                mode: AddressMode.ZeroPageIndexed,
                size: 2
            },
            0xf00b: {
                address: 0xf00b,
                mnemonic: 'sta',
                operand: 0x2b,
                mode: AddressMode.ZeroPageIndirectX,
                size: 2
            },
            0xf00d: {
                address: 0xf00d,
                mnemonic: 'lda',
                operand: 0x04,
                mode: AddressMode.ZeroPageX,
                size: 2
            },
            0xf00f: {
                address: 0xf00f,
                mnemonic: 'lda',
                operand: 0xabc,
                mode: AddressMode.AbsoluteX,
                size: 3
            },
            0xf012: {
                address: 0xf012,
                mnemonic: 'sta',
                operand: 0xbcd,
                mode: AddressMode.AbsoluteY,
                size: 3
            },
            0xf015: {
                address: 0xf015,
                mnemonic: 'bcc',
                operand: 0xf000,
                mode: AddressMode.Relative,
                size: 2
            },
            0xf017: {
                address: 0xf017,
                mnemonic: 'pha',
                operand: undefined,
                mode: AddressMode.Stack,
                size: 1
            },
            0xf018: {
                address: 0xf018,
                mnemonic: 'lda',
                operand: 0x10,
                mode: AddressMode.ZeroPageIndirect,
                size: 2
            },
            0xf01a: {
                address: 0xf01a,
                mnemonic: 'jmp',
                operand: 0x300,
                mode: AddressMode.AbsoluteIndirect,
                size: 3
            }
        })
    })
})
