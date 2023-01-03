function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  const numeroAleatorioEntreUmeNove = getRndInteger(1, 9)
console.log(numeroAleatorioEntreUmeNove)

if(Number(process.argv[3]) + numeroAleatorioEntreUmeNove % 2 ===0 && process.argv[2] ==='par' && numeroAleatorioEntreUmeNove % 2 !== 0){
    console.log(` If 1 Você escolheu par e o computador escolheu impar. O resultado foi ${numeroAleatorioEntreUmeNove}. Você ganhou!`)
}else if(Number(process.argv[3]) + numeroAleatorioEntreUmeNove % 2 === 0 && process.argv[2] ==='ímpar' && numeroAleatorioEntreUmeNove% 2 === 0){
    console.log(`If 2Você escolheu ímpar e o computador escolheu par. O resultado foi ${numeroAleatorioEntreUmeNove}. Você perdeu!`)
}else if(Number(process.argv[3])+ numeroAleatorioEntreUmeNove % 2 !==0 && process.argv[2] ==='ímpar' && numeroAleatorioEntreUmeNove% 2 === 0){
    console.log(`If 3 Você escolheu ímpar e o computador escolheu par. O resultado foi ${numeroAleatorioEntreUmeNove}. Você ganhou!`)
}else if(Number(process.argv[3])+ numeroAleatorioEntreUmeNove % 2 ===0 && process.argv[2] ==='par' && numeroAleatorioEntreUmeNove% 2 !== 0){
    console.log(`if 4 Você escolheu par e o computador escolheu ímpar. O resultado foi ${numeroAleatorioEntreUmeNove}. Você ganhou!`)
}else{
    console.log(`Aqui é o else`)
}


