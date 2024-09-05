// api/RxNormAPI.js
import axios from 'axios';

const API_URL = 'https://rxnav.nlm.nih.gov/REST';

class RxNormAPI {
  async getDrugs(name) {
    const response = await axios.get(`${API_URL}/drugs.json`, {
      params: {
        name,
      },
    });
    return response.data;
  }

  async getSpellingSuggestions(name) {
    const response = await axios.get(`${API_URL}/spellingsuggestions`, {
      params: {
        name,
      },
    });
    return response.data;
  }

  async getNDCs(rxcui) {
    const response = await axios.get(`${API_URL}/rxcui/${rxcui}/ndcs`);
    return response.data;
  }
}

export default RxNormAPI;