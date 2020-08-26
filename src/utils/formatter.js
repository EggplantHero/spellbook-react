export function concat(number, text, comparator, altText) {
  return text === comparator
    ? `${number} ${number !== 1 ? text : altText}`
    : `${text}`;
}

export function cardinal(input) {
  switch (input) {
    case 0:
      input = "Cantrip";
      break;
    case 1:
      input += "st";
      break;
    case 2:
      input += "nd";
      break;
    case 3:
      input += "rd";
      break;

    default:
      input += "th";
      break;
  }
  return input;
}
