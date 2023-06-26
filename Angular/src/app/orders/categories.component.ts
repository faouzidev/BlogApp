import { Component, OnInit } from "@angular/core";
import { OrderService } from "../shared/order.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-orders",
  templateUrl: "./categories.component.html",
  styles: [],
})
export class CategoriesComponent implements OnInit {
  orderList;
  categorieList;

  constructor(
    private service: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.refreshCategorieList();
  }

  refreshList() {
    this.service.getOrderList().then((res) => (this.orderList = res));
  }

  refreshCategorieList() {
    this.service.getCategorieList().then((res) => (this.categorieList = res));
  }

  openForEdit(orderID: number) {
    this.router.navigate(["/order/edit/" + orderID]);
  }

  onOrderDelete(id: number) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.deleteOrder(id).then((res) => {
        this.refreshList();
        this.toastr.warning("Deleted Successfully", "Restaurent App.");
      });
    }
  }
}
