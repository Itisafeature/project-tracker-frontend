const handleAPIError = res => {
  let data = null;
  switch (res.statusCode) {
    case 400:
      break;
      defaut: data = { statusCode: res.statusCode, msg: res.msg };
      break;
  }
};
