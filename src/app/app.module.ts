import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SearchComponent } from './pages/search/search.component';
import { SuccessComponent } from './pages/success/success.component';
import { ProductItemsComponent } from './shared/components/product-items/product-items.component';
import { FooterComponent } from './shared/components/Layout/footer/footer.component';
import { HeaderComponent } from './shared/components/Layout/header/header.component';
import { MenuComponent } from './shared/components/Layout/menu/menu.component';
import { SlidebarComponent } from './shared/components/Layout/slidebar/slidebar.component';
import { SliderComponent } from './shared/components/Layout/slider/slider.component';
import { TransferCurrencyMoneyPipe } from './pipes/transfer-currency-money.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    CategoryComponent,
    HomeComponent,
    NotFoundComponent,
    ProductDetailsComponent,
    SearchComponent,
    SuccessComponent,
    ProductItemsComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    SlidebarComponent,
    SliderComponent,
    TransferCurrencyMoneyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
