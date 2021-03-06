export enum AddressMode {
    Immediate = '#',
    Absolute = 'a',
    ZeroPage = 'zp',
    Accumulator = 'A',
    Implied = 'I',
    ZeroPageIndexed = '(zp),Y',
    ZeroPageIndirectX = '(zp,X)',
    ZeroPageX = 'zp,X',
    AbsoluteX = 'a,X',
    AbsoluteY = 'a,Y',
    Relative = 'r',
    AbsoluteIndirect = '(a)',
    Stack = 's',
    ZeroPageIndirect = '(zp)',
    AbsoluteIndirectX = '(a,X)'
}

export interface Op {
    mnemonic: string
    mode: AddressMode
    size: number
}

const o = (mnemonic: string, size: number, mode: AddressMode): Op => ({
    mnemonic,
    mode,
    size
})

export const OpcodeLookup: { [code: number]: Op } = {
    0x00: o('brk', 2, AddressMode.Implied),
    0x01: o('ora', 2, AddressMode.ZeroPageIndirectX),
    0x04: o('tsb', 2, AddressMode.ZeroPage),
    0x05: o('ora', 2, AddressMode.ZeroPage),
    0x06: o('asl', 2, AddressMode.ZeroPage),
    0x07: o('rmb0', 2, AddressMode.ZeroPage),
    0x08: o('php', 1, AddressMode.Stack),
    0x09: o('ora', 2, AddressMode.Immediate),
    0x0a: o('asl', 1, AddressMode.Accumulator),
    0x0c: o('tsb', 3, AddressMode.Absolute),
    0x0d: o('ora', 3, AddressMode.Absolute),
    0x0e: o('asl', 3, AddressMode.Absolute),
    0x0f: o('bbr0', 3, AddressMode.Relative),

    0x10: o('bpl', 2, AddressMode.Relative),
    0x11: o('ora', 2, AddressMode.ZeroPageIndexed),
    0x12: o('ora', 2, AddressMode.ZeroPageIndirect),
    0x14: o('trb', 2, AddressMode.ZeroPage),
    0x15: o('ora', 2, AddressMode.ZeroPageX),
    0x16: o('asl', 2, AddressMode.ZeroPageX),
    0x17: o('rmb1', 2, AddressMode.ZeroPage),
    0x18: o('clc', 1, AddressMode.Implied),
    0x19: o('ora', 3, AddressMode.AbsoluteY),
    0x1a: o('inc', 1, AddressMode.Accumulator),
    0x1c: o('trb', 3, AddressMode.Absolute),
    0x1d: o('ora', 3, AddressMode.AbsoluteX),
    0x1e: o('asl', 3, AddressMode.AbsoluteX),
    0x1f: o('bbr1', 3, AddressMode.Relative),

    0x20: o('jsr', 3, AddressMode.Absolute),
    0x21: o('and', 2, AddressMode.ZeroPageIndirectX),
    0x24: o('bit', 2, AddressMode.ZeroPage),
    0x25: o('and', 2, AddressMode.ZeroPage),
    0x26: o('rol', 2, AddressMode.ZeroPage),
    0x27: o('rmb2', 2, AddressMode.ZeroPage),
    0x28: o('plp', 1, AddressMode.Stack),
    0x29: o('and', 2, AddressMode.Immediate),
    0x2a: o('rol', 1, AddressMode.Accumulator),
    0x2c: o('bit', 3, AddressMode.Absolute),
    0x2d: o('and', 3, AddressMode.Absolute),
    0x2e: o('rol', 3, AddressMode.Absolute),
    0x2f: o('bbr2', 3, AddressMode.Relative),

    0x30: o('bmi', 2, AddressMode.Relative),
    0x31: o('and', 2, AddressMode.ZeroPageIndexed),
    0x32: o('and', 2, AddressMode.ZeroPageIndirect),
    0x34: o('bit', 2, AddressMode.ZeroPageX),
    0x35: o('and', 2, AddressMode.ZeroPageX),
    0x36: o('rol', 2, AddressMode.ZeroPageX),
    0x37: o('rmb3', 2, AddressMode.ZeroPage),
    0x38: o('sec', 1, AddressMode.Implied),
    0x39: o('and', 3, AddressMode.AbsoluteY),
    0x3a: o('dec', 1, AddressMode.Accumulator),
    0x3c: o('bit', 3, AddressMode.AbsoluteX),
    0x3d: o('and', 3, AddressMode.AbsoluteX),
    0x3e: o('rol', 3, AddressMode.AbsoluteX),
    0x3f: o('bbr3', 3, AddressMode.Relative),

    0x40: o('rti', 1, AddressMode.Stack),
    0x41: o('eor', 2, AddressMode.ZeroPageIndirectX),
    0x45: o('eor', 2, AddressMode.ZeroPage),
    0x46: o('lsr', 2, AddressMode.ZeroPage),
    0x47: o('rmb4', 2, AddressMode.ZeroPage),
    0x48: o('pha', 1, AddressMode.Stack),
    0x49: o('eor', 2, AddressMode.Immediate),
    0x4a: o('lsr', 1, AddressMode.Accumulator),
    0x4c: o('jmp', 3, AddressMode.Absolute),
    0x4d: o('eor', 3, AddressMode.Absolute),
    0x4e: o('lsr', 3, AddressMode.Absolute),
    0x4f: o('bbr4', 3, AddressMode.Relative),

    0x50: o('bvc', 2, AddressMode.Relative),
    0x51: o('eor', 2, AddressMode.ZeroPageIndexed),
    0x52: o('eor', 2, AddressMode.ZeroPageIndirect),
    0x55: o('eor', 2, AddressMode.ZeroPageX),
    0x56: o('lsr', 2, AddressMode.ZeroPageX),
    0x57: o('rmb5', 2, AddressMode.ZeroPage),
    0x58: o('cli', 1, AddressMode.Implied),
    0x59: o('eor', 3, AddressMode.AbsoluteY),
    0x5a: o('phy', 1, AddressMode.Stack),
    0x5d: o('eor', 3, AddressMode.AbsoluteX),
    0x5e: o('lsr', 3, AddressMode.AbsoluteX),
    0x5f: o('bbr5', 3, AddressMode.Relative),

    0x60: o('rts', 1, AddressMode.Stack),
    0x61: o('adc', 2, AddressMode.ZeroPageIndirectX),
    0x64: o('stz', 2, AddressMode.ZeroPage),
    0x65: o('adc', 2, AddressMode.ZeroPage),
    0x66: o('ror', 2, AddressMode.ZeroPage),
    0x67: o('rmb6', 2, AddressMode.ZeroPage),
    0x68: o('pla', 1, AddressMode.Stack),
    0x69: o('adc', 2, AddressMode.Immediate),
    0x6a: o('ror', 1, AddressMode.Accumulator),
    0x6c: o('jmp', 3, AddressMode.AbsoluteIndirect),
    0x6d: o('adc', 3, AddressMode.Absolute),
    0x6e: o('ror', 3, AddressMode.Absolute),
    0x6f: o('bbr6', 3, AddressMode.Relative),

    0x70: o('bvs', 2, AddressMode.Relative),
    0x71: o('adc', 2, AddressMode.ZeroPageIndexed),
    0x72: o('adc', 2, AddressMode.ZeroPageIndirect),
    0x74: o('stz', 2, AddressMode.ZeroPageX),
    0x75: o('adc', 2, AddressMode.ZeroPageX),
    0x76: o('ror', 2, AddressMode.ZeroPageX),
    0x77: o('rmb7', 2, AddressMode.ZeroPage),
    0x78: o('sei', 1, AddressMode.Implied),
    0x79: o('adc', 3, AddressMode.AbsoluteY),
    0x7a: o('ply', 1, AddressMode.Stack),
    0x7c: o('jmp', 3, AddressMode.AbsoluteIndirectX),
    0x7d: o('adc', 3, AddressMode.AbsoluteX),
    0x7e: o('ror', 3, AddressMode.AbsoluteX),
    0x7f: o('bbr7', 3, AddressMode.Relative),

    0x80: o('bra', 2, AddressMode.Relative),
    0x81: o('sta', 2, AddressMode.ZeroPageIndirectX),
    0x84: o('sty', 2, AddressMode.ZeroPage),
    0x85: o('sta', 2, AddressMode.ZeroPage),
    0x86: o('stx', 2, AddressMode.ZeroPage),
    0x87: o('smb0', 2, AddressMode.ZeroPage),
    0x88: o('dey', 1, AddressMode.Implied),
    0x89: o('bit', 2, AddressMode.Immediate),
    0x8a: o('txa', 1, AddressMode.Implied),
    0x8c: o('sty', 3, AddressMode.Absolute),
    0x8d: o('sta', 3, AddressMode.Absolute),
    0x8e: o('stx', 3, AddressMode.Absolute),
    0x8f: o('bbs0', 3, AddressMode.Relative),

    0x90: o('bcc', 2, AddressMode.Relative),
    0x91: o('sta', 2, AddressMode.ZeroPageIndexed),
    0x92: o('sta', 2, AddressMode.ZeroPageIndirect),
    0x94: o('sty', 2, AddressMode.ZeroPageX),
    0x95: o('sta', 2, AddressMode.ZeroPageX),
    0x96: o('stx', 2, AddressMode.ZeroPageX),
    0x97: o('smb1', 2, AddressMode.ZeroPage),
    0x98: o('tya', 1, AddressMode.Implied),
    0x99: o('sta', 3, AddressMode.AbsoluteY),
    0x9a: o('txs', 1, AddressMode.Implied),
    0x9c: o('stz', 3, AddressMode.Absolute),
    0x9d: o('sta', 3, AddressMode.AbsoluteX),
    0x9e: o('stz', 3, AddressMode.AbsoluteX),
    0x9f: o('bbs1', 3, AddressMode.Relative),

    0xa0: o('ldy', 2, AddressMode.Immediate),
    0xa1: o('lda', 2, AddressMode.ZeroPageIndirectX),
    0xa2: o('ldx', 2, AddressMode.Immediate),
    0xa4: o('ldy', 2, AddressMode.ZeroPage),
    0xa5: o('lda', 2, AddressMode.ZeroPage),
    0xa6: o('ldx', 2, AddressMode.ZeroPage),
    0xa7: o('smb2', 2, AddressMode.ZeroPage),
    0xa8: o('tay', 1, AddressMode.Implied),
    0xa9: o('lda', 2, AddressMode.Immediate),
    0xaa: o('tax', 1, AddressMode.Implied),
    0xac: o('ldy', 3, AddressMode.Absolute),
    0xad: o('lda', 3, AddressMode.Absolute),
    0xae: o('ldx', 3, AddressMode.Absolute),
    0xaf: o('bbs2', 3, AddressMode.Relative),

    0xb0: o('bcs', 2, AddressMode.Relative),
    0xb1: o('lda', 2, AddressMode.ZeroPageIndexed),
    0xb2: o('lda', 2, AddressMode.ZeroPageIndirect),
    0xb4: o('ldy', 2, AddressMode.ZeroPageX),
    0xb5: o('lda', 2, AddressMode.ZeroPageX),
    0xb6: o('ldx', 2, AddressMode.ZeroPageX),
    0xb7: o('smb3', 2, AddressMode.ZeroPage),
    0xb8: o('clv', 1, AddressMode.Implied),
    0xb9: o('lda', 3, AddressMode.AbsoluteY),
    0xba: o('tsx', 1, AddressMode.Implied),
    0xbc: o('ldy', 3, AddressMode.AbsoluteX),
    0xbd: o('lda', 3, AddressMode.AbsoluteX),
    0xbe: o('ldx', 3, AddressMode.AbsoluteX),
    0xbf: o('bbs3', 3, AddressMode.Relative),

    0xc0: o('cpy', 2, AddressMode.Immediate),
    0xc1: o('cmp', 2, AddressMode.ZeroPageIndirectX),
    0xc4: o('cpy', 2, AddressMode.ZeroPage),
    0xc5: o('cmp', 2, AddressMode.ZeroPage),
    0xc6: o('dec', 2, AddressMode.ZeroPage),
    0xc7: o('smb4', 2, AddressMode.ZeroPage),
    0xc8: o('iny', 1, AddressMode.Implied),
    0xc9: o('cmp', 2, AddressMode.Immediate),
    0xca: o('dex', 1, AddressMode.Implied),
    0xcb: o('wai', 1, AddressMode.Implied),
    0xcc: o('cpy', 3, AddressMode.Absolute),
    0xcd: o('cmp', 3, AddressMode.Absolute),
    0xce: o('dec', 3, AddressMode.Absolute),
    0xcf: o('bbs4', 3, AddressMode.Relative),

    0xd0: o('bne', 2, AddressMode.Relative),
    0xd1: o('cmp', 2, AddressMode.ZeroPageIndexed),
    0xd2: o('cmp', 2, AddressMode.ZeroPageIndirect),
    0xd5: o('cmp', 2, AddressMode.ZeroPageX),
    0xd6: o('dec', 2, AddressMode.ZeroPageX),
    0xd7: o('smb5', 2, AddressMode.ZeroPage),
    0xd8: o('cld', 1, AddressMode.Implied),
    0xd9: o('cmp', 3, AddressMode.AbsoluteY),
    0xda: o('phx', 1, AddressMode.Stack),
    0xdb: o('stp', 1, AddressMode.Implied),
    0xdd: o('cmp', 3, AddressMode.AbsoluteX),
    0xde: o('dec', 3, AddressMode.AbsoluteX),
    0xdf: o('bbs5', 3, AddressMode.Relative),

    0xe0: o('cpx', 2, AddressMode.Immediate),
    0xe1: o('sbc', 2, AddressMode.ZeroPageIndirectX),
    0xe4: o('cpx', 2, AddressMode.ZeroPage),
    0xe5: o('sbc', 2, AddressMode.ZeroPage),
    0xe6: o('inc', 2, AddressMode.ZeroPage),
    0xe7: o('smb6', 2, AddressMode.ZeroPage),
    0xe8: o('inx', 1, AddressMode.Implied),
    0xe9: o('sbc', 2, AddressMode.Immediate),
    0xea: o('nop', 1, AddressMode.Implied),
    0xec: o('cpx', 3, AddressMode.Absolute),
    0xed: o('sbc', 3, AddressMode.Absolute),
    0xee: o('inc', 3, AddressMode.Absolute),
    0xef: o('bbs6', 3, AddressMode.Relative),

    0xf0: o('beq', 2, AddressMode.Relative),
    0xf1: o('sbc', 2, AddressMode.ZeroPageIndexed),
    0xf2: o('sbc', 2, AddressMode.ZeroPageIndirect),
    0xf5: o('sbc', 2, AddressMode.ZeroPageX),
    0xf6: o('inc', 2, AddressMode.ZeroPageX),
    0xf7: o('smb7', 2, AddressMode.ZeroPage),
    0xf8: o('sed', 1, AddressMode.Implied),
    0xf9: o('sbc', 3, AddressMode.AbsoluteY),
    0xfa: o('plx', 1, AddressMode.Stack),
    0xfd: o('sbc', 3, AddressMode.AbsoluteX),
    0xfe: o('inc', 3, AddressMode.AbsoluteX),
    0xff: o('bbs7', 3, AddressMode.Relative)
}
