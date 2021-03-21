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

export const errorHelper = data => {
  let error;
  switch (data) {
    case 'Unauthorized':
      error = 'Please signup or login to view this page';
      break;
    default:
      error = 'Something went wrong please try again';
      break;
  }
  return error;
};
