const moment = require('moment')

const dataAtual = new Date()

const dataFormatada = moment(dataAtual).format('DD/MM/YYYY HH:mm')

console.log('A data atual é: ' + dataFormatada)
