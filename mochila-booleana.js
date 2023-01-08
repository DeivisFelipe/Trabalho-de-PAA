// Peso máximo da mochila: 8
let pesoMaximo = 8;

// Itens disponíveis para colocar na mochila
let itens = [
  { peso: 2, eficiencia: 6 },
  { peso: 3, eficiencia: 14 },
  { peso: 2, eficiencia: 7 },
  { peso: 4, eficiencia: 18 },
  { peso: 6, eficiencia: 24 },
];

// Número de itens disponíveis
let numeroDeItens = itens.length;

let melhorSolucaoRecursao = {
  itens: [],
  peso: 0,
  eficiencia: 0,
};

let melhorSolucaoDinamica = {
  itens: [],
  peso: 0,
  eficiencia: 0,
};

let totalVezesRecursao = 0;
let totalVezesDinamica = 0;
var matrixDinamica = new Array(numeroDeItens);
for (var i = 0; i < numeroDeItens; i++) {
  matrixDinamica[i] = new Array(pesoMaximo);
}
for (var i = 0; i < numeroDeItens; i++) {
  for (var peso = 0; peso <= pesoMaximo; peso++) {
    melhorSolucaoDinamica = mochilaBooleanaDinamica(i, peso);
    melhorSolucaoRecursao = mochilaBooleanaRecursao(i, peso);
  }
}
console.log("Função Recursiva - Chamadas da função: " + totalVezesRecursao);
console.log(melhorSolucaoRecursao);
console.log("Função Dinâmica - Chamadas da função: " + totalVezesDinamica);
console.log(melhorSolucaoDinamica);

function mochilaBooleanaRecursao(indice, pesoMaximo) {
  // Caso base
  if (indice === -1 || pesoMaximo === 0) {
    return {
      itens: [],
      peso: 0,
      eficiencia: 0,
    };
  }

  totalVezesRecursao++;
  /*console.log(
    "Recursão: " + ++totalVezesRecursao + " - " + indice + " - " + pesoMaximo
  );*/

  // Caso recursivo

  // Pega o item no índice atual
  let item = itens[indice];

  // Verifica se o peso do item atual é maios que o pesso máximo da seção da mochila
  if (item.peso > pesoMaximo) {
    // Se for, não coloca o item na mochila
    return mochilaBooleanaRecursao(indice - 1, pesoMaximo);
  }

  let solucaoComItem = mochilaBooleanaRecursao(
    indice - 1,
    pesoMaximo - item.peso
  );
  solucaoComItem.itens.push(item);
  solucaoComItem.peso += item.peso;
  solucaoComItem.eficiencia += item.eficiencia;

  let solucaoSemItem = mochilaBooleanaRecursao(indice - 1, pesoMaximo);

  if (solucaoComItem.eficiencia > solucaoSemItem.eficiencia) {
    return solucaoComItem;
  } else {
    return solucaoSemItem;
  }
}

function mochilaBooleanaDinamica(indice, pesoMaximo) {
  // Caso base
  if (indice === -1 || pesoMaximo === 0) {
    return {
      itens: [],
      peso: 0,
      eficiencia: 0,
    };
  }

  totalVezesDinamica++;
  /*console.log(
    "Dinâmica: " + ++totalVezesDinamica + " - " + indice + " - " + pesoMaximo
  );*/

  // Caso recursivo

  // Pega o item no índice atual
  let item = itens[indice];

  // Verifica se o peso do item atual é maios que o pesso máximo da seção da mochila
  if (item.peso > pesoMaximo) {
    // Se for, não coloca o item na mochila
    return mochilaBooleanaDinamica(indice - 1, pesoMaximo);
  }

  let solucaoComItem = mochilaBooleanaDinamica(
    indice - 1,
    pesoMaximo - item.peso
  );
  solucaoComItem.itens.push(item);
  solucaoComItem.peso += item.peso;
  solucaoComItem.eficiencia += item.eficiencia;

  matrixDinamica[indice][pesoMaximo] = solucaoComItem;

  let solucaoSemItem;

  if (
    indice === 0 ||
    pesoMaximo === 0 ||
    !matrixDinamica[indice - 1][pesoMaximo]
  ) {
    solucaoSemItem = mochilaBooleanaDinamica(indice - 1, pesoMaximo);
  } else {
    solucaoSemItem = matrixDinamica[indice - 1][pesoMaximo];
  }

  if (solucaoComItem.eficiencia > solucaoSemItem.eficiencia) {
    return solucaoComItem;
  } else {
    return solucaoSemItem;
  }
}
