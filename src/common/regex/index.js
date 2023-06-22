const regex = {
  URLPATTERH: /^(ftp|http|https):\/\/[^ "]+$/,
  URLDOMAIN: /\.(com|edu|gov|vn|net|org|info|pro|coop|museum|[a-zA-Z]{2})$/i,
  IMAGE: /^.*\.(jpg|jpeg|png|gif|bmp|tiff|psd|raw|cr2|nef|orf|sr2)$/i
}
export default regex
