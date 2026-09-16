

export default (qStringParts: any) => {
  var qString = '';

  const keys = Object.keys(qStringParts);
  if (keys.length > 0) {
    qString = '?';
    keys.forEach((element, index, list) => {
      if (!!!qStringParts[element]) {
        return;
      } else {
        var x = `${element}=${qStringParts[element]}`;
        if (index + 1 !== list?.length) {
          x = x + '&';
        }
        qString = qString + x;
      }
    });

  }
  return qString;
};
