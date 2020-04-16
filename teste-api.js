const axios = require('axios')
var today = new Date();
const data = (today.getMonth() + 1) + '-' + (today.getDate() - 1) + '-' + today.getFullYear()
const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json====`

axios.get(url).then(res => console.log(res.data))
    //console.log(data)