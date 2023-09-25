import { BASE_URL } from "../constants/app";

export function getImageProduct (imgName : any) {
    return BASE_URL+'/assets/uploads/prodcts/'+imgName;
}