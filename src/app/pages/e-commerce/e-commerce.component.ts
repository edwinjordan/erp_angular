import { Component } from '@angular/core';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent {
  // Dummy data for charts
  multi = [
    {
      name: '2023',
      series: [
        { name: 'Jan', value: 5000 },
        { name: 'Feb', value: 7200 },
        { name: 'Mar', value: 6500 },
        { name: 'Apr', value: 8100 },
        { name: 'May', value: 9000 },
        { name: 'Jun', value: 10000 },
      ],
    },
    {
      name: '2024',
      series: [
        { name: 'Jan', value: 6200 },
        { name: 'Feb', value: 8200 },
        { name: 'Mar', value: 7000 },
        { name: 'Apr', value: 8800 },
        { name: 'May', value: 9200 },
        { name: 'Jun', value: 11000 },
      ],
    },
  ];

  single = [
    { name: 'Kas', value: 5000000 },
    { name: 'Piutang', value: 3500000 },
    { name: 'Hutang', value: 1200000 },
  ];

  barData = [
    { name: 'Produk A', value: 894000 },
    { name: 'Produk B', value: 500000 },
    { name: 'Produk C', value: 720000 },
  ];

  // ngx-charts options
  view: any[] = [400, 120];
  colorScheme = {
    domain: ['#3366FF', '#00D68F', '#FF8A65', '#FFC107', '#8B5CF6']
  };
  showLegend = false;
  showLabels = true;
  autoScale = true;
}
