import { CustomerService } from "./../../shared/customer.service";
import { OrderService } from "./../../shared/order.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { OrderItemsComponent } from "../order-items/order-items.component";
import { Customer } from "src/app/shared/customer.model";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { CategorieService } from "src/app/shared/categorie.service";
import { RetourApi } from "src/app/shared/retourApi.model";
import { log } from "console";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styles: [],
})
export class OrderComponent implements OnInit {
  customerList: Customer[];
  isValid: boolean = true;
  retour: RetourApi;
  constructor(
    private service: CategorieService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let categorieID = this.currentRoute.snapshot.paramMap.get("id");
    if (categorieID == null) this.resetForm();
    else {
      this.service.getCategorieByID(parseInt(categorieID)).then((res) => {
        this.service.formData = res;
      });
    }
  }

  resetForm(form?: NgForm) {
    if ((form = null)) form.resetForm();
    this.service.formData = {
      CategorieID: null,
      Titre: "",
    };
  }

  validateForm() {
    this.isValid = true;
    if (this.service.formData.CategorieID == 0) this.isValid = false;
    return this.isValid;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateCategorieV02().then((res) => {
        this.retour = res as RetourApi;
        console.log("this.retour ; ", this.retour);
        if (this.retour.codeRetour == "400") {
          console.log("this.retour.code ; ", this.retour.codeRetour);
          this.toastr.error("Categorie existe déja", "Blog App.");
          return;
        }
        this.resetForm();
        this.toastr.success("Submitted Successfully", "Blog App.");
        this.router.navigate(["/categories"]);
      });
    }
  }
}
