/**
 * XOR Encoder / Decoder
 *
 * ⚠️ ATENÇÃO:
 * Isto NÃO é criptografia segura.
 * Serve apenas para ofuscação simples.
 */
export class XorEncoder {
  /**
   * Codifica ou decodifica uma string usando XOR
   *
   * @param input Texto de entrada
   * @param key Chave numérica (0-255 recomendado)
   * @returns Texto codificado/decodificado
   */
  static encode(input: string, key: number): string {
    if (!Number.isInteger(key)) {
      throw new Error('A chave deve ser um número inteiro')
    }

    let result = ''

    for (let i = 0; i < input.length; i++) {
      const charCode = input.charCodeAt(i)
      const encodedCharCode = charCode ^ key

      result += String.fromCharCode(encodedCharCode)
    }

    return result
  }

  /**
   * Decode é igual ao encode (XOR reversível)
   */
  static decode(input: string, key: number): string {
    return this.encode(input, key)
  }
}
