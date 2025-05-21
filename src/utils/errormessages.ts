export const getErrorMessage = (errorMessage: string): string => {
  if (errorMessage.includes("Entry Id Not Found")) {
    return "ID da Ordem não encontrado";
  } else if (errorMessage.includes("Insufficient balance")) {
    return "Saldo insuficiente na conta";
  } else if (errorMessage.includes("Maximum position size")) {
    return "Tamanho máximo de posição excedido";
  } else if (errorMessage.includes("Connection timeout")) {
    return "Tempo de conexão esgotado";
  } else if (errorMessage.includes("Instrument not available")) {
    return "Instrumento não disponível";
  } else if (errorMessage.includes("Position limit")) {
    return "Limite de posição excedido";
  } else if (errorMessage.includes("Rejected by broker")) {
    return "Ordem rejeitada pelo broker";
  } else if (errorMessage.includes("Market closed")) {
    return "Mercado fechado";
  } else {
    return "Erro ao executar ordem";
  }
};

export const getErrorSuggestion = (errorMessage: string): string => {
  if (errorMessage.includes("Entry Id Not Found")) {
    return "Verifique se o ID da conta está correto";
  } else if (errorMessage.includes("Insufficient balance")) {
    return "Adicione fundos à conta ou reduza o tamanho da posição";
  } else if (errorMessage.includes("Maximum position size")) {
    return "Ajuste o multiplicador ou tamanho da ordem";
  } else if (errorMessage.includes("Connection timeout")) {
    return "Verifique sua conexão com a internet";
  } else if (errorMessage.includes("Instrument not available")) {
    return "Este instrumento pode não estar disponível para sua conta";
  } else if (errorMessage.includes("Position limit")) {
    return "Aumente o limite da conta ou feche algumas posições";
  } else if (errorMessage.includes("Rejected by broker")) {
    return "Verifique as regras do seu broker para este instrumento";
  } else if (errorMessage.includes("Market closed")) {
    return "Tente novamente quando o mercado estiver aberto";
  } else {
    return "";
  }
};