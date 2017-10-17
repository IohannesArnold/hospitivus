function getHashToken() {
  const hash    = location.hash.substr(1);
  location.hash = '';
  return hash.substr(hash.indexOf('id_token=')).split('&')[0].split('=')[1];
}


