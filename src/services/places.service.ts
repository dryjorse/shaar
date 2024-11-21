import { $api, apiConfig } from "../constants/api";
import { IPlace, ISimpleData } from "../types/api.types";

class PlacesService {
  getCategories() {
    return $api<ISimpleData[]>(apiConfig.Categories);
  }
  getAll() {
    return $api<IPlace[]>(apiConfig.Places);
  }
}

export default new PlacesService();
