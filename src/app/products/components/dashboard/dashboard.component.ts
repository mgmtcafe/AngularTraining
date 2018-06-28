import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products : Product[];
  name : string;
  color: string;
  editName : string;
  editColor : string;
  editId: number;
  constructor(private productService : ProductService) {
  }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      data => {
        
        this.products = data;
        console.log(this.products);
      }
      
    )
  }

  editProduct(index: number) {
    this.editColor = this.products[index].color;
    this.editName = this.products[index].name;
    this.editId = this.products[index].id;
  }
  deleteProduct(index: number) {
    //console.log(this.products.length);
    
    this.productService.deleteProduct(this.products[index].id).subscribe(
      data => {
        this.products.forEach(
          product => {
            if(product.id === index + 1) {
              this.products.splice(index,1);
            }
          }
        )
      },
      error =>{
        console.error();
      }
    )
  }
  addProduct() {
    var p = <Product>{};
    p.name = this.name;
    p.color = this.color;

    this.productService.addProduct(p).subscribe(
      data => {
        //console.log(data);
        this.products.push(data);
        this.name = '';
        this.color = '';
       // console.log(this.products);
      }
    )


  }
  update() {
    var p = <Product>{};
    p.color = this.editColor;
    p.id = this.editId;
    p.name = this.editName;
  
    this.productService.editProduct(p).subscribe(
      
      data => {
        let i = 0;
        this.products.forEach(
          product => {
            if(product.id === p.id) {
              this.products[i] = p;
            }
            i++;
          }

        )
      },
      error => {
        console.log(error);
      }
    )
  }

}
