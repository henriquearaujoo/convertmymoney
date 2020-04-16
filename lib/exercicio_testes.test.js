const jurosAPI = require('./exercicio_testes')

test('jurosSimples', () => {
    const capital = 100
    const juros = 0.15
    const tempo = 1
    const jurosSimples = jurosAPI.jurosSimples(capital, juros, tempo)
    expect(jurosSimples).toBe(15)
})

test('getMontanteCapital', () => {
    const capital = 100
    const juros = 0.15
    const tempo = 1
    const montanteEsperado = 110
    const jurosSimples = jest.fn()
    jurosSimples.mockImplementation(() => 10)
    const getMontanteCapital = jurosAPI.pure.getMontanteCapital({ jurosSimples })
    const montante = getMontanteCapital(capital, juros, tempo)
    expect(jurosSimples.mock.calls[0]).toEqual([capital, juros, tempo])
    expect(montante).toBe(montanteEsperado)
})

test('getMontanteJurosCompostos', () => {
    const capital = 1000
    const juros = 0.10
    const tempo = 1
    const jurosCompostos = jurosAPI.getMontanteJurosCompostos(capital, juros, tempo)
    expect(jurosCompostos).toBe(1100)
})

test('getJurosCompostos', () => {
    const capital = 100
    const juros = 0.15
    const tempo = 1
    const jurosEsperados = 1000

    const getMontanteJurosCompostos = jest.fn()
    getMontanteJurosCompostos.mockImplementation(() => 1100)

    const getJurosCompostos = jurosAPI.pure.getJurosCompostos({ getMontanteJurosCompostos })
    const jurosCompostos = getJurosCompostos(capital, juros, tempo)

    expect(getMontanteJurosCompostos.mock.calls[0]).toEqual([capital, juros, tempo])
    expect(jurosCompostos).toBe(jurosEsperados)
})