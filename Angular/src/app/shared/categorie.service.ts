import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "./order.model";
import { OrderItem } from "./order-item.model";
import { environment } from "src/environments/environment";
import { Categorie } from "./categorie.model";

@Injectable({
  providedIn: "root",
})
export class CategorieService {
  formData: Categorie;

  constructor(private http: HttpClient) {}

  saveOrUpdateCategorie() {
    var body = {
      ...this.formData,
    };
    if (body.CategorieID == null)
      return this.http.post(environment.apiURL + "/Categorie", body);
    return this.http.put(
      environment.apiURL + "/Categorie/" + body.CategorieID,
      body
    );
  }
  saveOrUpdateCategorieV02() {
    var body = {
      ...this.formData,
    };
    if (body.CategorieID == null)
      return this.http
        .post(environment.apiURL + "/Categorie", body)
        .toPromise();
    return this.http
      .put(environment.apiURL + "/Categorie/" + body.CategorieID, body)
      .toPromise();
  }

  getOrderList() {
    return this.http.get(environment.apiURL + "/Order").toPromise();
  }

  getCategorieList() {
    return this.http.get(environment.apiURL + "/Categorie").toPromise();
  }
  getOrderByID(id: number): any {
    return this.http.get(environment.apiURL + "/Order/" + id).toPromise();
  }

  getCategorieByID(id: number): any {
    return this.http.get(environment.apiURL + "/Categorie/" + id).toPromise();
  }
  deleteOrder(id: number) {
    return this.http.delete(environment.apiURL + "/Order/" + id).toPromise();
  }
}
