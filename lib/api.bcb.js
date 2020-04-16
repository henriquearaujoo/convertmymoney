const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json`
const getContacaoApi = (url) => axios.get(url)
const getContacaoExtract = res => res.data.value[0].cotacaoVenda
const getToday = () => {
    const today = new Date()
    const data = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
    return data
}
const getContacao = ({ getContacaoApi, getContacaoExtract, getToday, getUrl }) => async() => {
    try {
        const today = getToday()
        const url = getUrl(today)
        const res = await getContacaoApi(url)
        const cotacao = getContacaoExtract(res)
        return cotacao
    } catch (error) {
        return ''
    }

}

module.exports = {
    getContacaoApi,
    getContacaoExtract,
    getContacao: getContacao({ getContacaoApi, getContacaoExtract, getToday, getUrl }),
    getToday,
    getUrl,
    pure: {
        getContacao
    }
}