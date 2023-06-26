import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoriesComponent } from "./orders/categories.component";
import { OrderComponent } from "./orders/order/order.component";

const routes: Routes = [
  { path: "", redirectTo: "categories", pathMatch: "full" },
  { path: "categories", component: CategoriesComponent },
  {
    path: "order",
    children: [
      { path: "", component: OrderComponent },
      { path: "edit/:id", component: OrderComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
