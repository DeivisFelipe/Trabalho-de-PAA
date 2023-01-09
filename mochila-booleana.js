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

function mochilaBooleanaRecursao(indice, pesoMaximoLocal) {
  // Caso base
  if (indice === -1 || pesoMaximoLocal === 0) {
    return {
      itens: [],
      peso: 0,
      eficiencia: 0,
    };
  }

  totalVezesRecursao++;
  /*console.log(
    "Recursão: " + ++totalVezesRecursao + " - " + indice + " - " + pesoMaximoLocal
  );*/

  // Caso recursivo

  // Pega o item no índice atual
  let item = itens[indice];

  // Verifica se o peso do item atual é maios que o pesso máximo da seção da mochila
  if (item.peso > pesoMaximoLocal) {
    // Se for, não coloca o item na mochila
    return mochilaBooleanaRecursao(indice - 1, pesoMaximoLocal);
  }

  let solucaoComItem = mochilaBooleanaRecursao(
    indice - 1,
    pesoMaximoLocal - item.peso
  );
  solucaoComItem.itens.push(item);
  solucaoComItem.peso += item.peso;
  solucaoComItem.eficiencia += item.eficiencia;

  let solucaoSemItem = mochilaBooleanaRecursao(indice - 1, pesoMaximoLocal);

  if (solucaoComItem.eficiencia > solucaoSemItem.eficiencia) {
    return solucaoComItem;
  } else {
    return solucaoSemItem;
  }
}

function mochilaBooleanaDinamica(indice, pesoMaximoLocal) {
  // Caso base
  if (indice === -1 || pesoMaximoLocal === 0) {
    return {
      itens: [],
      peso: 0,
      eficiencia: 0,
    };
  }

  if (matrixDinamica[indice][pesoMaximoLocal]) {
    return copiaObjeto(matrixDinamica[indice][pesoMaximoLocal]);
  }

  totalVezesDinamica++;

  // Caso recursivo

  // Pega o item no índice atual
  let item = itens[indice];

  let solucaoSemItem = mochilaBooleanaDinamica(indice - 1, pesoMaximoLocal);

  let solucaoComItem;
  if (item.peso > pesoMaximoLocal) {
    // Se for, não coloca o item na mochila
    solucaoComItem = {
      itens: [],
      peso: 0,
      eficiencia: 0,
    };
  } else {
    solucaoComItem = mochilaBooleanaDinamica(
      indice - 1,
      pesoMaximoLocal - item.peso
    );
    solucaoComItem.itens.push(copiaObjeto(item));
    solucaoComItem.peso += item.peso;
    solucaoComItem.eficiencia += item.eficiencia;
  }

  let retorno;
  if (solucaoComItem.eficiencia > solucaoSemItem.eficiencia) {
    matrixDinamica[indice][pesoMaximoLocal] = copiaObjeto(solucaoComItem);
    retorno = solucaoComItem;
  } else {
    matrixDinamica[indice][pesoMaximoLocal] = copiaObjeto(solucaoSemItem);
    retorno = solucaoSemItem;
  }
  return retorno;
}

function copiaObjeto(objeto) {
  return JSON.parse(JSON.stringify(objeto));
}
