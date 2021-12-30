	; cl65 -o bin/addressmodes.bin -C ca65.cfg -t bbc --cpu 65c02 --no-target-lib ./addressmodes.s

	.code

start:
	lda #5			; #
	sta $200		; a
	sta $12			; zp
	ror				; A
	nop				; I
	lda ($1a),Y		; (zp),Y
	sta ($2b,X)		; (zp,X)
	lda	$4,X		; zp,X
	lda $abc,X		; a,X
	sta $bcd,Y		; a,Y
	bcc start		; r
	pha				; s
	lda ($10)		; (zp)
	jmp ($300)		; (a)

halt:
	jmp halt

.segment "VECTORS"
	.word $ffff
	.word start
	.word $ffff
