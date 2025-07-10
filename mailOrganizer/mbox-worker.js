// mbox-worker.js - NOVA VERSÃO COM AGRUPAMENTO DE DOMÍNIOS

/**
 * Extrai o domínio principal de um subdomínio.
 * Ex: de "mail.google.com" para "google.com".
 * Considera domínios compostos como 'co.uk' ou 'com.br'.
 */
function getPrincipalDomain(domain) {
  const parts = domain.split('.');
  if (parts.length <= 2) {
    return domain;
  }

  // Lista de TLDs duplos comuns para um tratamento mais preciso
  const doubleTlds = new Set(['co', 'com', 'org', 'gov', 'edu', 'net']);
  const lastPart = parts[parts.length - 1];
  const secondLastPart = parts[parts.length - 2];

  if (doubleTlds.has(secondLastPart) && lastPart.length === 2) {
    return parts.slice(-3).join('.'); // Ex: "example.co.uk"
  }

  return parts.slice(-2).join('.'); // Ex: "mail.google.com" -> "google.com"
}

/**
 * Agrupa uma lista de domínios únicos pelo seu domínio principal.
 * @param {Set<string>} domainsSet - Um Set com todos os domínios únicos.
 * @returns {Object} - Um objeto onde as chaves são os domínios principais.
 */
function groupDomains(domainsSet) {
  const grouped = {};
  const sortedDomains = [...domainsSet].sort();

  for (const domain of sortedDomains) {
    const principal = getPrincipalDomain(domain);
    if (!grouped[principal]) {
      grouped[principal] = [];
    }
    grouped[principal].push(domain);
  }
  return grouped;
}


// Ouve o evento 'message' vindo da página principal (index.html)
self.onmessage = async function (e) {
  const { file } = e.data;
  const totalSize = file.size;
  let bytesProcessed = 0;

  const progressMessages = [
    "Analisando os e-mails iniciais...",
    "Ainda carregando... Aguarde mais um pouco.",
    "Trabalhando nisso... Pode levar alguns minutos.",
    "Estamos na metade do caminho...",
    "Processando um grande volume de dados...",
    "Otimizando a lista de domínios...",
    "Quase pronto! Agrupando os resultados!",
  ];
  let messageIndex = 0;

  function postProgress() {
    const currentProgress = (bytesProcessed / totalSize) * 100;
    const nextMessageThreshold = (messageIndex + 1) * 14; // A cada ~14%

    if (currentProgress >= nextMessageThreshold && messageIndex < progressMessages.length - 1) {
      messageIndex++;
      self.postMessage({
        type: "progress",
        payload: { message: progressMessages[messageIndex] },
      });
    }
  }


  try {
    const uniqueDomains = new Set();
    const emailRegex = /[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    let previousChunkTail = "";

    const stream = file.stream().pipeThrough(new TextDecoderStream("utf-8", { fatal: false, ignoreBOM: true }));
    const reader = stream.getReader();

     self.postMessage({
        type: "progress",
        payload: { message: progressMessages[0] },
      });

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      bytesProcessed += value.length;
      const textChunk = previousChunkTail + value;
      const matches = textChunk.matchAll(emailRegex);

      for (const match of matches) {
        uniqueDomains.add(match[1].toLowerCase());
      }
      previousChunkTail = textChunk.slice(-300);
      postProgress();
    }

    // NOVA ETAPA: Agrupar os domínios
    const groupedDomains = groupDomains(uniqueDomains);

    self.postMessage({
      type: "complete",
      payload: { domains: groupedDomains, totalCount: uniqueDomains.size },
    });

  } catch (error) {
    self.postMessage({ type: "error", payload: { message: error.message } });
  }
};