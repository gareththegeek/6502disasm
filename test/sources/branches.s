	; cl65 -o bin/branches.bin -C ca65.cfg -t bbc --cpu 65c02 --no-target-lib ./branches.s

	.code

c:
	bvs	e
	jmp	la

	nop			; this should be omitted as unreachable

e:
	lsr

la:
	lda	#0
	bcc	c
	inc
	bne	b
	dec
	bcs	la
	sta	$1234
	jsr	d
	ror

b:
	jmp b

	nop			; this should be omitted as unreachable

d:
	pha
	phx
	rts

i:
	lda	#$ab
	rti

	nop			; this should be omitted as unreachable

.segment "VECTORS"
	.word i
	.word la
	.word i
