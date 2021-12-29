import { disassemble } from '../src'

describe('dummy', () => {
    it('always passes', () => {
        expect(true).toBe(true)
    })

    it('basic test', () => {
        const actual = disassemble(
            [0x4c, 0xf0, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xff, 0xff, 0xf0, 0xff, 0xff, 0xff],
            0xfff0
        )
        console.log(actual)
    })
})
