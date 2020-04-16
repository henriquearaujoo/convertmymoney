const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')

test('getCotacaoApi', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 5.55 }
            ]
        }
    }

    axios.get.mockResolvedValue(res)
    api.getContacaoApi('url').then(resp => {
        expect(resp).toEqual(res)
        expect(axios.get.mock.calls[0][0]).toBe('url')
    })
})

test('getContacaoExtract', () => {
    const cotacao = api.getContacaoExtract({
        data: {
            value: [
                { cotacaoVenda: 5.55 }
            ]
        }
    })
    expect(cotacao).toBe(5.55)
})

describe('getToday', () => {
    const RealDate = Date

    function mockDate(date) {
        global.Date = class extends RealDate {
            constructor() {
                return new RealDate(date)
            }
        }
    }

    afterEach(() => {
        global.Date = RealDate
    })

    test('getToday', () => {
        mockDate('2020-04-15T12:00:00z')
        const today = api.getToday()
        expect(today).toBe('4-15-2020')
    })
})

test('getUrl', () => {
    const url = api.getUrl('minhadata')
    expect(url).toBe(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='minhadata'&$top=100&$format=json`)
})

test('getCotacao', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 5.55 }
            ]
        }
    }

    const getToday = jest.fn()
    getToday.mockReturnValue('01-01-2020')

    const getUrl = jest.fn()
    getUrl.mockReturnValue('url')

    const getContacaoApi = jest.fn()
    getContacaoApi.mockResolvedValue(res)

    const getContacaoExtract = jest.fn()
    getContacaoExtract.mockReturnValue(5.55)

    api.pure
        .getContacao({ getContacaoApi, getContacaoExtract, getToday, getUrl })()
        .then(res => {
            expect(res).toBe(5.55)
        })
})