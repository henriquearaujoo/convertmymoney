const jurosSimples = (capital, juros, tempo) => {
    return capital * juros * tempo
}

const getMontanteCapital = ({ jurosSimples }) => (capital, juros, tempo) => {
    return capital + jurosSimples(capital, juros, tempo)
}

const getMontanteJurosCompostos = (capital, juros, tempo) => {
    return capital * Math.pow((1 + juros), tempo)
}

const getJurosCompostos = ({ getMontanteJurosCompostos }) => (capital, juros, tempo) => {
    return getMontanteJurosCompostos(capital, juros, tempo) - capital
}

module.exports = {
    jurosSimples,
    getMontanteCapital: getMontanteCapital({ jurosSimples }),
    getMontanteJurosCompostos,
    getJurosCompostos: getJurosCompostos({ getMontanteJurosCompostos }),
    pure: { getMontanteCapital, getJurosCompostos }
}