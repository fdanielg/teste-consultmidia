export type Currencies = 'BRL';
export type Languages = 'pt-BR';

/**
 * Formata um valor numérico para um valor monetário.
 */
export function formatCurrency(value: number | string | null | undefined, currency: Currencies = 'BRL'): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    value = parseInt(value);
  }

  const getLanguage = (): Languages => {
    switch (currency) {
      case 'BRL': {
        return 'pt-BR';
      }

      default:
        return 'pt-BR';
    }
  };

  const language = getLanguage();

  let formated = value.toLocaleString(language, {
    style: 'currency',
    currency,
  });

  if (currency === 'BRL') {
    const splitted = formated.split(',').join('.').split('');

    const lastIndex = splitted.lastIndexOf('.');

    splitted.splice(lastIndex, 1, ',');

    formated = splitted.join('');
  }

  // Troca todos os tipos de espaços especiais para um espaço comum.
  formated = formated.replace(/\s/g, ' ');

  return formated;
}
