import http from "./httpService";

const apiEndpoint = "/spells";

function spellUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getSpells() {
  return http.get(apiEndpoint);
}

export function getSpell(spellId) {
  return http.get(spellUrl(spellId));
}

export function saveSpell(spell) {
  if (spell._id) {
    let body = { ...spell };
    delete body._id;
    return http.put(spellUrl(spell._id), body);
  }
  return http.post(apiEndpoint, spell);
}

export function deleteSpell(spellId) {
  return http.delete(spellUrl(spellId));
}
