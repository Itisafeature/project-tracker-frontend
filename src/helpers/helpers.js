export const titleize = str => {
  const newStr = str.replace('_', ' ');
  return newStr
    .split(' ')
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(' ');
};

export const processForm = form => {
  const formData = new FormData(form);
  const formDataObj = {};
  for (const key of formData.keys()) {
    formDataObj[key] = formData.get(key);
  }
  console.log(formDataObj);
  return formDataObj;
};
