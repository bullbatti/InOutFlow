import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-problems-form',
  standalone: true,
  imports: [CardModule, InputTextModule, InputTextareaModule, ButtonModule, TabViewModule],
  templateUrl: './problems-form.component.html',
  styleUrl: './problems-form.component.css'
})
export class ProblemsFormComponent {

}
