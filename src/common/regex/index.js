const regex = {
  URLPATTERH: /^(ftp|http|https):\/\/[^ "]+$/,
  URLDOMAIN: /\.(com|edu|gov|vn|net|org|info|pro|coop|museum|[a-zA-Z]{2})$/i,
  IMAGE: /^.*\.(jpg|jpeg|png|gif|bmp|tiff|psd|raw|cr2|nef|orf|sr2)$/i,
  isEmail:
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
}
export default regex
